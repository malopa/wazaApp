import { Actionsheet, Box, Button, Center, Checkbox, Divider, FlatList, FormControl, HStack, Input, Modal, Text, VStack } from 'native-base'
import React, { useRef, useState } from 'react'
import { Pressable } from 'react-native';
import { useToast } from 'native-base';


const data = [
    {id:1,name:"duka la dawa chanika"},
    {id:2,name:"Mifugo"},
];
export default function Invites() {

    const [isSheet,setIsSheet] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [modalVisible,setModalVisible] = useState(false)
    const toast = useToast();
    const initialFocusRef = useRef(null);
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const toastIdRef = React.useRef();


    const onClose = ()=>{
        setIsOpen(!isOpen)
    }

    const showAlert = ()=>{
        // toast.show({
        //     title: "Hello world",
        //     placement: "bottom"
        //   })}
    }

    function close() {
        if (toastIdRef.current) {
          toast.close(toastIdRef.current);
        }
      }
    

    const [business,setBusiness]=useState(data);
    
    const renderItem = ({item})=>{
        return <VStack py={3}>
            <HStack px={2} py={2} justifyContent='space-between' alignItems={`center`} >
                <Box>
                  <Text fontSize={16} >{item.name}</Text></Box>
                  <Pressable bg="green.400" rounded='full' onPress={()=>setIsOpen(!isOpen)}>
                      <Text bg="green.400" rounded='full' px="4" py={2}>View</Text>
                  </Pressable>
            </HStack>

            <Divider />
            </VStack>
            
    }
  return (
    <Box flex={1} p={4} bg="#FFF">
        <Center mb={4}>
            {/* <Text fontWeight='bold' fontSize={18}>My Business</Text> */}
        </Center>

        {/* <Divider/> */}
        <FlatList 
        data={business}
        renderItem={renderItem}
        keyExtractor={item=>item.id}
        />


    <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} >
            <HStack justifyContent="space-between" alignItems={`center`}>
                <Text fontSize="16" color="gray.700" 
                    _dark={{
                        color: "gray.300"
                    }}>
                    Business Managers
                </Text>

                <Button onPress={()=>{setModalVisible(!modalVisible);setIsOpen(!isOpen)}} bg="blue.400" px={4} rounded={`full`}>Add</Button>

            </HStack>

            <Box>

            </Box>
          </Box>
          
        </Actionsheet.Content>
      </Actionsheet>



{/* invites detals */}

<Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Invite your manager</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Manager Phone number</FormControl.Label>
              <Input ref={initialRef} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label fontWeight={`bold`}>Pick Roles</FormControl.Label>
              {/* <Input /> */}

              <Checkbox onPress={()=>
                    toast.show({
                        render: () => {
                          return <Box  onPress={close}ref={toastIdRef} zIndex={100} bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                  This is the Personal responsible for recording.
                                </Box>;
                        }
                      })
                
      } value="test" accessibilityLabel="Full Access" mb={4} >
                <Pressable >
                    <Text>Full Access</Text>
                </Pressable>
              </Checkbox>
              <Checkbox value="test" accessibilityLabel="Viewer" >
                <Pressable>
                    <Text>Viewer</Text>
                </Pressable>
              </Checkbox>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
              setModalVisible(false);
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>



    </Box>
  )
}
