import { FontAwesome } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Actionsheet, Box, Button, Center, Checkbox, Divider, FlatList, Heading, HStack, Icon, Input, ScrollView, Text, useDisclose, VStack } from 'native-base'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Alert, Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import { recordSales } from '../../api/user'
import SuccessDialog from '../../components/SuccessDialog'
import { userReducer } from '../../features/user/userReducer'



export default function RecordWithNoStockScreen({route,navigation}) {
   
    const {
        isOpen,
        onOpen,
        onClose
      } = useDisclose();

    const [amount,setAmount] = useState(0);
    const [total,setTotal] = useState(0);
    const [visibility,setVisible] = useState(false);
    const [msg,setMsg] = useState("");
    const [saleAmount,setSaleAmount]  = useState(0);
    const [isCash,setIsChas] = useState(false);
    const [isCredit,setIsCredit] = useState(false);
    const  [creditor,setCreditor] = useState();
    const  [creditAmount,setCreditorAmount] = useState(0);
    const  [cash,setCash] = useState();
    const  [credit,setCredit] = useState();

    const  [disabled,setDisabled] = useState(false);
    
    const user = useSelector(state=>state.user);

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn:recordSales,
        onSuccess:(data)=>{
            setDisabled(!disabled)

            queryClient.invalidateQueries("sales")
            queryClient.invalidateQueries("profit")
            navigation.navigate("Dashboard")
            setMsg(data.msg)
            setVisible(!visibility);
            Alert.alert("Sales","Sales added successfully")
        }
    })

    useEffect(()=>{
    },[+saleAmount,amount])


    useEffect(()=>{
        let d = +saleAmount - +cash
        // alert(d)
        setCreditorAmount(d)
    },[cash,saleAmount])
    
    const handleSale = ()=>{
        if(!saleAmount)return;
        let  cstatus = "";
        if(+creditAmount){
            cstatus = "Pending"
        }else{
            cstatus = "No credit"
        }


        if(+creditAmount){
            if(!creditor){
                Alert.alert("Error","Please Fill Customer name")
                return;
            }
        }

        let data = {amount:saleAmount,total:saleAmount,customer_name:creditor,credit:creditAmount,credit_status:cstatus,token:user?.user?.token};
        // alert(JSON.stringify(data))
        // return;
        setDisabled(!disabled)
        mutation.mutate(data)
    }

    

    

  return (
        <ScrollView p={2} flex={1}>
            <HStack>
            <Box bg='white' width='100%' mb={4} p={2} rounded='md'>
                
            </Box>
            </HStack>

            <VStack bg='white' p={2}  rounded='md'>

                <Box mb={6}>
                    <Text py={2} color={'gray.400'}>Enter Sales Amount</Text>
                    <Input 
                    value={saleAmount}
                    _focus={{bg:"#FFF"}}
                    fontSize={16}
                    onChangeText={text=>setSaleAmount(text)}
                    placeholder='Enter Total Sales Amount'
                    keyboardType='number-pad'
                    />
                </Box>
                

                <VStack>
              <HStack alignItems='center'>
                {/* <Box>{"cash"+isCash}</Box> */}
                <Checkbox checked={isCash}  
                  onChange={()=>setIsChas(!isCash)} 
                  colorScheme="success"
                  accessibilityLabel=""
                  color='gray.700'
              >
                  <Text color="black">Cash</Text> 
              </Checkbox>

              {(isCash && isCredit) && <Input w={200} 
                keyboardType='number-pad' ml={3}
                value={cash}
                fontSize={16}
                onChangeText={text=>setCash(text)}
                placeholder="Enter Cash Amount" /> 
              }

              </HStack>
           

            <Checkbox checked={isCredit}  mt={4}
                onChange={()=>setIsCredit(!isCredit)} 
                colorScheme="success"
                accessibilityLabel=""
                color='gray.700'
            >
                <Text color="black">Credit</Text> 
            </Checkbox>



            </VStack>


   {isCredit? <>
              <VStack mt={4}>
                <Text py={0}>Customer Name</Text>
                <Input size='lg'
                name="item" 
                value={creditor}
                onChangeText={text=>setCreditor(text)}
                _focus={{bg:'white'}} placeholder="Customer Name" my={2} />
            </VStack>

            <VStack mt={4}>
                <Text py={0}>Amount</Text>
                <Box size='lg'
                name="creditAmount" 
                value={creditAmount}
                borderWidth={1}
                p={2}
                height={50}
                alignItems="flex-start"
                justifyContent='center'
                width='100%'
                rounded='md'
                borderColor="gray.200"
                keyboardType='numeric'
                _focus={{bg:'white'}} placeholder="Debited Amount" my={2}>
                    {creditAmount} </Box>
            </VStack>

            </>:''}

                <Button my={2} rounded='full' 
                isDisabled={disabled}
                onPress={handleSale}>Save</Button>

                <SuccessDialog 
                visible={visibility} 
                setVisible={setVisible} 
                navigation={navigation} slug={"sale"} 
                msg={msg}
                
                />

            </VStack>
        </ScrollView>
  )
}
