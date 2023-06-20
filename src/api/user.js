import axios from "axios";

export const BASE_URL = `http://10.200.207.25:3000/`;
// export const BASE_URL = `https://wazacom-api.onrender.com/`;


export const signUp=async (data)=>{
    let res = await fetch(`${BASE_URL}user`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
    })
    let body = await res.text();
    return body;
}


export const updateUser = async (data)=>{
    let res = await fetch(`${BASE_URL}user`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${data.token}`,
        },
        body:JSON.stringify(data)
    })
    let body = await res.json();
    return body;
}



export const saveBusiness = async (data)=>{
    let res = await fetch(`${BASE_URL}business`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${data.token}`,
        },
        body:JSON.stringify(data)
    })
    let body = await res.json();
    return body;
}

export const _login = async (data)=>{
    let res = await fetch(`${BASE_URL}user/login`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
    })
    let body = await res.json();
    return body;
}

export const getProduct = async ()=>{
    try{
        const {data} = await axios.get(`${BASE_URL}product`)
        return data;
    }catch(err){
        if(err.response){
            console.log("err",err.response)
        }else{
            console.log("Just error")
        }
    }
    
}



export const getProfit = async ()=>{
    try{

        const {data} = await axios.get(`${BASE_URL}opening-stock`)
        return data;

    }catch(err){
        if(err.response){
            console.log("err",err.response)
        }else{
            console.log("Just error")
        }
    }
    
}


export const getExpensesItem = async (id)=>{
    try{
        const {data} = await axios.get(`${BASE_URL}expense-item/${id}`)
        // console.log("items ",data)
        return data;
    }catch(err){
        if(err.response){
            console.log("err",err.response)
        }else{
            console.log("Just error")
        }
    }
    
}


export const getExpenses = async ()=>{
    try{
        const {data} = await axios.get(`${BASE_URL}expenses`)
        return data;
    }catch(err){
        if(err.response){
            console.log("err",err.response)
        }else{
            console.log("Just error")
        }
    }
    
}


export const addExpenseItem = async (data)=>{
    // alert(JSON.stringify(data))
    // return
    try{
        const res = await fetch(`${BASE_URL}expense-item`,{
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
            method:"POST"
        })
        const body = await res.json();
        return body;
    }catch(err){
        if(err.response){
            console.log("err",err.response)
        }else{
            console.log("Just error")
        }
    }
}



export const addExpenseItemMote = async (data)=>{
    // alert(JSON.stringify(data))
    // return
    try{
        const res = await fetch(`${BASE_URL}expense-item/item`,{
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
            method:"POST"
        })
        const body = await res.json();
        return body;
    }catch(err){
        if(err.response){
            console.log("err",err.response)
        }else{
            console.log("Just error")
        }
    }
}



export const addPurchase = async (data)=>{
    try{

        const res = await fetch(`${BASE_URL}purchase`,{
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
            method:"POST"
        })
        const body = await res.json();
        return body;
    }catch(err){
        if(err.response){
            console.log("err",err.response)
        }else{
            console.log("Just error")
        }
    }
}



export const addProduct = async (data)=>{
    try{
        const res = await fetch(`${BASE_URL}product`,{
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
            method:"POST"
        })

        const body = await res.json();
        return body;

    }catch(err){
        if(err.response){
            console.log("err",err.response)
        }else{
            console.log("Just error")
        }
    }
}


export const getTotalSales = async () =>{
    try{
        const res = await fetch(`${BASE_URL}sales`)
        const body = await res.json();

        return body;
    }catch(err){
            console.log("err",err.response)
    }   
}


export const getTotalExpense = async () =>{
    try{
        const res = await fetch(`${BASE_URL}expenses-total`)
        const body = await res.json();

        return body;
    }catch(err){
            console.log("err",err.response)
    }   
}


export const getCreditUser = async () =>{
    try{
        const res = await fetch(`${BASE_URL}sales-credit-customer`)
        const body = await res.json();
        return body;
    }catch(err){
            console.log("err",err.response)
    }
}





export const getDailySales = async () =>{
    try{
        const res = await fetch(`${BASE_URL}sales/daily`)
        const body = await res.json();

        return body;
    }catch(err){
            console.log("err",err.response)
    }   
}




export const getDailyExpenses = async () =>{
    try{
        const res = await fetch(`${BASE_URL}expenses/daily`)
        const body = await res.json();

        return body;
    }catch(err){
            console.log("err",err.response)
    }   
}


export const recordSales = async (data) =>{
    try{
        const res = await fetch(`${BASE_URL}sales`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${data.token}`
            },
            body:JSON.stringify(data),
            method:"POST"
        })
        const body = await res.json();
        return body;
    }catch(err){
        if(err.response){
            console.log("err",err.response)
        }else{
            console.log("Just error")
        }
    }   
}

export const deleteItem = async (id)=>{
    try{
        const res = await fetch(`${BASE_URL}product/${id}`,{
            headers:{
                "Content-Type":"application/json",
            },
            method:"DELETE"
        })
        const body = await res.json();
        return body;
    }catch(err){
        if(err.response){
            console.log("err",err.response)
        }else{
            console.log("Just error")
        }
    }  
}