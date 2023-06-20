import { Box, Button, Center, Input, StatusBar, Text, VStack } from 'native-base'
import React, { useState } from 'react'

export default function OtpScreen({navigation}) {
    const [otp,setOtp] = useState("");


    const handleLogin = ()=>{
        navigation.navigate("NewPasswordScreen");
    }
  return (
    <Center flex={1}>
        <StatusBar />
        <VStack>

            <Box>
                <Text py={1}  px={2} fontSize={16}>Enter the Number you have received</Text>
                <Input bg='#FFF'  
                rounded={`full`}
                value={otp}
                _focus={{bgColor:'white'}}
                onChangeText={(text=>setOtp(text))}
                returnKeyType="phone-pad"
                fontSize={16} p='2' px='4' width='300' 
                placeholder='Enter otp' 
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
            </Box> */
            }


            <Box mt={4}>
                    <Button onPress={handleLogin} bg='#05a2dd' rounded={`full`}>Send</Button> 
            </Box>

        </VStack>
    </Center>
  )
}
