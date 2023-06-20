import { AntDesign, FontAwesome, Fontisto } from '@expo/vector-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { AlertDialog, Box, Button, Center, Divider, FlatList, HStack, Icon, Input, Modal, Pressable, ScrollView, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { Alert, View } from 'react-native'
import { getExpensesItem , addExpenseItem, getExpenses} from '../../api/user'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { TextInput } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'



const AddItemDescription = ()=>{

  const [item,setItem] = useState("") 
  const [modalVisible, setModalVisible] = React.useState(false);
  const [size, setSize] = React.useState("lg");
 
  const handleSizeClick = newSize => {
    setSize(newSize);
    setModalVisible(!modalVisible);
  }

  return (<Center>
    <Modal isOpen={modalVisible} 
    onClose={()=>handleSizeClick} size={"xl"}>
          <Modal.Content maxH="212">
            <Modal.CloseButton />
            <Modal.Header>Expense Item</Modal.Header>
            <Modal.Body>
              <Input 
              value={item}
              onChangeText={text=>setItem(text)}
              _focus={{bg:'white',fontSize:16}} fontSize={16}
              placeholder='Enter item name eg transportation' />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setModalVisible(false);
              }}>
                  Cancel
                </Button>
                <Button onPress={saveItem}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        </Center>
  )
}



export default function ExpensesScreen({navigation}) {

  const [visible,setVisible] = useState(false) 
  const [item,setItem] = useState("") 
  const [amount,setAmount] = useState("") 
  const [description,setDescription] = useState("") 
  const [date,setDate] = useState(new Date()) 
  const  [calender,setCalender] = useState(false);

  const queryclient  = useQueryClient();
  const mutation = useMutation({mutationFn:addExpenseItem,
    onSuccess:(data)=>{
      queryclient.invalidateQueries("items")
      setModalVisible(false);
      setItem("")
      setDescription("")
      setAmount("")

    } 
  })
  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [size, setSize] = React.useState("lg");
  
  
  const handleSizeClick = newSize => {
    setSize(newSize);
    setModalVisible(!modalVisible);
  }
  

  const {data:items} = useQuery({queryKey:['expenses'],queryFn:()=>getExpenses()})

  


  const renderItem = ({item})=>{
    return (
    <Pressable my={.6} onPress={()=>navigation.navigate("ExpenseItem",{id:item.items[0]._id})}>
      <HStack rounded='md' py={6} justifyContent='space-between' alignItems='center' bg='white' p={2}>
        <Box >
          <HStack justifyContent={'space-between'}>
            <Text>{item.name} <Text fontWeight={'bold'} color='black'>{item.items[0].total}</Text></Text> 
          </HStack>
        </Box>
        <Icon size={6} color='gray.300' as={<FontAwesome name='plus-circle' />} />
        </HStack>

        </Pressable>
        
        )


}






    const saveItem = ()=>{
      let data = {name:item,description,amount,date}
      // alert(JSON.stringify(data))
    //  return;
      mutation.mutate(data)
      
    }


  return (
    <Box p={2} flex={1}>
      <StatusBar />


      {/* <Box>{"items"+JSON.stringify(items)}</Box> */}
      <VStack>
        <HStack>
          <Box bg='yellow.300' width='full' rounded='md' p={4}>
            <VStack>
              <HStack justifyContent={'space-between'} alignItems="center">
                <Box 
                _text={{fontSize:20,fontWeight:'bold',color:'black'}}>Total Expenses</Box>
                <Box _text={{fontWeight:'bold',fontSize:20}} > {"Tzs"+items?.expenses}</Box>
                </HStack>
              <Box _text={{color:'gray.600'}}>From Jan 1 2023 -  March 19 2023</Box>
            </VStack>
          </Box>
        </HStack>
        <Pressable onPress={()=>handleSizeClick("lg")} my={2}>
          <Box  borderColor='blue.400' borderWidth={1}
          rounded='md'
          py={3}
          bg='white'
          justifyContent='center'
          alignItems='center'
          _text={{textAlign:"center",fontSize:16, fontWeight:'bold'}}
          > 
          <HStack alignItems='center'>
          <Icon as={<FontAwesome name='plus-circle' />} size={6} />
          <Text>Add Expenses Type</Text>
          </HStack>
          
          </Box>
        </Pressable>

      </VStack>

     
      <FlatList 
      data={items?.data}
      renderItem={renderItem}
      keyExtractor={item=>item._id}
      showsVerticalScrollIndicator={false}
      />
  

  <Center>
  <Modal isOpen={modalVisible} 
  onClose={()=>handleSizeClick} size={"xl"}>
        <Modal.Content maxH="712">
          <Modal.CloseButton />
          <Modal.Header>Expense Item</Modal.Header>

          <Modal.Body>
            <Input 
            value={item}
            onChangeText={text=>setItem(text)}
            _focus={{bg:'white',fontSize:16}} fontSize={16}
            placeholder='Enter item name eg transportation' 
          />

        <Input 
            value={description}
            mt={2}
            onChangeText={text=>setDescription(text)}
            _focus={{bg:'white',fontSize:16}} fontSize={16}
            placeholder='Enter Description' 
          />

          <Input 
            mt={2}
            keyboardType='number-pad'
            value={amount}
            onChangeText={text=>setAmount(text)}
            _focus={{bg:'white',fontSize:16}} fontSize={16}
            placeholder='Amount one' 

            />


          <HStack mt={3} 
          justifyContent='space-between' alignItems='center'>
            <Input 
                name="date"
                value={date.toLocaleDateString("yyyy-MM-dd")}
                // onChangeText={text=>setDate(text)}
                _focus={{bg:'white',fontSize:16}} fontSize={16}
                placeholder='Date' 
                width={250}
              />
              {/* <Text>{(date.toLocaleDateString("yy-m-d"))}</Text> */}
              <Pressable  onPress={()=>setCalender(!calender)}>
                <Icon color='yellow.400' as={<Fontisto  name="date"/>} size={8} />
              </Pressable>
              
              <Box>
                {calender ? 
                    <RNDateTimePicker
                      mode="date"
                      display="default"
                      value={new Date()}
                      style={{flex: 1}}
                      onChange={text=>setDate((new Date(text.nativeEvent.timestamp * 1000)))}
                      positiveButton={{label: 'OK',textColor:"#CCCC"}}
                      />:''
                }

              </Box>

             
          </HStack>
            

          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" 
              colorScheme="blueGray" 
              onPress={() => {
                setModalVisible(false);
              }}
            >
                Cancel
              </Button>
              <Button onPress={saveItem}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      </Center>


    {visible &&
      <AddItemDescription />
    }


    </Box>
  )
}
