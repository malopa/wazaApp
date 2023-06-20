import { useQuery } from '@tanstack/react-query'
import { Box, Divider, HStack, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import { getDailyExpenses, getDailySales, getTotalExpense, getTotalSales } from '../../api/user'

export default function CashBookScreen() {

  const {data:sales} = useQuery({queryKey:['sales'],queryFn:()=>getTotalSales()})
  const {data:dailySales} = useQuery({queryKey:['daily'],queryFn:()=>getDailySales()})
  const {data:dailyExpenses} = useQuery({queryKey:['daily-expenses'],queryFn:()=>getDailyExpenses()})
  const {data:expsense} = useQuery({queryKey:['expenses-total'],queryFn:()=>getTotalExpense()})

  return (
    <Box width='100%' flex={1}>
      <ScrollView >
        <>
        <VStack justifyContent='space-between' >
          <Box w='100%' bg='white' mt={2}>
            <Text py={2} fontWeight='bold' textAlign='center' fontSize={16}>Receipts</Text>
            <Divider />
            <HStack mt={2} justifyContent='space-around' alignItems='center'>
              <Box py={1}>Date</Box>
              <Box py={1}>Details </Box>
              <Box py={1}>Amount</Box>
            </HStack>

            {dailySales?.data?.map(d=>(
              <HStack mt={2}  justifyContent='space-around' alignItems='center'>
              <Box flex={.4} py={1}>{d._id}</Box>
              <Box flex={1} bg="red.200" _text={{textAlign:'left',px:2}} py={1}>Cash sales</Box>
              <Box flex={.5} py={1}>{d.total}</Box>
            </HStack>
            ))}

          </Box>
          <Box w='100%' bg='white' mt={2}>
            <Text fontWeight='bold' py={2} fontSize={16}  textAlign='center'>Payments</Text>
            <Divider />
            <HStack justifyContent='space-around' mt={2}>
              <Box py={1}>Date</Box>
              <Box py={1}>Details</Box>
              <Box py={1}>Amount</Box>
            </HStack>


            {dailyExpenses?.data?.map(d=>(
              <HStack mt={2}  justifyContent='space-around' alignItems='center'>
              <Box flex={.4} py={1}>{d._id}</Box>
              <Box flex={1} bg="red.200" _text={{textAlign:'left',px:2}} py={1}>Daily expenses</Box>
              <Box flex={.5} py={1}>{+d.total.toLocaleString("en-US",{style:"currency", currency:"USD"})}</Box>
            </HStack>
            ))}

          </Box>
        </VStack>
        </>
      </ScrollView>


      <Box zIndex={10} width='100%' px={4}  position='absolute' py={1} bg='white' bottom={0}>
        <VStack>
            <HStack py={0} alignItems='center' justifyContent='space-between'>
              <Box>Total Receipts: </Box>
              <Box> {("TZS "+sales?.data[0].total)} </Box>
            </HStack>
      
            <HStack py={1} alignItems='center' justifyContent='space-between'>
              <Box>Total Payments: </Box>
              <Box > {"TZS "+(expsense?.data[0].total)} </Box>
            </HStack>
      
            <Divider />
            <HStack py={0} alignItems='center' justifyContent='space-between'>
              <Box  _text={{fontWeight:'bold'}}>Cash Balance</Box>
              <Box > {"TZS "+ +(+(sales?.data[0]?.total) - +(expsense?.data[0].total)).toLocaleString("en-US",{style:"currency", currency:"USD"})}</Box>
            </HStack>

        </VStack>
      </Box>
    </Box>
  )
}
