import { Box } from 'native-base'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BrellaNotificationScreen from './BrellaNotificationScreen';
import TraNotificationScreen from './TraNotificationScreen';
import WazacomNotificationScreen from './WazacomNotificationScreen';
import ComplianceNotificationScreen from './BrellaNotificationScreen';

const Tab = createMaterialTopTabNavigator();

export default function Notifications() {
  return (
    <Tab.Navigator 
    screenOptions={{
      headerStyle:{elevation:0,shadowColor:'none'},
      tabBarStyle: { elevation:0 },
    }}
    >

      <Tab.Screen name="Compliance" component={ComplianceNotificationScreen} />
      <Tab.Screen name="Waza" component={WazacomNotificationScreen} />

    </Tab.Navigator>
  )
}
