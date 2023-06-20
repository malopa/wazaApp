import { Box, Divider, HStack, Icon, Pressable, Text } from 'native-base'
import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/loginSlice';

export default function Settings({navigation}) {
  const user = useSelector(state=>state.user);

  const dispatch = useDispatch()
  const out = ()=>{
    dispatch(logout)
    navigation.navigate("Login")


  }

  return (
    <Box flex={1} p={4} bg="#FFF">
      <Box p={4} alignItems='center' justifyContent={'center'} >
        <Box  w={20} h={20} p={4} justifyContent={'center'} borderRadius={100}  alignItems={'center'} bg={'gray.200'}>
          <Icon as={<FontAwesomeIcon name='user' />} />
        </Box>
      </Box>

      <Box>
        {JSON.stringify(user)}
      </Box>
     
      <Pressable onPress={()=>navigation.navigate("Profile")}>
        <HStack py={6} justifyContent='space-between' alignItems={'center'}>
          <Text fontSize={16} px={2}>Profile</Text>
          <Icon as={<FontAwesomeIcon name="angle-right"/>} size={6} />
        </HStack>
      </Pressable>


        <Divider />

      <Pressable onPress={()=>navigation.navigate("Business")}>
          <HStack py={6}justifyContent="space-between" 
          alignItems={'center'}>
            <Text px={2} fontSize={16}>Add new business</Text>
            <Icon as={<FontAwesomeIcon name="angle-right"/>} size={6}/>
          </HStack>
      </Pressable>

        <Divider />

        <Pressable onPress={()=>navigation.navigate("Invites")}>
          <HStack py={6} alignItems={`center`} justifyContent='space-between' py={3}>
                <Text fontSize={16} px={2}>
                    Busines Managers
                </Text>
              
              <Icon as={<FontAwesomeIcon name="angle-right"/>} size={6}/>
          </HStack>
        </Pressable>


      <Divider />
        

        <Pressable onPress={()=>navigation.navigate("SaleType")}>
          <HStack py={6} alignItems={`center`} justifyContent='space-between' py={3}>
                <Text fontSize={16} px={2}>
                    Sales Option
                </Text>
              
              <Icon as={<FontAwesomeIcon name="angle-right"/>} size={6}/>
          </HStack>
        </Pressable>

      <Divider />
         <Pressable onPress={()=>out()}>

          <HStack py={6}  alignItems={`center`} justifyContent='space-between' py={3}>
            <Text fontSize={16} px={2}>
                  Log Out
              </Text>
              <Icon as={<FontAwesomeIcon name="sign-out"/>} size={6} />
          </HStack>
        </Pressable>


        <Divider />


    </Box>
  )
}
