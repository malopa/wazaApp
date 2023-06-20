import { Box, Button, Divider, HStack, Icon, Text } from 'native-base'
import React, { useContext } from 'react'


import SaleScreen from './Dashboard/SaleScreen';
import CostScreen from './Dashboard/CostScreen';
import PurchaseScreen from './Dashboard/PurchaseScreen';
import ExpensesScreen from './Dashboard/ExpensesScreen';
import StockScreen from './Dashboard/StockScreen';
import CashBookScreen from './Dashboard/CashBookScreen';
import BankAccountScreen from './Dashboard/BankAccountScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {FontAwesome, FontAwesome5, Ionicons} from "@expo/vector-icons"
import { StateAuth } from '../StateAuth';
import DebtsScreen from './sales/DebtsScreen';
import CustomerScreen from './sales/CustomerScreen';
import ProfitScreen from './sales/ProfitScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Box py={8}  bg="yellow.300" 
      justifyContent={`center`} alignItems='center'>
        {/* <Icon as={<FontAwesome name={faUser}/>} /> */}
        <FontAwesome5 name='user-circle' 
        size={48} 
        color='gray.400' />
      </Box>
      <Divider mb={4} mt={2}/>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
}


export default function Dashbaord() {

  const {isOpen,setIsOpen}  = useContext(StateAuth)
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}


    screenOptions={{
      drawerStyle: {
        backgroundColor: 'lightblue',
        drawerType: Dimensions.width >= 768 ? 'permanent' : 'front',
        width: 240,
        overlayColor: 'transparent',
      },
    }}
    >


    <Drawer.Screen name="Sale" component={SaleScreen} options={{headerStyle:{shadowColor:'none',borderEndWidth:0,elevation:0},title:"Sales",headerTintColor:'#FFF',headerStyle:{backgroundColor:'#059ed8'}}} />
  <Drawer.Screen name="CashBook" component={CashBookScreen} options={{title:"Cash Book"}} />

   
    <Drawer.Screen name="Purchase" component={PurchaseScreen}  options={{headerStyle:{shadowColor:'none',borderEndWidth:0,elevation:0},title:"Purchases",
    headerRight:()=><Button mr={2} 
    onPress={() => setIsOpen(!isOpen)}
    bg="#059ed8" _focus={{bg:'blue.400'}} color="white">
      <HStack alignItems='center'>
        <Icon as={<FontAwesome name='plus-circle' />} size={6} color='white' /> 
        <Text>Add Item</Text>
      </HStack>
      </Button>}} />

    
    <Drawer.Screen name="Expenses" component={ExpensesScreen} />
    <Drawer.Screen name="Profit" component={ProfitScreen} options={{title:"Profit"}} />
   
    <Drawer.Screen name="Stock" component={StockScreen} options={{title:"Stocks"}} />
    <Drawer.Screen name="Debts" component={DebtsScreen} options={{title:"Debts"}} />
    <Drawer.Screen name="Customer" component={CustomerScreen} options={{title:"Customers"}} />
    
    <Drawer.Screen name="BankAccount" component={BankAccountScreen} options={{title:"Virtual Bank Account"}} />
  </Drawer.Navigator>
  )
}
