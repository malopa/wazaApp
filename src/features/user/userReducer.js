const initialState = {
    user:{},
    isLogin:false,
};
export const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {...state,isLogin:true,user:action.payload}

        case 'SIGNUP':
            alert("Ther is reducer")
            return {...state,isLogin:true,user:action.payload}
    }
}