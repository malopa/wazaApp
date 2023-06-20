import { Box } from 'native-base'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BrellaNotificationScreen from './BrellaNotificationScreen';
import TraNotificationScreen from './TraNotificationScreen';
import WazacomNotificationScreen from './WazacomNotificationScreen';


const Tab = createMaterialTopTabNavigator();

export default function Explore() {
  return (
    <Tab.Navigator 
    screenOptions={{
      headerStyle:{elevation:0,shadowColor:'none'},
      tabBarStyle: { elevation:0 },
    }}
    >
      <Tab.Screen name="Brella" component={BrellaNotificationScreen} />
      <Tab.Screen name="Tra" component={TraNotificationScreen} />
      <Tab.Screen name="Waza" component={WazacomNotificationScreen} />
    </Tab.Navigator>
  )
}
