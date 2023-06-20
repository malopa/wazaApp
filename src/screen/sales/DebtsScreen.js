import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import { Box, Center, Divider, HStack, Text, VStack } from 'native-base'
import React from 'react'

export default function DebtsScreen({navigations}) {
  return (
    <Box p={2}>
      <ExpoStatusBar />
      <Center>
      <HStack>
        <Box p={4} mb={2} bg='white'>
          Total Creditors: 34
        </Box>

        <Box p={4} mb={2} bg='white'>
          Total Amount: TZS 340,099
        </Box>

      </HStack>
      </Center>
      <VStack bg='white'>
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
      </Box>
  )
}
