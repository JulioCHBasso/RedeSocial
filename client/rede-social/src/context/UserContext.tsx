"use client";

import { createContext, useContext, useState, useEffect } from 'react';

interface ContextProps {
    children: React.ReactNode;
}


interface User {
    user: | {
        id: number;
        email: string;
        username: string;
        user_img: string;
        bg_img: string;
    }
    | undefined;
    setUser: (newState: any) => void;
};

interface UserContextType {
    user: User | undefined;
    setUser: (newState: User | undefined) => void;
}

const intialValue: UserContextType = {
    user: undefined,
    setUser: () => {},
};

export const UserContext = createContext<UserContextType>(intialValue);

export const UserContextProvider = ({ children }: ContextProps) => {
    const [user, setUser] = useState<User | undefined>(intialValue.user);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const UserJSON = localStorage.getItem('rede-social:user');
            if (UserJSON) {
                setUser(JSON.parse(UserJSON));
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
