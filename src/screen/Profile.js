import { Avatar, Box, Center, Divider, HStack, Text } from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'

export default function Profile() {
  return (
    <Box bg="#FFF" flex={1} >
        <Center>
            <Box w={'full'} p={4} bg='gray.300'>
                <Avatar bg="purple.600" alignSelf="center" size="2xl" source={{
                    uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                }}>
                    RB
                </Avatar>
            </Box>
        
        </Center>


        <Box p={4} >
                <HStack py={3} justifyContent='space-between' alignItems={'center'}>
                    <Text px={4}>
                        Your full name
                    </Text>
                </HStack>
                <Divider />
                <HStack py={3} justifyContent='space-between' alignItems={'center'}>
                    <Text px={4}>
                        Phone number
                    </Text>
                </HStack>
                <Divider />

                <HStack py={3} justifyContent='space-between' alignItems={'center'}>
                    <Text px={4}>
                        Total Business
                    </Text>
                </HStack>


                <Divider />
                <Pressable>
                <HStack py={3} justifyContent='space-between' alignItems={'center'}>
                    <Text px={4}>
                        Your Team
                    </Text>
                </HStack>
                </Pressable>
                <Divider />




            </Box>
        
    </Box>
  )
}
