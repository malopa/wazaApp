import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Input, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { addPurchase } from '../../api/user';
import SuccessDialog from '../../components/SuccessDialog';

export default function PurchaseItem({route,navigation}) {
    let {item,id}= route.params;

    let quentInvalidate = useQueryClient();

    const [quantity,setQuantity] = useState('')
    const [unitPrice,setUnitPrice] = useState('')
    const [totalPrice,setTotalPrice] = useState('')
    const [visibility,setVisible] = useState(false);

    const mutation = useMutation({mutationFn:addPurchase,
    onSuccess:(data)=>{
      quentInvalidate.invalidateQueries("items")
      setVisible(true)
      setUnitPrice("");
      setTotalPrice("");
      setQuantity("");

    }})

    useEffect(()=>{
      setTotalPrice("");

      if(+quantity && +unitPrice){
          setTotalPrice(+quantity * +unitPrice);
      }
    },[quantity,unitPrice])


    const handlePurchase = ()=>{
      let data = {quantity,itemId:id,price:unitPrice,totalPrice}
      mutation.mutate(data)
    }
  return (
    <Box flex={1} p={2}>

        <Box rounded='md' _text={{fontWeight:'bold',fontSize:18}} bg='white' p={2}>{item}</Box>

        <VStack mt={4} bg='white' rounded='md' p='2'>
          
          <Input
          rounded='full' 
          placeholder='Quantity'
          fontSize={16}
          my={2}
          _focus={{bg:'white'}}
          value={quantity}
          onChangeText={text=>setQuantity(text)}
          />


        <Input
          rounded='full' 
          fontSize={16}
          my={2}
          onChangeText={text=>setUnitPrice(text)}
          value={unitPrice}
          _focus={{bg:'white'}}
          placeholder='Buying price per unit'
          />

          <Box borderWidth={1} rounded='full' my={2} borderColor='gray.300' p={3}>{+totalPrice?+totalPrice:'total price'}</Box>

        <Button onPress={handlePurchase} rounded='full' mt={2}>
          Save
        </Button>

        </VStack>

      <SuccessDialog visible={visibility} 
      setVisible={setVisible} 
      navigation={navigation} 
      slug="sale"
      msg="Purchase record save successfully"
      />

    </Box>
  )
}
