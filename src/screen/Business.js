import React, { useContext, useEffect, useRef, useState } from 'react'
import {Box, Button,AlertDialog, Center, Checkbox, CheckIcon, HStack, Input, Pressable, Radio, Select, Switch, Text, VStack, Icon} from 'native-base';
import axios from 'axios';
import CountryPicker from 'react-native-country-picker-modal'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { format } from 'date-fns'


import { SkipContext } from './context/SkipContext';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { FontAwesome, FontAwesome5, Fontisto } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation } from '@tanstack/react-query';
import { saveBusiness } from '../api/user';


export default function Business({navigation}) {
    const [isBrela,setIsBrela] = useState(false);
    const [isLicense,setIsLicense] = useState(false);
    const [isOwner,setIsOwner] = useState("Yes");
    const [businessType,setBusinesType] = useState('');
    const [countryName,setCountryName] = useState(null)
    const [region,setRegion] = useState(null)
    const [businessName,setBusinesName]  = useState('');
    const [brellaDate,setBrellaDate] = useState('')
    const [businessNature,setBusinesNature] = useState(null);
    const [licenceDate,setLicenceDate] = useState(new Date())
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showLicence, setShowLicenceDate] = useState(false);
    const [ownerPhone,setOwnerPhone] = useState("");


    const user = useSelector(state=>state.user);

    const {isSkip,setIsSkip} = useContext(SkipContext);
    const cancelRef = useRef(null);
