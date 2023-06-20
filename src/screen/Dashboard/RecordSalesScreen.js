import { FontAwesome } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Actionsheet, Box, Button, Center, Checkbox, Divider, FlatList, Heading, HStack, Icon, Input, ScrollView, Text, useDisclose, VStack } from 'native-base'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { recordSales } from '../../api/user'
import SuccessDialog from '../../components/SuccessDialog'



export default function RecordSalesScreen({route,navigation}) {
    let {item,id,quantity,price}  = route.params
   
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
    const [isCash,setIsChas] = useState(true);
    const [isCredit,setIsCredit] = useState(false);
    const  [creditor,setCreditor] = useState();
    const  [creditAmount,setCreditorAmount] = useState(0);
    const  [cash,setCash] = useState(0);
    const  [credit,setCredit] = useState(0);

    const  [disabled,setDisabled] = useState(false);


    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn:recordSales,
        onSuccess:(data)=>{
            setDisabled(!disabled)

            queryClient.invalidateQueries("items")
            queryClient.invalidateQueries("sales")
            queryClient.invalidateQueries("profit")
            setMsg(data.msg)
            setVisible(!visibility);
        }
    })

    useEffect(()=>{
        if(+quantity && +amount){
            setTotal((+amount) * (+sellPrice));
        }
    },[+sellPrice,amount])


    useEffect(()=>{
        let d = +total - +cash
        setCreditorAmount(d)
    },[cash,sellPrice])
    
    const handleSale = ()=>{
        
        if(!sellPrice)return;
        let  cstatus = "";
        if(+creditAmount){
            cstatus = "Pending"
        }else{
            cstatus = "No credit"
        }

        let data = {amount,total,itemId:id,customer_name:creditor,credit:creditAmount,credit_status:cstatus,isCash,isCredit};

        // alert(JSON.stringify(data))
        // return;

        setDisabled(!disabled)
        mutation.mutate(data)
    }

    

    

  return (
        <ScrollView position={'relative'} p={2} flex={1}>
            <HStack>
            <Box bg='white' width='100%' mb={4} p={2} rounded='md'>
                <Heading>
                    <Text fontSize={18}>{item} </Text>
                </Heading>
            </Box>
            </HStack>



            <VStack bg='white' p={2}  rounded='md'>


                <Box my={2}>    
                <Text px={3} py={2} fontSize={16}>Sale Price</Text>

                <Input rounded='md'  
                    placeholder='Enter Sales' 
                    _focus={{bgColor:'white'}}
                    fontSize={16}
                    value={sellPrice}
                    keyboardType="number-pad"
                    onChangeText={text=>setSalePrice(text)}
                    />
                </Box>


             

                <Box my={2} >
                    <HStack alignItems='center'>
                        <Text >Total Sales: </Text> 
                        <Text fontSize={18}>
                            {sellPrice}
                            </Text>
                    </HStack>
                    </Box>


                <VStack>
              <HStack alignItems='center'>

                <Checkbox checked={isCash}  
                defaultIsChecked={isCash} 

                  onChange={()=>setIsChas(!isCash)} 
                  colorScheme="success"
                  accessibilityLabel=""
                  color='gray.700'
              >
                  <Text color="black">Cash hjhjh</Text> 
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
                defaultIsChecked={isCredit} 

                onChange={()=>setIsCredit(!isCredit)} 
                colorScheme="success"
                accessibilityLabel=""
                color='gray.700'
            >
                <Text color="black">Credit</Text> 
            </Checkbox>



            </VStack>


   {isCredit?<>
              <VStack mt={4}>
                <Text py={0}>Customer Name</Text>
                <Input size='lg'
                name="item" 
                value={creditor}
                onChangeText={text=>setCreditor(text)}
                _focus={{bg:'white'}} placeholder="Customer Name" my={2} />
            </VStack>

            <VStack mt={4}>
                <Text py={0}>Debited Amount</Text>
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

            <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" />
        </ScrollView>
  )
}
