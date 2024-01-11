import { createContext, FC, ReactNode, useEffect, useState } from "react";
import Socket from "socket.io-client";

type socketContextType = {
    io: ReturnType<typeof Socket>;
    user: User;
    roomId: string | null;
};

export const SocketContext = createContext<socketContextType>({
    io: Socket(),
    user: { username: "unknown", socketId: "-1" },
    roomId: null,
});

type SocketContextProviderProps = {
    io: ReturnType<typeof Socket>;
    children: ReactNode;
};

const SocketContextProvider: FC<SocketContextProviderProps> = ({ children, io }) => {
    const [user, setUser] = useState<User>({ username: "unknown", socketId: "-1" });
    // TODO Сделать ref на комнату и на юзера. Изменить в чате ссылки на стейт, на ссылки на рефы
    const [roomId, setRoomId] = useState<string | null>(null);

    useEffect(() => {
        io.on("me", (user) => {
            setUser(user);
        });

        io.on("connection_to_room", (roomId) => {
            setRoomId(roomId);
        });
    });

    return <SocketContext.Provider value={{ io: io, user: user, roomId }}>{children}</SocketContext.Provider>;
};

export default SocketContextProvider;
