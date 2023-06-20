import { Box } from 'native-base'
import React from 'react'
import Dialog from "react-native-dialog";

export default function SuccessDialog({visible,setVisible,navigation,slug,msg}) {

    const handleCancel = () => {
        setVisible(false);
      };
    
      const handleDelete = () => {
        setVisible(false);
        navigation.navigate("ItemsScreen",{slug})
      };

  return (
        <Dialog.Container visible={visible}>
            <Dialog.Title>Save Purchase</Dialog.Title>
            <Dialog.Description>
                {msg}
            </Dialog.Description>
            {/* <Dialog.Button label="Cancel" onPress={handleCancel} /> */}
            <Dialog.Button label="OK" onPress={handleDelete} />
        </Dialog.Container>
  )
}
