import { useQuery } from '@tanstack/react-query'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { Box, Center, Divider, HStack, Text, VStack } from 'native-base'
import React from 'react'
import { getCreditUser } from '../../api/user'
import currencyFormat from '../../components/format'

export default function CustomerScreen({navigations}) {

  const {data:users} = useQuery({queryKey:[''],queryFn:()=>getCreditUser()})
  
  return (
    <Box p={2} flex={1} bg='red.499'>
      <ExpoStatusBar />
      <Center>
      <HStack>
        <Box p={4} mb={2} bg='white'>
          Total Customers: 34
        </Box>

        <Box p={4} mb={2} bg='white'>
          Total Amount: TZS 340,099
        </Box>

      </HStack>
      </Center>

      <VStack bg='green.200'>
      <HStack py={2}  justifyContent='space-around'>
        <Box>
          <HStack alignItems='center'>
            <Text>S/N</Text>
            <Text ml={4}>Date</Text>
            </HStack>
          </Box>      
          <Box>Name</Box>      
          <Box>Amount</Box>      
      </HStack>

      
      <Divider />
      </VStack>


        {users?.data?.map((d,idx)=>{
            return <VStack  key={idx} bg='blue.200'>

                <HStack py={2}  justifyContent='space-around'>
                <Box>
                  <HStack alignItems='center'>
                    <Text>{idx+1}</Text>
                    <Text ml={4}>{d.createdAt}</Text>
                    </HStack>
                  </Box>      
                  <Box>{d.customer_name}</Box>      
                  <Box>{currencyFormat(+d.total)}</Box>      
                </HStack>
            </VStack>

        })}
     
     {/* <Box>{""+JSON.stringify(users?.data)}</Box> */}

      
      </Box>
  )
}
