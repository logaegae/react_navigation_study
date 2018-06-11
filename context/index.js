import React, { Component, createContext } from 'react';

const Context = createContext();
const { Provider, Consumer: LoginConsumer } = Context; 

class LoginProvider extends Component {
  state = {
    id : '',
    loginStatus : false
  }

  actions = {
    login: (id) => {
      this.setState({id, loginStatus : true});
    },
    logout: () => {
        this.setState({id : '', loginStatus : false})
    }
  }

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}
  
// 내보내줍니다.
export {
    LoginProvider,
    LoginConsumer,
};