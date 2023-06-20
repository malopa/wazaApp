import { useMutation } from '@tanstack/react-query';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { Box, Button, Center, Input, Text, VStack } from 'native-base'
import React, { useState } from 'react'

export default function PasswordReset({navigation}) {
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");


    const mutation = useMutation({})


    const handleLogin = ()=>{
        navigation.navigate("OtpScreen")
    }
  return (
    <Center flex={1}>
        <ExpoStatusBar />

        <VStack>

            <Box>
                <Text fontSize={16} py={1} pl={2}>Enter Phone Number</Text>
                <Input bg='#FFF'  
                rounded={`full`}
                value={phone}
                _focus={{bgColor:'white'}}
                onChangeText={(text=>setPhone(text))}
                returnKeyType="phone-pad"
                fontSize={16} p='2' px='4' width='300' 
                placeholder='Enter phone number' 
                keyboardType="number"
                />
            </Box>

            {/* <Box marginTop='4'>
                <Input bg='#FFF'  rounded={`full`}
                fontSize={16} type="password" 
                p={2} 
                px='4'
                _focus={{bgColor:'white'}}
                value={password}
                onChangeText={(text=>setPassword(text))}
                width='300' placeholder='Enter New Password' />
            </Box> */}

            {/* <Box marginTop='4'>
                <Input bg='#FFF'  rounded={`full`}
                fontSize={16} type="password" 
                p={2} 
                px='4'
                _focus={{bgColor:'white'}}
                value={password}
                onChangeText={(text=>setPassword(text))}
                width='300' placeholder='Confirm New Password' />
            </Box> */}


            <Box mt={4}>
                    <Button onPress={handleLogin} bg='#05a2dd' rounded={`full`}>{mutation.isLoading?'Processing':'Send'}</Button> 
            </Box>

        </VStack>
    </Center>
  )
}
