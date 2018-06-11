import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { auth } from '../helper/Member';

export default class Home extends React.Component {

  state = {
    id :'',
    login : false
  };

  static navigationOptions = {
    drawerLabel: 'LogOut'
  };
  
  async componentDidMount() {
    let user = await auth();
    if(user)
      this.setState({id : user.data.id, login : true});
  }

  async handleLogout() {
    try {
      await AsyncStorage.removeItem('@RouteTest:key');
      this.props.navigation.navigate('SignIn');
    } catch (error) {
        alert("Error saving data" + error);
    }
  }

  render() {
    const { id, login } = this.state;
    return (
      <Container>
        <TextL>로그아웃</TextL>
        <TextM>{id && login ? 'ID : ' + id : ''}</TextM>
        <LogoutButton
          onPress={() => this.handleLogout()}
        >
          <TextM>Log out</TextM>
        </LogoutButton>
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
    background: #a29bfe;
    align-items: center;
    justify-content: center;
`;
const TextL = styled.Text`
  font-size : 30px;
  font-weight : bold;
  margin : 0 10px;
`;

const LogoutButton = styled.TouchableOpacity`
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
