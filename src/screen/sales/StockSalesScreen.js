import { FontAwesome } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Actionsheet, Box, Button, Center, Divider, FlatList, Heading, HStack, Icon, Input, ScrollView, Text, useDisclose, VStack } from 'native-base'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { recordSales } from '../../api/user'
import SuccessDialog from '../../components/SuccessDialog'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();




export default function StockSalesScreen({route,navigation}) {
    let {item,id,quantity,price}  = route.params
    alert(id)
   
    const {
        isOpen,
        onOpen,
        onClose
      } = useDisclose();

    const [amount,setAmount] = useState(0);
    const [total,setTotal] = useState(0);
    const [visibility,setVisible] = useState(false);
    const [msg,setMsg] = useState("");
    const [sellPrice,setSalePrice]  = useState("");

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn:recordSales,
        onSuccess:(data)=>{
            queryClient.invalidateQueries("items")
            setMsg(data.msg)
            setVisible(!visibility);
        }
    })

    useEffect(()=>{
        if(+quantity && +amount){
            setTotal((+amount) * (+sellPrice));
        }
    },[+sellPrice,amount])

    
    const handleSale = ()=>{
        if(!sellPrice)return;
        let data = {amount,total,itemId:id};
        mutation.mutate(data)
    }

    

  return (
        <Box p={2} flex={1}>
            <HStack >
            <Box bg='white' width='100%' mb={4} p={2} rounded='md'>
                <Heading>
                    <Text fontSize={18}>{item} </Text>
                </Heading>
            </Box>
            </HStack>

            <VStack bg='white' p={2}  rounded='md'>

                <Box my={2}>
                    <Text px={3} py={2} fontSize={18}>Quantity Sold</Text>
                    <Input rounded='full'  
                    placeholder='Enter Quantity Sold' 
                    _focus={{bgColor:'white'}}
                    fontSize={16}
                    onChangeText={text=>setAmount(text)}
                    />
                </Box>

                <Box my={2}>    
                    <Text px={3} py={2} fontSize={18}>Quantity Available</Text>
                    <Box rounded='full'
                        borderWidth={1} borderColor='gray.300'
                        p={3}
                        >
                        {quantity}
                    </Box>
                </Box>

                <Box my={2}>    
                <Text px={3} py={2} fontSize={18}>Sale Price</Text>
                <Input rounded='full'  
                    placeholder='Enter Sale Price' 
                    _focus={{bgColor:'white'}}
                    fontSize={16}
                    value={sellPrice}
                    onChangeText={text=>setSalePrice(text)}
                    />
                </Box>

                <Box my={2} _text={{fontSize:18,justifyContent:'space-between'}} >Total: {total}</Box>

                <Button my={2} rounded='full' onPress={handleSale}>Save</Button>

                <SuccessDialog 
                visible={visibility} 
                setVisible={setVisible} 
                navigation={navigation} slug={"sale"} 
                msg={msg}
                
                />

            </VStack>
        </Box>
  )
}
