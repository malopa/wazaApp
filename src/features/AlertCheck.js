import { AlertDialog, Button, Center, Text } from 'native-base';
import React from 'react'
import { Color } from '../components/Color';

export default function AlertCheck(props) {

    const onClose = () => props.setIsOpen(false);
    const cancelRef = React.useRef('');


  return (
    <Center  bg='white'>
        
        <AlertDialog avoidKeyboard leastDestructiveRef={cancelRef} isOpen={props.isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Add new Item</AlertDialog.Header>
            <AlertDialog.Body>
                <Text>Are you sure you want to delete this items?</Text>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  Cancel
                </Button>
                <Button bg={`${Color.primary}`} 
                    onPress={onClose}>
                  Delete
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
  )
}
