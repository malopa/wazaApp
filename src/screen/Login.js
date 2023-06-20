import React, { useContext, useState } from 'react'
import {Box,Button,Center,Text, Input, VStack, Pressable, Image} from 'native-base';
import { AuthContext } from './AuthContext';
import { useMutation } from '@tanstack/react-query';
import { _login } from '../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/user/loginSlice';
const logo1 = require('../assets/logo1.png');

export default function Login({navigation}) {
  const [show, setShow] = React.useState(false);
  const [password,setPassword] = useState(null)
  const [phone,setPhone] = useState(null)
  const {setLogin,setUser} = useContext(AuthContext);

  const user = useSelector(state=>state.user);

  const dispatch = useDispatch()

  const mutation = useMutation({mutationFn:_login,
  onSuccess:(data)=>{
    // alert(JSON.stringify(data))
    if(data.status){
      setLogin(true)
      setUser(data)
      dispatch(login(data?.data))
      navigation.navigate("Dashboard");
    }else{
      alert("Wrong username")
    }
    
  }})


  const handleLogin = ()=>{
    // navigation.navigate("Dashboard");

    if(!phone || !password)return;

    let data = {phone:phone,password:password};
    mutation.mutate(data);
  }

  // if(user.isLogin){
  //   navigation.navigate("Dashboard")
  // }

  return (
    <Center flex={1} bg='#FFF'>
        <Box p='4' text={{fontSize:18,fontWeight:'700',color:"black"}} >
          <Image width={100} height='100' source={logo1} alt='logo'/>
          </Box>

        <Box bg="#FFF" >
            <VStack>

                <Box>
                    <Input bg='#FFF'  
                    rounded={`full`}
                    value={phone}
                    // name="phone"

                    _focus={{bgColor:'white'}}
                    onChangeText={(text=>setPhone(text))}
                    returnKeyType="phone-pad"
                    fontSize={16} p='2' px='4' width='300' 
                    placeholder='Enter phone number' 
                    keyboardType='number-pad'
                    />
                </Box>
                <Box>
               
                </Box>

                <Box marginTop='4'>
                    <Input bg='#FFF'  rounded={`full`}
                    fontSize={16} type="password" 
                    p={2} 
                    px='4'
                    _focus={{bgColor:'white'}}
                    value={password}
                    onChangeText={(text=>setPassword(text))}
                    width='300' placeholder='Enter password' />
                </Box>

                <Box mt={4}>
                    <Button onPress={handleLogin} bg='#05a2dd' rounded={`full`}>{mutation.isLoading?'Processing':'Log In'}</Button> 
                </Box>

            </VStack>
            <Box textAlign='right' mt="8" width='100%'>
              <Pressable onPress={()=>navigation.navigate("SignUp")}><Text>Forgot account? Sign Up</Text></Pressable>
            </Box>

            <Box textAlign='right' mt="8" width='100%'>
              <Pressable onPress={()=>navigation.navigate("PasswordReset")}><Text>Reset Password</Text></Pressable>
            </Box>
        </Box>
        
    </Center>
  )
}
