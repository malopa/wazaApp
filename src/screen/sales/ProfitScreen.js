import { useQuery } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { Box, Pressable,HStack, VStack } from 'native-base'
import React from 'react'
import { Alert } from 'react-native'
import { getProfit } from '../../api/user'
import currencyFormat from '../../components/format'

export default function ProfitScreen({navigation}) {

  const date = new Date();
  const {data} = useQuery({queryKey:['profit'],queryFn:()=>getProfit()})

  


  return (
    <Box p={2} flex={1}>
      <StatusBar />
      <VStack>
        <HStack>
          <Box bg='yellow.300' width='full' rounded='md' p={4}>
            <VStack>
              <HStack justifyContent={'space-between'} alignItems="center" py={2}>
                <Box _text={{fontSize:20,fontWeight:'bold',color:'black'}}>Net Profit</Box>
                <Box _text={{fontSize:18,color:(data?.profit > 0)?'green.500':'red.500'}}>{"("+(currencyFormat(+(data?.profit)))+")"}</Box>
              </HStack>
              <Box _text={{color:'gray.600'}}>{"Today Date "+date.toLocaleDateString("en-US")}</Box>


            </VStack>
          </Box>
        </HStack>

        <Pressable mt={2} onPress={(text)=>Alert.alert("Hello people","My items data")} my={2}>
        <Box  borderColor='blue.400' borderWidth={1}
        rounded='md'
        py={3}
        bg='white'
        _text={{textAlign:"center",fontSize:16, fontWeight:'bold'}}
        >View Profit Details</Box>
        </Pressable>

      </VStack>
  
    </Box>
  )
}
