import { configureStore} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { rootReducer } from './features';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';



const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    whitelist:['user',"business"]
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const store = configureStore({
    reducer:persistedReducer,
    middleware: [thunk],
})


export const persistor = persistStore(store)