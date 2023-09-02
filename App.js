import 'react-native-gesture-handler';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/screen/AppContainer';
// import { Provider as PaperProvider } from 'react-native-paper';
import { persistor, store } from './src/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StateAuthProvider } from './src/StateAuth';

const queryClient = new QueryClient()


const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      {/*  */}
      <PersistGate persistor={persistor}>
        {/* native base for ui */}
          <NativeBaseProvider  extendTheme={newColorTheme}> 
          {/* QueryClientProvider for api */}
              <QueryClientProvider client={queryClient}>
                <StateAuthProvider>
                  
                  <AppContainer />

                </StateAuthProvider>
              </QueryClientProvider>
        </NativeBaseProvider>
      </PersistGate>
      
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
