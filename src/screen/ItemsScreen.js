import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Mutation, useMutation, useQuery } from '@tanstack/react-query';
import { Box, Center, Divider, FlatList, HStack, Icon, Text } from 'native-base'
import React, { useState } from 'react'
import { Pressable, StatusBar, StyleSheet } from 'react-native';
import { useDispatch,useSelector } from 'react-redux'
import SearchItem from '../../SearchItems';
import { getProduct } from '../api/user';
import AlertCheck from '../features/AlertCheck';
import { deleteItem } from '../features/user/items/itemSlice';


const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];


export default function ItemsScreen({route,navigation}) {
    let {slug} = route.params
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );


//   alert(slug)

    const [isOpen,setIsOpen] = useState(false)

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();


    const {data:items} = useQuery({queryKey:['items'],queryFn:()=>getProduct()})


    const delMutation = useMutation({mutationFn:deleteItem,
    onSuccess:(data)=>{
        alert(JSON.stringify(data))
    }})

    const _deleteItem = (id)=>{
        setIsOpen(!isOpen)
        

        delMutation.mutate(id);
    }


    const handleItemClick = (item,id,quantity,price)=>{
        if(slug === "purchase"){
            navigation.navigate("PurchaseItem",{item,id,quantity});
        }

        if(slug === "sale"){
            navigation.navigate("Record",{item,id,quantity,price});
        }
    }
    const renderItems = ({item})=>
        {

        if (searchPhrase === "") {
            return (
                <Pressable onPress={()=>handleItemClick(item.name,item._id,item.quantity,item.price)}>
                <HStack>
    
                    <AlertCheck isOpen={isOpen} 
                    setIsOpen={setIsOpen}/>
                    <Box  w='full' 
                    >
                        <Text 
                        w='full' 
                        textAlign='left'
                        fontSize={16}>{item.name}
                        </Text>
        
                        <HStack justifyContent='space-between' alignItems='center'>
                            <Pressable 
                            _pressed={{bg:'red.300'}}
                            p={4} onPress={()=>_deleteItem(item._id)}>
                                <Icon  as={<FontAwesome name='trash' />} 
                                size={6} 
                                color='red.400'/>
                            </Pressable>
                            
                            <HStack>
                            <Box>
                                <Text color='gray.600' mr={4}>Price per unit</Text>
                                <Text>TZS {item.price}</Text>
                            </Box>
        
                            <Box>
                                <Text color='gray.600' mr={4}>Quantity</Text>
                                <Text>{item.quantity}</Text>
                            </Box>
                            </HStack>
        
        
                        </HStack>
        
                        <Divider my={2}/>
                    </Box>
                    <Icon as={<MaterialIcons name='arrow-right' />} size={6} />
                    </HStack>
                </Pressable>
            )}

          // filter of the name
          if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return (
                <Pressable onPress={()=>handleItemClick(item.name,item._id,item.quantity,item.price)}>
                <HStack>
    
                    <AlertCheck isOpen={isOpen} setIsOpen={setIsOpen}/>
                <Box  w='full'>
                    <Text 
                    w='full' 
                    textAlign='left'
                    fontSize={16} fontWeight='bold'>{item.name}
                    </Text>
    
                    <HStack justifyContent='space-between' alignItems='center'>
                        <Pressable 
                        _pressed={{bg:'red.300'}}
                        p={4} onPress={()=>_deleteItem(item.id)}>
                            <Icon  as={<FontAwesome name='trash' />} 
                            size={6} 
                            color='red.400'/>
                        </Pressable>
                        
                        <HStack>
                        <Box>
                            <Text color='gray.600' mr={4}>Price per unit</Text>
                            <Text>TZS {item.price}</Text>
                        </Box>
    
                        <Box>
                            <Text color='gray.600' mr={4}>Quantity</Text>
                            <Text>{item.quantity}</Text>
                        </Box>
                        </HStack>
    
                        
    
                    </HStack>
    
                    <Divider my={2}/>
                </Box>
                <Icon as={<MaterialIcons name='arrow-right' />} size={6} />
                </HStack>
                </Pressable>
            )}

        
    }

  return (
    <Box flex={1} 
    onStartShouldSetResponder={() => {
        setClicked(false);
      }}
    >

<StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />

    {!clicked && <Text fontSize={24} fontWeight='bold'></Text>}
      <SearchItem
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      
      {(
        <FlatList 
        showsVerticalScrollIndicator={false}
        w='full' p={4} bg='white'
        renderItem={renderItems}
        data={items?.data}
        keyExtractor={item=>item._id}
        />

      )}

       
    </Box>

  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ECF0F1',
    },
    buttonsContainer: {
      padding: 10,
    },
    textStyle: {
      textAlign: 'center',
      marginBottom: 8,
    },
  });