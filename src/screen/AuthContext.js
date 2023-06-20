import { Children, createContext, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children})=>{
    const [isLogin,setLogin] = useState(false);
    const [user,setUser] = useState(null);
   

    return <AuthContext.Provider value={{isLogin,user,setUser,setLogin}}>
        {children}
    </AuthContext.Provider>
}