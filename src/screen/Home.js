import React from 'react'
import { Box,Center,Button } from 'native-base'
export default function Home({navigation}) {
  return (
    <Center flex={1}>
        <Box>
            Home
            <Button onPress={()=>navigation.navigate("Login")}>Log out</Button>
        </Box>
    </Center>
  )
}
