import React, { useContext, useRef, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './SignUp';
import Business from './Business';
import Activities from './Activities';
import Home from './Home';
import Login from './Login';
import { AlertDialog, Button, Center, Pressable, Text } from 'native-base';
import { SkipContext } from './context/SkipContext';
import Invites from './Invites';
import Profile from './Profile';
import RecordSalesScreen from './Dashboard/RecordSalesScreen';
import ItemsScreen from './ItemsScreen';
import SearchItem from '../../SearchItems';
import PurchaseItem from './Dashboard/PurchaseItem';
import PasswordReset from './password-reset/PasswordReset';
import OtpScreen from './password-reset/OtpScreen';
import NewPasswordScreen from './password-reset/NewPasswordScreen';
import ExpenseItemScreen from './Dashboard/ExpensesItemScreen';
import SalesTypes from './Dashboard/SalesTypes';
import RecordWithNoStockScreen from './Dashboard/RecordWithNoStockScreen';



const Stack = createNativeStackNavigator();

export default function AppScreens({navigation}) {
    const {isSkip,setIsSkip} = useContext(SkipContext);

  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle:{
      headerShown:false},
      shadowColor:'none',
      borderWidth:0,
      elevation:0
    }
    }
    >
                <Stack.Screen name="Login" 
                options={{headerShown:false}} 
                component={Login} />

                <Stack.Screen name="SignUp" component={Signup} options={{headerShown:false}} />
                <Stack.Screen name="Business" component={Business} 
                options={({navigation})=>({title:"Register Your Business Here",
                headerRight:()=><Pressable className='p-2' 
                onPress={()=>setIsSkip(!isSkip)}>
                    <Text>Skip</Text>
                </Pressable>,
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0
                  },
                })} />

                <Stack.Screen name="Dashboard" options={{headerShown:false}} component={Activities} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Invites" options={{title:'My Business',headerStyle:{elevation:0,shadowColor:'none'}}} component={Invites} />

                <Stack.Screen name="PasswordReset" options={{title:'Reset Password',headerStyle:{elevation:0,shadowColor:'none'}}} component={PasswordReset} />
                <Stack.Screen name="OtpScreen" options={{title:'Reset Password',headerStyle:{elevation:0,shadowColor:'none'}}} component={OtpScreen} />

                <Stack.Screen name="NewPasswordScreen" options={{title:'Reset Password',headerStyle:{elevation:0,shadowColor:'none'}}} component={NewPasswordScreen} />
                <Stack.Screen name="Profile" options={{title:'My Profile',headerStyle:{elevation:0,shadowColor:'none'}}} component={Profile} />

                <Stack.Screen name="Record" options={{title:'Sales',headerStyle:{elevation:0,shadowColor:'none'}}} component={RecordSalesScreen} />

                <Stack.Screen name="ItemsScreen" options={{title:'Items List',headerShown:false,headerStyle:{elevation:0,borderWidth:0, shadowColor:'none'}}} component={ItemsScreen} />

                <Stack.Screen name="PurchaseItem" options={{title:'Purchase',headerShown:true,headerStyle:{elevation:0,borderWidth:0, shadowColor:'none'}}} component={PurchaseItem} />

                <Stack.Screen name="ExpenseItem" options={{title:'Expenses Item Details',headerShown:true,headerStyle:{elevation:0,borderWidth:0, shadowColor:'none'}}} component={ExpenseItemScreen} />

                <Stack.Screen name="SaleType" options={{title:'Mode of keeping Records',headerShown:true,headerStyle:{elevation:0,borderWidth:0, shadowColor:'none'}}} component={SalesTypes} />

                <Stack.Screen name="RecordWithNoStockScreen" options={{title:'Sales Records ',headerShown:true,headerStyle:{elevation:0,borderWidth:0, shadowColor:'none'}}} component={RecordWithNoStockScreen} />

                
                
               
    </Stack.Navigator>
  )
}
