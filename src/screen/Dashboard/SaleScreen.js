import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { Box,Pressable, Divider, HStack, Icon, Text, VStack } from 'native-base'
import React from 'react'
// import { Pressable } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { getDailySales, getTotalSales } from '../../api/user'

import currencyFormat from '../../components/format'



const data = [
  {id:1,name:"mwana",icon:<Icon as={<FontAwesome size={14} name='user-o' />} size={8} />},
  {id:2,name:"mwana2",icon:<Icon as={<FontAwesome size={14} name='user-o' />} size={8} />},
  {id:3,name:"mwana3",icon:<Icon as={<FontAwesome size={14} name='user-o' />} size={8} />},
  {id:4,name:"mwana4",icon:<Icon as={<FontAwesome size={14} name='user-o' />} size={8} />},
  {id:5,name:"mwana5",icon:<Icon as={<FontAwesome size={14} name='user-o' />} size={8} />},
]



export default function SaleScreen({navigation}) {

  const user = useSelector(state=>state.user)

  const {data:sales} = useQuery({queryKey:['sales'],queryFn:()=>getTotalSales()})
  // const {data:dailySales} = useQuery({queryKey:['daily'],queryFn:()=>getDailySales()})



  const handleSale = ()=>{
    if(user?.user?.user?.saleMode == "stock"){
      navigation.navigate("ItemsScreen",{slug:"sale"})
      return;
    }else{
      navigation.navigate("RecordWithNoStockScreen")

    }


  }

  const renderItem = ({items})=>{
    return <Pressable  borderWidth={1} justifyContent='center' align='center' w={66} borderColor='gray.400' mx={2} h={66} 
    borderRadius='full'>
    <Box   justifyContent='center' alignItems={`center`}>
      <Icon as={<FontAwesome size={14} name='user-o' />} 
      size={8} color='gray.200' />
      <Text color='gray.400' textAlign='center'>mwana</Text>
      
    </Box>
  </Pressable>
  }
  return (<ScrollView showsVerticalScrollIndicator={false}>
    <StatusBar />
    <Box p={4} bg='#059ed8'>
      <HStack mb={4} rounded={`md`} p={4} h={20} bg="#FFF">
        <HStack justifyContent="space-between" w='full' bg="#FFF">
          <HStack>
            <Box position={`relative`} w={30} h={30} 
            mr={2} 
            borderRadius="full" borderWidth={2} 
            borderColor='#fad019'>

            </Box>
          <Box>
            <Text  color='gray.500' fontSize={16} >Today's Sales</Text>
            <Text fontWeight={'bold'} color='gray.800' fontSize={18} >TZS {sales && currencyFormat(+sales?.todaySale)}</Text>
          </Box>
          </HStack>
          <Icon 
          as={<FontAwesome name='angle-right' />} 
          size={6} 
          color='#ccc' 
          />

        </HStack>
      
      </HStack>
        
        <HStack mb={4} justifyContent='space-between' rounded={`md`} p={4} h={20} bg="#FFF">
        <HStack>
          <Box position={`relative`} w={30} h={30} 
           mr={2} 
           borderRadius="full" borderWidth={2} 
          borderColor='#28b24b'>

          </Box>
          <Box >
            <Text  color='gray.500' fontSize={18} >Uptodate Sales</Text>
            <Text fontWeight={'bold'} color='gray.800' fontSize={18} >{currencyFormat(sales?.data[0].total)}</Text>
          </Box>
          </HStack>

          <Icon 
          as={<FontAwesome name='angle-right' />} 
          size={6} 
          color='#ccc' 
          />

        </HStack>

        <Pressable onPress={handleSale} >
          <HStack rounded={`md`} p={4} h={20} bg="#FFF">
           <HStack>
            <Box w={50} h={50}>
              <Icon as={<AntDesign name="addfile" />} size={8} color='#059ed8' />
            </Box>

            <Box >
              <Text fontWeight={'bold'} fontSize={18}>Record Sales</Text>
              <Text color="gray.500" fontSize={16}>Press here to enter new sales</Text>
            </Box>
          </HStack>
          
          <Icon 
          as={<FontAwesome name='angle-right' />} 
          size={6} 
          color='#ccc' 
          />


        </HStack>
        </Pressable>
                

    </Box>
      <Box p={4} bg='#FFF'>
        <Box>
          <Text fontWeight='bold' fontSize={18}>Statistic</Text>
        </Box>

        <HStack justifyContent={`space-around`} p={4}>
          <Box p={2}>
            <Text fontSize={14} textAlign='center' color={`gray.500`}>Yesterday</Text>
            <Text fontWeight='bold' color='red.400' fontSize={16}> {currencyFormat(+(sales?.ysale)>0?sales?.ysale:0)}</Text>
          </Box>
          <Box p={2}>
            <Text fontSize={14} textAlign='center' color={`gray.500`}>Weekly</Text>
            <Text fontWeight='bold' color='green.600' fontSize={14}>{currencyFormat(+sales?.weekSale)}</Text>
            </Box>
          <Box p={2}>
            <Text fontSize={14} textAlign='center' color={`gray.500`}>Monthly</Text>
          <Text fontWeight='bold' fontSize={16}>Tzs 500,000</Text>
          </Box>

        </HStack>
      </Box>
      <Box bg="#fff" p={4}>
        <Divider />

        <Box py={4}>
          <Text p={2} color='gray.600' 
          fontSize={16}>Business Patners</Text>
        </Box>

        {/* <FlatList 
          data={data}
          renderItem={renderItem}
          keyExtractor={item=>item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          />
         */}
          
          

          
      </Box>


    </ScrollView>
  )
}
