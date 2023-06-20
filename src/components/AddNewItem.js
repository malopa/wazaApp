import {
  Alert,
    KeyboardAvoidingView,    
  } from 'react-native';
import { AlertDialog, Box, Button, Center, Checkbox, FormControl, HStack, Input, Modal, Text, VStack } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { StateAuth } from "../StateAuth";
import { Color } from "./Color";
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/user/items/itemSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct, addPurchase } from '../api/user';
import SuccessDialog from './SuccessDialog';


export const AddNewItem = (props) => {
    const {isOpen,setIsOpen} = useContext(StateAuth);
    const [item,setItem] = useState(null);
    const [quantity,setQuantity] = useState(0);
    const [price,setPrice] = useState(0);
    const [total,setTotal] = useState(null);
    const [visibility,setVisible] = useState(false);
    const [isCash,setIsChas] = useState(true);
    const [isCredit,setIsCredit] = useState(false);
    // const  [creditor,setCreditor] = useState();
    const  [cash,setCash] = useState(0);
    const  [credit,setCredit] = useState(0);
    const [totalPurchase,setTotalPurchase] = useState(0);
    const [creditorName,setCreditorName] = useState("")

    const user = useSelector(state=>state.user)

    const [modalVisible, setModalVisible] = React.useState(false);

    const queryClient  = useQueryClient();
    const mutation = useMutation({
      mutationFn:addPurchase,
      onSuccess:(data)=>{
        // alert(data)
        queryClient.invalidateQueries("items")
        setVisible(!visibility)
        setPrice("")
        setQuantity("")
        setTotal("")
        setItem("")
        setCash("")
        onClose();
        setTotalPurchase("")
      }
    })

    const dispatch = useDispatch();
    
  
    const onClose = () => setIsOpen(false);
  
    const cancelRef = React.useRef('');


    useEffect(()=>{
      if(+totalPurchase){
        setCredit(+totalPurchase - +cash)
      }

    },[cash,totalPurchase])


    useEffect(()=>{
      if(+totalPurchase){
        setTotal(totalPurchase);
      }
    },[totalPurchase])

    
    const saveItem = ()=>{

        if(isCash && isCredit){
          
          if(+total !== (+cash + +credit )){
            Alert.alert("Match error",
              "Cash and Credit sum must be equal to Total Purchases Value"
            )
          }
          // alert("cash")

          // return;
        }


        let data = {}
        if(user.user.user.saleMode=== "No Stock"){
          data = {name:"Bulk Purchase",total:totalPurchase,isCredit,isCash,creditorName,credit}
        }else{
        if(!item,!price,!total)return;

          data = {name:item,price,quantity,total:(+price * +quantity),isCredit,isCash,creditorName,credit}
        }

        // alert(JSON.stringify(data))
        // return;

        mutation.mutate(data)
       
    }


    
    return( 
    <KeyboardAvoidingView flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>            
    <Center  bg='white'>
        
        {/* <Box>
          {JSON.stringify(user.user.user.saleMode)}
        </Box> */}
    

        <AlertDialog width={450} marginLeft={-5} 
        avoidKeyboard leastDestructiveRef={cancelRef} 
        isOpen={props.isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>{(user?.user?.user?.saleMode === "No Stock")?"Add New Purchases":"Add new Item"}</AlertDialog.Header>
            <AlertDialog.Body>

            {(user?.user?.user?.saleMode === "No Stock")?<Box>
              <VStack>
                  <Text>Total Purchase</Text>
                  <Input size='lg' 
                  name="Total purchase" 
                  value={totalPurchase}
                  keyboardType="number-pad"
                  onChangeText={text=>setTotalPurchase(text)}
                  _focus={{bg:'white'}} placeholder="Total purchase amount" my={2} />

              </VStack>
            </Box>:<>
            <VStack>
                <Text>Item Name</Text>
                <Input size='lg' 
                name="item" 
                value={item}
                onChangeText={text=>setItem(text)}
                _focus={{bg:'white'}} placeholder="item name" my={2} />

            </VStack>
            <VStack>
                <Text py={0}>Item quantity</Text>
                <Input size='lg'
                name="item" 
                value={quantity}
                keyboardType='numeric'
                onChangeText={text=>setQuantity(text)}
                _focus={{bg:'white'}} placeholder="Quantity" my={2} />
            </VStack>
            <VStack>
                <Text>Price per unit</Text>
                <Input name="price" value={price}
                onChangeText={text=>setPrice(text)} 
                size='lg' 
                _focus={{bg:'white'}} 
                keyboardType='numeric'
                placeholder="Price per unit" my={2}/>
            </VStack>
            <VStack>
                {/* <Text>Total value </Text> */}
                <Box border={1} borderColor='gray.300' p={2} size='lg'
                _focus={{bg:'white'}} 
                placeholder="Value" 
                my={2}
                h={10}
                >
                  <HStack><Text fontWeight='bold' 
                  fontSize={20}>Total Purchases: {total}</Text>
                  </HStack>
                </Box>
            </VStack>

            </>}

            <VStack>
              <HStack alignItems='center'>

                <Checkbox checked={isCash}
                defaultIsChecked={isCash} 
                  onChange={()=>setIsChas(!isCash)} 
                  colorScheme="success"
                  accessibilityLabel=""
                  color='gray.700'
              >
                  <Text color="black">Cash</Text> 
              </Checkbox>

              {(isCash && isCredit) && <Input w={200} 
                keyboardType='numeric' ml={3}
                value={cash}
                size={16}
                mt={4}
                onChangeText={text=>setCash(text)}
              placeholder="Enter Cash Amount" /> }


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
                <Text py={0}>Creditor Name</Text>
                <Input size='lg'
                name="creditorName" 
                value={creditorName}
                onChangeText={text=>setCreditorName(text)}
                _focus={{bg:'white'}} placeholder="Creditor Name" my={2} />
            </VStack>

            <VStack mt={4}>
                <Text py={0}>Amount Credited</Text>
                <Box 
                name="credit"
                borderWidth={1} 
                borderColor="gray.300"
                height={12}
                rounded='md'
                px={4}
                alignItems='flex-start'
                justifyContent={'center'}
                width='90%'
                 my={2}>{credit}</Box>
            </VStack>

            </>:''}

            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  Cancel
                </Button>
                <Button bg={`${Color.primary}`} 
                    onPress={saveItem}>
                  Save
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>

      <SuccessDialog 
        visible={visibility} 
        setVisible={setVisible} 
        navigation={props.navigation}
        slug="purchase"
        msg={(user?.user?.user?.saleMode === "No Stock")?"Purchases added successfully":"Item added successfully"}
      />

      </KeyboardAvoidingView>
      )
  };