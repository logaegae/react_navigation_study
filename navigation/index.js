import React from 'react';
import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { DrawerActions } from 'react-navigation';

import Home from '../components/Home'
import Home2 from '../components/Home2'
import Page1 from '../components/Page1'
import Page2 from '../components/Page2'
import Page3 from '../components/Page3'

const styles = StyleSheet.create({
    menu : {
        padding : 10
    }
});


const DrawerNavi1 = createDrawerNavigator({
    Home1 : { 
        screen : Home
    },
    SignIn : { 
        screen : Page1,
        navigationOptions: {
            title: 'SignIn'
        }
    },
    Welcome : { 
        screen : Page2,
        navigationOptions: {
            title: 'Welcome'
        }
    },
    LogOut : { 
        screen : Page3,
        navigationOptions: {
            title: 'LogOut'
        }
    }
},{
    drawerPosition : 'left',
    getCustomActionCreators: (route, stateKey) => {
        return {
          toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
        };
    },
});

const DrawerNavi2 = createDrawerNavigator({
    Home1 : { 
        screen : Home
    },
    Page2 : { 
        screen : Page2
    },
    Page3 : { 
        screen : Page3
    }
},{
    drawerPosition : 'right',
    getCustomActionCreators: (route, stateKey) => {
        return {
          toggleRightDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
        };
    },
});

const StackNavi1 = createStackNavigator({
    Right : { 
        screen : DrawerNavi1,
    },
    Home : { 
        screen : Home,
        navigationOptions: {
            title: 'Home1'
        }
    }
  },{
    initalRouteName : 'Home',
    navigationOptions : ({navigation}) => ({
        title : "Home1",
        headerStyle: {
          backgroundColor: '#00b894',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize : 20
        },
        headerRight : (
            <TouchableOpacity onPress={() => {navigation.dispatch(
                DrawerActions.toggleDrawer({ key: navigation.state.key })
            );}}>
                <Ionicons
                    style={styles.menu}
                    name="md-menu" 
                    size={25}
                    color="white"
                />
            </TouchableOpacity>
        )
    })
});

export const StackNavi2 = createStackNavigator({
    Home2 : { 
        screen : Home2,
        navigationOptions: {
            title: 'Home2'
        }
    },
    Page1 : { 
        screen : Page1,
        navigationOptions: {
            title: 'Page1'
        }
    },
    Page2 : { 
        screen : Page2,
        navigationOptions: {
            title: 'Page2'
        }
    },
    Page3 : { 
        screen : Page3,
        navigationOptions: {
            title: 'Page3'
        }
    }
  },{
    initalRouteName : 'Home2'
});

export const BottomTabNavi = createBottomTabNavigator({
    Home1 : StackNavi1,
    Home2 : StackNavi2
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      } else {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});

