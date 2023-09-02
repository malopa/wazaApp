import { Box } from 'native-base'
import React from 'react'

// TODO: create fake json data for testing notification
// . differentiate between ready and not ready notificatios
// notifications info..  tiltle,date,notifications.
// Compliance notifcation have decision making process (see/not seen)

export default function ComplianceNotificationScreen() {
  
  return (
    <Box p={4} flex={1} bg={'white'}>
        <Box bg={'powderblue'} p={4} rounded={"md"}>
            Complience
        </Box>
        
    </Box>
  )
}
