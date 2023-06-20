import { Box, Button, Center, Input, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { Alert } from 'react-native';

export default function NewPasswordScreen({navigation}) {
    const [password,setPassword] = useState();
    const [cpassword,setCPassword] = useState();


    const handleLogin = ()=>{
        if(password !== cpassword){
            return Alert.alert(
                "Password error",
                "Password do not match",
                [  { 
                    text:"Cancel",
                    onPress:()=>console.log("Cancel")
                    },
                    {text:"OK",onPress:()=>console.log("OOK")}
                ],
                {cancelable:false}
            )
        }
    }
  return (
    <Center flex={1}>

        <VStack>


            <Box marginTop='4'>
                <Text px={2}>Enter New Password</Text>
                <Input bg='#FFF'  rounded={`full`}
                fontSize={16} type="password" 
                p={2} 
                px='4'
                _focus={{bgColor:'white'}}
                value={password}
                onChangeText={(text=>setPassword(text))}
                width='300' placeholder='Enter New Password' />
            </Box>

            <Box marginTop='4'>
                <Text px={2}>Confirm New Password</Text>
                <Input bg='#FFF'  rounded={`full`}
                fontSize={16} type="password" 
                p={2} 
                px='4'
                _focus={{bgColor:'white'}}
                value={cpassword}
                onChangeText={(text=>setCPassword(text))}
                width='300' placeholder='Confirm New Password' />
            </Box>


            <Box mt={4}>
                    <Button onPress={handleLogin} bg='#05a2dd' 
                    rounded={`full`}>Reset Password</Button> 
            </Box>

        </VStack>
    </Center>
  )
}
