import { createContext, useState } from "react";

export const StateAuth = createContext();


export const StateAuthProvider = ({children})=>{
    const [isOpen,setIsOpen] = useState(false);
    return <StateAuth.Provider value={{isOpen,setIsOpen}}>
        {children}
    </StateAuth.Provider>
}