import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Base64 from '../lib/Base64'

const {height, width} = Dimensions.get('window');

export default class Home extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Page1'
  }

  constructor(props) {
    super(props);
    this.state = { id : '', password : '' };
  }
  handleSubmit() {
    //전송
    // alert(JSON.stringify(this.state,0,2));
    //fetch 생략

    //서버 로직
    let id = this.state.id;
    let password = this.state.password;
    password = Base64.btoa(password);

    //id와 password로 DB검색 결과
    let result = require('./users.json');

    alert(result)
    // alert(Base64.atob(result[0].password));
    
    alert(JSON.stringify(result,0,2));
  }

  render() {
    return (
      <Container>
        <TextL>Sign In</TextL>
        <Input
          onChangeText={(text) => this.setState({id:text})}
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