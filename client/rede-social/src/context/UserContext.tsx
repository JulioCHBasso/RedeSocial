"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

// Definição das props do contexto
interface ContextProps {
    children: ReactNode;
}

// Definição do usuário
interface User {
    id: number;
    email: string;
    username: string;
    user_img: string;
    bg_img: string;
}

// Definição do valor do contexto
interface UserContextType {
    user: User | undefined;
    setUser: (newState: User | undefined) => void;
}

// Valor inicial do contexto
const initialValue: UserContextType = {
    user: undefined,
    setUser: () => {},
};

// Criação do contexto
export const UserContext = createContext<UserContextType>(initialValue);

// Provedor do contexto
export const UserContextProvider = ({ children }: ContextProps) => {
    const [user, setUser] = useState<User | undefined>(() => {
        if (typeof window !== "undefined") {
            const UserJSON = localStorage.getItem('rede-social:user');
            if (UserJSON) {
                try {
                    return JSON.parse(UserJSON);
                } catch (error) {
                    console.error("Erro ao parsear JSON:", error);
                    return undefined;
                }
            }
        }
        return initialValue.user;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('rede-social:user', JSON.stringify(user));
        } else {
            localStorage.removeItem('rede-social:user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};