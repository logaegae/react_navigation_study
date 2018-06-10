import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import styled from 'styled-components';
import { BottomTabNavi } from './navigation';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <BottomTabNavi/>
      </Container>
    );
  }
};

const Container = styled.View`
    flex: 1;
`;