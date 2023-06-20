import { Children, createContext, useState } from "react";


export const SkipContext = createContext();


export const SkipContextProvider = ({children})=>{
    const [isSkip,setIsSkip] = useState(false);
    return <SkipContext.Provider value={{isSkip,setIsSkip}}>
        {children}
    </SkipContext.Provider>
}