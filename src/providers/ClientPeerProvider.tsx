import { createContext, FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

import { WEBRTC_CONFIG } from "@/globals/constants.ts";
import { useIO } from "@/hooks/useIO.ts";

type ClientPeerProviderProps = {
    children: ReactNode;
};
type ClientPeerContextType = {
    rooms: string[];
    joinRoom: (roomId: string) => void;
    stream: MediaStream | null;
};

export const ClientPeerContext = createContext<ClientPeerContextType | null>(null);

const ClientPeerProvider: FC<ClientPeerProviderProps> = ({ children }) => {
    const peer = useRef<Peer.Instance>(new Peer({ trickle: false, config: WEBRTC_CONFIG }));
    const hostUser = useRef<User | null>(null);
    const [rooms, setRooms] = useState<string[]>([]);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const { io } = useIO();

    useEffect(() => {
        io.on("rooms", (rooms: string[]) => {
            setRooms(rooms);
            console.log("Rooms:", rooms);
        });

        io.emit("rooms", (rooms: string[]) => {
            setRooms(rooms);
            console.log("Rooms:", rooms);
        });

        io.on("offer", ({ offer, user }: { offer: string; user: User }) => {
            console.log("OFFER", offer);
            hostUser.current = user;
            peer.current.signal(offer);
        });

        peer.current.on("stream", (stream) => {
            console.log("Stream");
            setStream(stream);
        });

        peer.current.on("connect", () => {
            console.log("CONNECTED");
        });

        peer.current.on("signal", (data) => {
            console.log(JSON.stringify(data));
            io.emit("answer", { answer: JSON.stringify(data), user: hostUser.current });
        });
    }, [io]);

    const joinRoom = useCallback(
        (roomId: string) => {
            io.emit("join_room", { roomId: roomId });
        },
        [io]
    );

    return <ClientPeerContext.Provider value={{ joinRoom, rooms, stream }}>{children}</ClientPeerContext.Provider>;
};
export default ClientPeerProvider;
