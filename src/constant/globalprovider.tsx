/*import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { isLoggedIn, LogOut } from '.';

interface GlobalContext {

} 

export const globalContext = createContext<GlobalContext | null>(null);

interface Prop {
    children: ReactNode;
}

const globalprovider : React.FC<Prop> = ({ children }) => {
    const [LoggedIn, setLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        try {
            isLoggedIn()
            .then((res : any) => {
                setLoggedIn(res);
            })
        } catch (error) {
            console.log("Glob error: ", error);
        }

    }, [LoggedIn])

    const logout = async () => {
      await LogOut();
    }




  return (
    <globalContext.Provider value={{LoggedIn, setLoggedIn, logout}}>
        {children}
    </globalContext.Provider>
  )
}

export default globalprovider
*/