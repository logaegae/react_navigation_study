import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { login } from '../lib/ServerFn';

const {height, width} = Dimensions.get('window');

export default class Home extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Page1'
  }

  constructor(props) {
    super(props);
    this.state = { id : '', password : '' };
  }
  async handleSubmit() {

    //handleSubmit 함수 시작
    let result = await login(this.state.id, this.state.password);

    //요청결과 에러인 경우
    if(result.status === 'ERROR'){
      alert(result.message);
      this.setState({password : ''});
      return;
    }
    //스토리지에 세션정보 저장
    const key = result.data.key;
    try {
      await AsyncStorage.setItem('@RouteTest:key', key);
      this.props.navigation.navigate('Page2');
    } catch (error) {
      alert("Error saving data" + error);
    }
  }

  render() {
    return (
      <Container>
        <TextL>Sign In</TextL>
        <Input
          onChangeText={(text) => this.setState({id:text.toLowerCase()})}
          value={this.state.id}
          placeholder="ID"
          placeholderTextColor="white"
        />
        <Input
          onChangeText={(text) => this.setState({password:text})}
          value={this.state.password}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
        />
        <SubmitButton
          onPress={() => this.handleSubmit()}
        >
          <TextM>Submit</TextM>
        </SubmitButton>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('Home1')}
        />
      </Container>
    );
  }
}

const Container = styled.View`
    flex: 1;
    background: #fab1a0;
    align-items: center;
    justify-content: center;
`;

const TextL = styled.Text`
  font-size : 30px;
  font-weight : bold;
  margin-bottom : 20px;
`;

const Input = styled.TextInput`
  width : ${width - 30}px;
  padding : 20px;
  border-color: white;
  border-width: 1px;
  margin-bottom : 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-top : 10px;
  margin-bottom : 10px;
  background-color : #00b894;
  border-radius : 5px;
  width : 100px;
  height : 50px;
  align-items : center;
  justify-content : center;
`;

const TextM = styled.Text`
  font-size : 20px;
  margin-top : 5px;
  margin-bottom : 5px;
  padding : 10px;
  color : white;
`;