// 
    const [countryCode, setCountryCode] = useState('TZ')
    const [businessMode,setBusinesMode] = useState(null);

    const [country, setCountry] = useState(null)
    const [withCountryNameButton, setWithCountryNameButton] = useState(
      false,
    );
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [withFlag, setWithFlag] = useState(true)
  const [withEmoji, setWithEmoji] = useState(true)
  const [withFilter, setWithFilter] = useState(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState(false)
  const [withCallingCode, setWithCallingCode] = useState(false)
  const [businessRegion,setBusinesRegion] = useState()


  const mutation = useMutation({mutationFn:saveBusiness,
    onSuccess:(data)=>{
        if(data.status){
            navigation.navigate("SaleType")
        }
    }
    })
    const onSelect = (country) => {
      setCountryCode(country.cca2)
      setCountry(country)
      setCountryName(country.name)
    }

    const onClose = ()=>{
        setIsSkip(!isSkip)
    }


    useEffect(()=>{
        if(date){
           setBrellaDate(date)
        }
    },[date])



  const onChange = (event, selectedDate) => {
    setShow(!show)
    const currentDate = selectedDate;
    setDate(currentDate);
    setBrellaDate(currentDate)
  };


  const onChangeLicenceDate = (event, selectedDate) => {
    setShowLicenceDate(!showLicence)
    const currentDate = selectedDate;
    setDate(currentDate);
    setLicenceDate(currentDate)
  };


  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  

const handleProceed = ()=>{
    setIsSkip(!isSkip)

    navigation.navigate("Dashboard");
}



const saveBusines = ()=>{
    let data = {isBrela,isLicense,isOwner,businessType,countryName,businessName,
        brellaDate,businessNature,licenceDate,ownerPhone,businessRegion}

    mutation.mutate(data)
}

   
      
  return (
    <ScrollView showsVerticalScrollIndicator={false} bg='blue.500'>
    <Box flex={1} bg='blue.500' p={4}>
        
       
        <VStack>
            <Text fontWeight='bold' fontSize={16}>Business Name</Text>
            <Input fontSize={14} my={3} bg="#FFF" 
            rounded='full' 
            value={businessName} 
            _focus='#FFF'
            onChangeText={text=>setBusinesName(text)}
            placeholder="Business Name" />

        </VStack>

        

        <VStack>
            <Text fontWeight='bold' fontSize={16}>Business Type</Text>
      <Select selectedValue={businessType}
        rounded='full'
        my={4}
        bg="#FFF"
        color={`gray.800`}
        fontSize={14}
        minWidth="200" accessibilityLabel="Choose Busines Type" placeholder="Business Type" _selectedItem={{
        bg: "green.400",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setBusinesType(itemValue)}>
          <Select.Item label="Service Busines" value="service" />
          <Select.Item label="Produce and Trading" value="web" />
          <Select.Item label="Trading business only" value="trading" />
          <Select.Item label="Personal Finance" value="pf" />
        </Select>
        </VStack>


        <VStack>
            <Text fontWeight='bold' fontSize={16}>Nature of Business</Text>
        <Select selectedValue={businessNature}
        rounded='full'
        my={4}
        bg="#FFF"
        color={`gray.800`}
        fontSize={14}
        minWidth="200" accessibilityLabel="Choose Nature of Busines" 
        placeholder="Nature of Business" 
        _selectedItem={{
        bg: "green.400",
        endIcon: <CheckIcon size="5" />

      }} mt={1} onValueChange={itemValue => setBusinesNature(itemValue)}>
          <Select.Item label="Technology" value="technology" />
          <Select.Item label="Agriculture" value="angriculture" />
          <Select.Item label="Trade" value="finance" />
          <Select.Item label="Small Business" value="small business" />
          <Select.Item label="Marketing" value="marketing" />
          <Select.Item label="Production" value="production" />
          <Select.Item label="Manufacturing" value="manufacturing" />
        </Select>

        </VStack>


        <VStack>
            <Text fontWeight='bold' fontSize={16}>Country</Text>
        <HStack position='relative' bg='white py-2 rounded-full' my={2}  alignItems='center'>

       
            
            <Input bg='white' rounded='full' 
            placeholder='Pick Country from right'
            size={14}
            isReadOnly
            value={countryName}
            w={280} _focus={{bg:'white'}} />

    <HStack alignItems='center' 
        py={2}
        justifyContent='center' 
        bg='white' mx={2}
        rounded='md'
        >
            <CountryPicker
                {...{
                countryCode,
                withFilter,
                withFlag,
                withCountryNameButton,
                withAlphaFilter,
                withCallingCode,
                withEmoji,
                onSelect,
        
                }}
            />

            <Icon as={<FontAwesome name='angle-down' />} />
        </HStack>

        </HStack>
        </VStack>
        
        <VStack>
        <Text fontWeight='bold' fontSize={16}>Business Location</Text>
        
        <Select selectedValue={businessRegion}
        rounded='full'
        my={4}
        bg="#FFF"
        color={`gray.800`}
        fontSize={14}
        minWidth="200" accessibilityLabel="Business Location" 
        placeholder="Business Location" 
        _selectedItem={{
        bg: "green.400",
        endIcon: <CheckIcon size="5" />

      }} mt={1} onValueChange={itemValue => setBusinesRegion(itemValue)}>
          <Select.Item label="Dar es salaam" value="technology" />
          <Select.Item label="Mbeya" value="angriculture" />
          <Select.Item label="Arusha" value="finance" />
          <Select.Item label="Mwanza" value="small business" />
          <Select.Item label="Kilimanjaro" value="marketing" />
          <Select.Item label="Dodoma" value="production" />
          <Select.Item label="Singida" value="manufacturing" />
        </Select>

        </VStack>

      

        <Box mt={4} space={10}>
            <VStack borderWidth={1} 
            zIndex={4} my={2} 
            alignItems='flex-start'
            rounded={`full`}
            bg="white"
            px={4}
            color='black'
            borderColor='gray.200' p={2}>
            <Checkbox checked={isBrela}  
                onChange={()=>setIsBrela(!isBrela)} 
                colorScheme="success"
                accessibilityLabel=""
                color='gray.700'
            >
                <Text color="gray.800">Is your business Registered?</Text> 
            </Checkbox>
            
            </VStack>
            <Box bg="yellow.50" mt={-6} pb={4} mb={2} pt={4} px={2} rounded="md"  >
                    <Text color={`gray.700`} fontWeight='bold' space={4} textAlign='left'>
                        We help remind the due dates to file annual return or pay maintainance fee for better compliance
                    </Text>
                </Box>
            {isBrela && 
            
            <Box>
                <HStack alignItems='center'>
                    <Input fontSize={14}  width={300} mt={1}  zIndex={4} bg={"#fff"} rounded='full'  
                    _focus={{bg:'white'}}
                    value={format(brellaDate, 'yyyy-MM-dd')}
                    onChangeText={text=>setBrellaDate(text)}
                    placeholder="Business Registration Date " />

                    <Pressable onPress={()=>setShow(!show)} p={3} bg='#FFF' ml={2} rounded='md'>
                        <Icon as={<Fontisto  name="date"/>} colro='green.500' size={6} />
                    </Pressable>
                </HStack>
                    {(show) && <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                    />}

        <Box>

        </Box>

                <Radio.Group bg='white' _text={{fontWeight:'bold'}} p={3} 
                    px={6} mt={4} rounded='full' 
                    defaultValue={businessMode}
                    name="myRadioGroup" accessibilityLabel="Type of business" 
                    onChange={(item)=>setBusinesMode(item)}
                    >
                        <Radio value={'individual'} >
                            <Text p={2} fontSize={16}>Sole (Individual) Business?</Text>
                        </Radio>

                        <Radio value={`company`} >
                            <Text fontSize={16} p={2} font='bold'>Limited Company?</Text>
                        </Radio>
                       
                </Radio.Group>   
               
            </Box>
            }
            
            
        </Box>
        

        <Box mt={4}>
        <VStack borderWidth={1} zIndex={4} my={2} 
            alignItems='flex-start'
            rounded={`full`}
            px={4}
            bg="white"
            color='black'
            borderColor='gray.200' p={2}>
            <Checkbox checked={isLicense}  
                onChange={()=>setIsLicense(!isLicense)} 
                colorScheme="success"
                accessibilityLabel=""
                color='gray.700'
                bg={`white`}
            >
                <Text color="gray.800">Do you have Business License?</Text> 
            </Checkbox>
             
            </VStack>
            <Box bg="gray.50" mt={-6}  pt={4} pb={4} zIndex={-1}  mb={2} px={2} rounded="md"  >
                <Text color={`gray.500`} space={4} textAlign='center'>
                    we remind you before the due date
                </Text>
            </Box> 



        {isLicense && <Box>
            <HStack alignItems='center'>
            <Input fontSize={14}  bg="#fff" 
                _focus={{bg:'white'}}
                value={format(licenceDate,'yyyy-mm-dd')}
                width={300}
                onChange={text=>setLicenceDate}
                zIndex={4} rounded='full'  
                placeholder="License Issuance Date" />

                    <Pressable onPress={()=>setShowLicenceDate(!showLicence)} 
                    p={3} bg='#FFF' ml={2} rounded='md'>
                        <Icon as={<Fontisto  name="date"/>} 
                        colro='green.500' size={6} />
                    </Pressable>
                
            </HStack>


                {showLicence && <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChangeLicenceDate}
                />
                }
             
            </Box>}
        
        </Box>


        <Box mt={4} bg="#fff" px={2} rounded='md'>
            <VStack borderWidth={1} my={2} 
                rounded={`md`}
                px={4}
                color='black'
                borderColor='gray.100' p={2}>
                
                <Text fontWeight='bold' fontSize={16} color="black">Are you the owner of this business ?</Text> 
                <Radio.Group defaultValue={isOwner}
                name="myRadioGroup" accessibilityLabel="Are you business owner?" 
                onChange={(item)=>setIsOwner(item)}
                >
                     <Radio value={'Yes'} >
                            <Text p={3} >Yes, I'm the owner </Text>
                        </Radio>

                        <Radio value={`No`} >
                            <Text p={3}>No, I'm managing</Text>
                        </Radio>
                       
                </Radio.Group>
            </VStack>
        </Box>

        {isOwner === "No" && 
            <Box my={3} >
                <Text fontWeight='bold' fontSize={16} py={2}>Owner phone number</Text>
                <Input fontSize={16}  bg='#FFF' _focus={{bg:'#FFF'}} 
                rounded='full' 
                    keyboardType='number-pad'
                    value={ownerPhone}
                    onChangeText={text=>setOwnerPhone(text)}

                placeholder="Enter owner phone number" />
            </Box>
        }




        <Button bg={`green.400`} 
        onPress={saveBusines}
        isDisabled={mutation.isLoading}
        rounded="full" mt={4}>Register</Button>
    </Box>


    <React.Fragment>
                <Center>
                    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isSkip} onClose={onClose}>
                        <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>
                            <Text fontWeight={800}>
                        Skip Business Registration
                        </Text></AlertDialog.Header>
                        <AlertDialog.Body>
                            You will not be able to customize trade or chating with business members if you proceed.
                            Are you sure?
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={handleProceed}>
                                Contine Skip
                            </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
                </Center>

                </React.Fragment>
                
    </ScrollView>



  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 20,
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
  });
  