import { Fontisto } from '@expo/vector-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { Box, Button, Center, Divider, FlatList, HStack, Icon, Input, Modal, Pressable, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { addExpenseItem, addExpenseItemMote, getExpensesItem } from '../../api/user'

export default function ExpenseItemScreen({route,navigation}) {

    let param = route.params



    const [modalVisible,setModalVisible] = useState(false)
    const [amount,setAmount] = useState("") 
    const [description,setDescription] = useState("") 
    const [date,setDate] = useState(new Date()) 
    const  [calender,setCalender] = useState(false);
    const [size, setSize] = React.useState("lg");
    const [sum, setSum] = React.useState(0);


    const queryclient  = useQueryClient();
    const mutation = useMutation({mutationFn:addExpenseItemMote,
    onSuccess:(data)=>{
      
      queryclient.invalidateQueries("items-data")
      setModalVisible(false);
      setDescription("")
      setAmount("")

    } 
  })

    const {data:items} = useQuery({queryKey:['items-data'],queryFn:()=>getExpensesItem(param?.id)})


    const saveItem = ()=>{
      let data = {item:param.id,description,amount,date}
      mutation.mutate(data)
      
    }
    
    useEffect(()=>{
        if(items?.data){
          let total = 0
          items?.data?.items.forEach(d=>{
            total = +total + d.amount;
            
          })
          setSum(total)
        }
    },[items])

const ItemsDescription = ({item})=>{
    return (<>
     <VStack >
         
  
          <Divider />
          
          <HStack bg='gray.50'mt={1} py={3} justifyContent='space-around' px={2}>
            <Box flex={.9}>{item.date}</Box>
            <Box flex={2} px={0.3}>{item.description}</Box>
            <Box _text={{fontWeight:'bold'}} flex={1} px={0.3}> {"TZS "+item.amount}</Box>
          </HStack>
  
          
  
  
        </VStack>
  
    </>)
  }
  
    const renderItem = ({item})=>{
        return (<HStack>
            <Box>
                {item.name}
            </Box>
            </HStack>)
    }


    const handleSizeClick = newSize => {
      setSize(newSize);
      setModalVisible(!modalVisible);
    }

  return (
    <Box p={2} flex={1}>
      <StatusBar />
    <HStack py={2} justifyContent='space-between'>
      <Box _text={{fontSize:20,py:2}}>
        {items?.data?.name + " Tzs " + sum + " "}

      </Box>
      <Button onPress={()=>handleSizeClick("lg")} w={100}>Add item</Button>
    </HStack>


     <HStack bg='white' justifyContent='space-around' p={2}>
          <Box flex={.9}>Date</Box>
          <Box flex={2}>Description</Box>
          <Box flex={1}>Amount</Box>
      </HStack>

     <FlatList
      data={items?.data?.items}
      renderItem={ItemsDescription}
      keyExtractor={item=>item._id}
     />




<Center>
  <Modal isOpen={modalVisible} 
  onClose={()=>handleSizeClick} size={"xl"}>
        <Modal.Content maxH="712">
          <Modal.CloseButton />
          <Modal.Header>Expense Item</Modal.Header>

          <Modal.Body>

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

  
    </Box>
  )
}
