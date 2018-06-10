import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
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
  async handleSubmit() {

    //id와 password로 DB검색 : DB가 하는 일
    function getUser(id, password) {
      let users = require('./users.json');
      let user = [];
      for(let i in users){
        if(id === users[i].id && password === users[i].password)
        user.push(users[i]);
      }
      return user;
    }

    //서버 로직 함수 : post 이후 처리
    async function serverFn(pId, pPassword) {
      //서버 로직 start
      let id = pId
      let password = pPassword;
      password = Base64.btoa(password);

      //id와 password로 DB검색
      let user = await getUser(id, password);

      //없을 경우
      if(user.length === 0) {
        return {status : 'ERROR', message : "아이디와 비밀번호를 확인하세요"};
      }

      //DB 무결성 에러
      if(user.length !== 1) {
        return {status : 'ERROR', message : "DB ERROR"};
      }

      let key = {
        login : true,
        id : result.id
      }
      key = Base64.btoa(JSON.stringify(key,0,2));

      return {status : 'SUCCESS', data : {key : key}};
    }

    //서버 전송
    result = await serverFn(this.state.id, this.state.password);
    
    if(result.status === 'ERROR'){
      alert(result.message);
      return;
    }

    //fetch 생략
    const key = result.key;

    try {
      AsyncStorage.setItem('@RouteTestKey', key);
      //넘어가기
      this.props.navigation.navigate('page2');
    } catch (error) {
      // Error saving data
    }
    // alert(key);

    // alert(result)
    // alert(Base64.atob(result[0].password));
    
    // alert(JSON.stringify(result,0,2));
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