import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const items = [
  { name: 'Home'},
  { name: 'SignIn'},
  { name: 'Welcome'},
  { name: 'LogOut'},
]

export default class Home extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Home'
  };

  List = (item, i) => {
    return (
      <ListButton
          key={i}
          onPress={() => this.props.navigation.navigate(item.name)}
        >
        <TextM>{item.name}</TextM>
      </ListButton>
    );
  }

  render() {
    return (
      <Container>
        <TextL>Menu 1</TextL>
        {items.map(this.List)}
        <ListButton
          onPress={() => this.props.navigation.toggleRightDrawer()}
        >
          <TextM>Drawer</TextM>
        </ListButton>
      </Container>
    );
  }
}

const Container = styled.View`
    flex: 1;
    background: #ffeaa7;
    align-items: center;
    justify-content: center;
`;
const TextL = styled.Text`
  font-size : 30px;
  font-weight : bold;
  margin-top : 15px;
  margin-bottom : 15px;
`;

const ListButton = styled.TouchableOpacity`
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