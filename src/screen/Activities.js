import React from 'react'
import {Box, Icon} from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashbaord from './Dashbaord';
import Settings from './Settings';
import Explore from './Explore';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Notifications from './Explore';

const Tab = createBottomTabNavigator();

export default function Activities() {
  return (
    <Tab.Navigator 
    screenOptions={{
      // tabBarBackground: () => (
        // <BlurView tint="light" intensity={100} />
        
      // ),
      tabBarStyle:{elevation:0,shadowColor:0}
    }}
    >
      <Tab.Screen name="Home" options={{tabBarIcon:()=>
      <Icon color='coolGray.400' as={<MaterialCommunityIcons name="home"   />} size={6}/>,
      headerShown:false,headerStyle:{elevation:0,shadowColor:'none'}}} 
     component={Dashbaord} />

      <Tab.Screen name="Explore" 
      options={{title:"Notifications",tabBarIcon:()=><Icon as={<MaterialCommunityIcons name='bell-alert-outline'/>} 
      name="web" size={6} color="coolGray.400" _dark={{
        color: "warmGray.50"
      }} />,
      headerStyle:{shadowColor:'none',elevation:0}}} 
      component={Notifications} />

      <Tab.Screen name="Settings" 
      options={{title:"Settings",
      tabBarIcon:()=><Icon  color='coolGray.400' as={<FontAwesomeIcons name='gear' />} size={6} />, 
      headerStyle:{elevation:0,shadowColor:'none'}}} 
      component={Settings} />
      
    </Tab.Navigator>
  )
}
