import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import styled from 'styled-components';
import { BottomTabNavi } from './navigation';
import { LoginProvider } from './context';

export default class App extends React.Component {
  render() {
    return (
      <LoginProvider>
        <Container>
          <BottomTabNavi/>
        </Container>
      </LoginProvider>
    );
  }
};

const Container = styled.View`
    flex: 1;
`;