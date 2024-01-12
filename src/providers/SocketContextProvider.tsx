import { createContext, FC, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import Socket from "socket.io-client";

type socketContextType = {
    io: ReturnType<typeof Socket>;
    user: User;
    userRef: MutableRefObject<User>;
};

export const SocketContext = createContext<socketContextType | null>(null);

type SocketContextProviderProps = {
    io: ReturnType<typeof Socket>;
    children: ReactNode;
};

const SocketContextProvider: FC<SocketContextProviderProps> = ({ children, io }) => {
    const [user, setUser] = useState<User>({ username: "unknown", socketId: "-1" });
    const userRef = useRef<User>({ username: "unknown", socketId: "-1" });

    useEffect(() => {
        io.on("me", (user) => {
            userRef.current = user;
            setUser(user);
        });
    }, [io]);

    return <SocketContext.Provider value={{ io: io, user: user, userRef }}>{children}</SocketContext.Provider>;
};

export default SocketContextProvider;
