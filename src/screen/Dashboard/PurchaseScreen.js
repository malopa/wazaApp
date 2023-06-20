import { Box, Button, Center, Heading, HStack, Text } from 'native-base'
import React, { useContext } from 'react'
import { KeyboardAvoidingView, Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import { AddNewItem } from '../../components/AddNewItem'
import { StateAuth } from '../../StateAuth'

export default function PurchaseScreen({navigation}) {
  const {isOpen} = useContext(StateAuth)


  const user = useSelector(state=>state.user)

  return (
    <KeyboardAvoidingView flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> 
    <Center bg='white' flex={1}>
        <Box minH={400} w='full' p={4}>
            <HStack 
            justifyContent='space-between' 
            alignItems='center'>

              <Box bgColor='blue.500' h={100} width={170} rounded='md'
               p={2}
               _text={{fontSize:18,color:'#FFF',fontWeight:'bold'}}
               >

                <Text color='#FFF' fontSize={18} fontWeight='bold'>Previous Purchases</Text>

              <Box _text={{color:'gray.200'}}><HStack>
                <Text >Total purchase: </Text>
                <Text fontWeight='bold'> 0 TZs</Text>
              </HStack>
              </Box>

              </Box>

              <Box borderWidth={2} 
              bg='green.400'  
              rounded='md' width={170} height={100} 
              borderColor='green.400' p={2}>
              <Text fontSize={18}  fontWeight='bold'>Today Purchases</Text>
              <Box _text={{color:'gray.600'}}>
                <HStack>
                  <Text>Total purchase:</Text> 
                  <Text fontWeight='bold'>0 TZs</Text>
                  </HStack>
              </Box>

              </Box>
            </HStack>

          {user.user.user.saleMode === "stock" && <>
            <Box mt={4}>
              <Pressable  onPress={()=>navigation.navigate("ItemsScreen",{slug:"purchase"})}>
                <Box bg='yellow.300' h={100} p={2}  justifyContent='center'
                alignItems='center'
                rounded='md'> 
                    <Text fontSize={18} fontWeight='bold'>Total items Items</Text>
                </Box>
              </Pressable>
            </Box>

            <Box mt={4}>
              <Pressable  onPress={()=>navigation.navigate("ItemsScreen",{slug:"purchase"})}>
                <Box bg='yellow.300' h={100} p={2}  
                justifyContent='center'
                alignItems='center'
                rounded='md'> 
                    <Text fontSize={18} fontWeight='bold'>Add New Items </Text>
                </Box>
              </Pressable>
            </Box>
            </>
            }


            
        </Box>

          <AddNewItem isOpen={isOpen} navigation={navigation}/>
    </Center>
  </KeyboardAvoidingView>
  )
}
