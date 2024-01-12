import { createContext, FC, MutableRefObject, ReactNode, RefObject, useEffect, useRef, useState } from "react";

import { useIO } from "@/hooks/useIO.ts";

type EmulatorContextProviderProps = {
    children: ReactNode;
};

type emulatorRefType = { getStream: () => MediaStream | null };

type RoomContextType = {
    emulatorRef: RefObject<emulatorRefType> | null;
    roomId: string | null;
    players: User[];
    roomRef: MutableRefObject<string | null>;
};

export const RoomContext = createContext<RoomContextType | null>(null);
const RoomContextProvider: FC<EmulatorContextProviderProps> = ({ children }) => {
    const emulatorRef = useRef<emulatorRefType>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const roomRef = useRef<string | null>(null);
    const [players, setPlayers] = useState<User[]>([]);
    const { io } = useIO();

    useEffect(() => {
        io.on("connection_to_room", (roomId) => {
            roomRef.current = roomId;
            setRoomId(roomId);
        });

        io.on("room_players", (players: User[]) => {
            setPlayers(players);
        });
    }, [io]);

    return (
        <RoomContext.Provider value={{ emulatorRef: emulatorRef, roomRef, roomId, players }}>
            {children}
        </RoomContext.Provider>
    );
};

export default RoomContextProvider;
