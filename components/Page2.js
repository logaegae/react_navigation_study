import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import Base64 from '../lib/Base64';
import { auth } from '../helper/Member';

export default class Home extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Page2'
  };

  constructor(e){
    super(e);
    this.state = {
      id : '',
      login : false
    }
  }
  
  async componentDidMount() {
    let user = await auth();
    if(user)
      this.setState({id : user.data.id, login : true});
    else
      this.props.navigation.navigate('SignIn');
  }

  render() {
    const {id, login} = this.state;
    if (!login) {
      return (
        <Container>
          <TextL>Loading...</TextL>
        </Container>
      );
    }
    return (
      <Container>
        <TextL>환영합니다.</TextL>
        <TextL>{id}님!</TextL>
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
    background: #81ecec;
    align-items: center;
    justify-content: center;
`;
const TextL = styled.Text`
  font-size : 30px;
  font-weight : bold;
  margin : 0 10px;
`;
