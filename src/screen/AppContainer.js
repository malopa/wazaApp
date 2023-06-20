import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppScreens from './Screens';
import { SkipContextProvider } from './context/SkipContext';
import { AuthProvider } from './AuthContext';

export default function AppContainer() {
  return (
    <NavigationContainer>
        <AuthProvider>
        <SkipContextProvider>
            <AppScreens />
        </SkipContextProvider>
      </AuthProvider>  

    </NavigationContainer>
  )
}
