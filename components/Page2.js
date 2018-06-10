import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components';

export default class Home extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Page2'
  };

  render() {
    return (
      <Container>
        <TextL>Page2</TextL>
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
