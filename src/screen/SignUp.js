import React, { useContext, useState } from 'react'
import {Box,Pressable,Button,Center,Text, Input, VStack, Image} from 'native-base';
import { useDispatch } from 'react-redux';

import { useMutation } from '@tanstack/react-query';
import { signUp } from '../api/user';
import { AuthContext } from './AuthContext';
import { login } from '../features/user/loginSlice';
const logo = require('../assets/logo1.png');



export default function Signup({navigation}) {
  const [show, setShow] = React.useState(false);
    const [fname,setFanme]  = useState('')
    const [phone,setPhone]  = useState('')
    const [password,setPassword]  = useState('')

    const dispatch = useDispatch();

    const {setLogin,setUser} = useContext(AuthContext);

    const mutation = useMutation({
        mutationFn:signUp,
        onSuccess:(data)=>{
            setPhone("")
            setPassword("")
            setFanme("")
            console.log(data);
            setLogin(true);
            setUser(data)
        dispatch(login(data))
        navigation.navigate("Business")

        }
    })



    const handleLogin = ()=>{

        if(!fname || !password || !phone)return;
        const  data = {name:fname,phone,password};
        // alert(JSON.stringify(data))
        // return;
        mutation.mutate(data);

    }
  return (
    <Center flex={1} bg='#FFF'>
        <Image width={100} marginBottom={4} height='100' source={logo} alt='logo'/>

        <Box bg="#FFF" >
            <VStack>
                <Box>
                    <Input bg='#FFF'  
                    returnKeyType="phone-pad"
                    fontSize={16} p='2' width='300' 
                    value={fname}
                    rounded='full'
                    px='4'
                    onChangeText={text=>setFanme(text)}
                    placeholder='Enter full name' mb={4} />
                  

                    <Input bg='#FFF'  
                    onChangeText={text=>setPhone(text)}
                    value={phone}
                    rounded='full'
                    px='4'
                    returnKeyType="phone-pad"
                    fontSize={16} p='2' width='300' placeholder='Enter phone number' />
                  
                </Box>

                <Box marginTop='4'>
                    <Input bg='#FFF'  
                    type='password'
                    fontSize={16}
                    onChangeText={text=>setPassword(text)}
                    value={password}
                    rounded='full'
                    width='300' 
                    px='4'
                    placeholder='Enter password' />
                </Box>


                <Box mt={4}>
                    <Pressable 
                    bg='green.400' p={2} 
                    justifyContent='center'  
                    alignItems='center'
                    rounded='full' 
                    onPress={handleLogin}  >
                        <Text fontSize={16} color='#000' fontWeight='bold'>{mutation.isLoading?'processing':'Sign Up'}</Text>
                        
                        </Pressable> 
                </Box>

            </VStack>
                <Box textAlign='right' mt="8" width='100%'>
            </Box>
        </Box>
        
    </Center>
  )
}
