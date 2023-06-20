import React from 'react'
import {Box,Center, Text, extendTheme,NativeBaseProvider } from "native-base";
// import appTheme from './theme';
import { Provider as PaperProvider } from 'react-native-paper';
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AppContainer from './screen/AppContainer';

// Create a client
const queryClient = new QueryClient()

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

// colorModeManager={appTheme}
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <NativeBaseProvider  extendTheme={newColorTheme}>
              <QueryClientProvider client={queryClient}>
                <AppContainer />
              </QueryClientProvider>
        </NativeBaseProvider>
      </PersistGate>
      
    </Provider>


  )
}
