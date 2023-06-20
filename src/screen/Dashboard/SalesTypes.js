import { useMutation } from '@tanstack/react-query'
import { Box, Button, Center, Divider, HStack, Radio, ScrollView, Text } from 'native-base'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveBusiness, updateUser } from '../../api/user'
import { updateSaleType } from '../../features/user/loginSlice'

export default function SalesTypes(props) {

    const user = useSelector(state=>state.user)
    const dispatch = useDispatch();

    const [businessMode,setBusinesMode] = useState(null)
    const mutation  = useMutation({
        mutationFn:updateUser,
        onSuccess:(data)=>{
            // let _user = {...user,user:{...user,user:{...user,saleMode:data?.data.saleMode}}}
            // let _user = user.user.user;
            // let user_ = {...user,user:{...user:{...user,saleMode:data?.data.saleMode} } }
            // alert(JSON.stringify(user_))

            // dispatch(updateSaleType(_user))


            props.navigation.navigate("Dashboard")
        }
    })

    const saveMode = ()=>{
        let data = {saleMode:businessMode,token:user?.user.token}
        // alert(JSON.stringify(data))
        mutation.mutate(data)
    }

  return (
    <Center>
    <ScrollView>

        <Box bg='white' w='96%' m={2} borderWidth={1} 
        borderColor='gray.300' rounded='lg' mb={4}
        p={4}>
            <HStack alignItems={'center'} justifyContent='space-between'>
                <Box _text={{fontWeight:'bold'}}>Pick Your Choosen Mode</Box>
                
            </HStack>

            <Box>
            <Radio.Group bg='white' _text={{fontWeight:'bold'}} 
              rounded='full' 
                    defaultValue={businessMode}
                    name="myRadioGroup" accessibilityLabel="Type of business" 
                    onChange={(item)=>setBusinesMode(item)}
                    >
                        <Radio value={'stock'} >
                            <Box>
                            <Text p={2} fontSize={16} textTransform='uppercase' fontWeight='bold' >Keep Records <Text color='green.500'>With</Text> Inventory</Text>
                            </Box>
                        </Radio>
                        <Box pl={2} py={2} _text={{textAlign:'justify'}}>
                        Here you can track inventory movement.
                        This means you need to record transactions in an itemized manner, including  units, cost per unit and total value; for example a purchase of TZS 20, can be recorded as follows: buy 10 Oranges at TZS. 2 per orange: Then, record: 10 Oranges * TZS 2 per one orange = TZS 20
                        
                        <Box>
                        <Text textAlign='justify' fontWeight={'bold'}>Benefit:</Text> You can be reminded when inventory is reducing, easily track inventory movements, achieve accurate profits and make accurate business decision
                        </Box>

                        
                        <Box _text={{textAlign:'justify'}}>
                        <Text fontWeight={'bold'}>
                        Challenges: </Text>It’s time-consuming and requires some financial knowledge. Attention to detail is neccessary, and confusion can easily occur.
                        </Box>

                        
                        <Box _text={{textAlign:'justify'}}>
                        <Text fontWeight={'bold'}>
                        Overall:</Text> Despite it being time-consuming, this is the recommended method for keeping accurate business financial records which always leads to better decision-making.
                        </Box>
                        
                        </Box>

                        <Divider />

                        <Radio value={`No Stock`} >
                            <Text p={2} fontSize={16} textTransform='uppercase' fontWeight='bold' >Keep Records <Text color='red.400'>Without</Text> Inventory</Text>
                        </Radio>
                        <Box pl={2} py={2} _text={{textAlign:'justify'}}>
                        Here, you cannot track movement of inventory because they are not recorded.
                        If you don’t have enough time but want to see something at a glance, you can  record transactions in totality. This means keep records with total values only. for example,a purchase of TZS 20, can be record as TZS 20 only without showing cost per item, or even number of units purchased. Sales of TZS 30 from selling 10 Oranges at TZS 3 per orange can be recorded as TZS 30 only

 

                <Box>
                    <Text fontWeight={'bold'}>
                Benefit:</Text> It’s time saving if you don’t have enough time to spare and easy to record since it doesn't require any financial skills. You don’t need to pay attention to details
                </Box>

 
            <Box>
                <Text fontWeight={'bold'}>
            Challenges: </Text>It can’t establish accurate profits or lead to better business decision-making since it cannot provide information about inventory movement.
            </Box>


 

                        <Box pb={10}>
                            <Text fontWeight={'bold'}>
                        Overall:</Text> This method of keeping business financial records is not recommended at all. Otherwise, there is no way to opt for the first Method.
                        </Box>


 

                        </Box>
                       
                </Radio.Group>

            </Box>

        
        </Box>
    </ScrollView>


        <Box bg='white' w='full' px={4} position={'absolute'} py={2} bottom={0}>
                <Button onPress={saveMode} isDisabled={businessMode?false:true} ><Text color='white' fontSize={18}>Next</Text></Button>
            </Box>
    </Center>
  )
}
