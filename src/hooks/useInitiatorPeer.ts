import { useCallback, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { Socket } from "socket.io-client";

import { WEBRTC_CONFIG } from "@/globals/constants.ts";
import { useIO } from "@/hooks/useIO.ts";
import { useRoom } from "@/hooks/useRoom.ts";

const initNewPeer = (user: User, io: Socket, peersMap: Map<string, Peer.Instance>) => {
    const _peer = new Peer({ initiator: true, trickle: false, config: WEBRTC_CONFIG });

    _peer.on("connect", () => {
        console.log("CONNECTED");
    });

    _peer.on("signal", (data) => {
        io.emit("offer", { offer: data, user: user });
        console.log("SIGNAL", JSON.stringify(data));
    });

    peersMap.set(user.socketId, _peer);
};

export const useInitiatorPeer = () => {
    const peersMap = useRef<Map<string, Peer.Instance>>(new Map<string, Peer.Instance>());
    const [stream, setStream] = useState<MediaStream | null>(null);
    const { io } = useIO();
    const { emulatorRef } = useRoom();

    useEffect(() => {
        io.on("new_player", (user: User) => {
            console.log("NEW_PLAYER", user);
            initNewPeer(user, io, peersMap.current);
        });

        io.on("answer", ({ answer, user }: { answer: string; user: User }) => {
            console.log("ANSWER from", user);
            const _peer = peersMap.current.get(user.socketId);
            if (_peer) {
                _peer.signal(answer);
            }
        });
    }, [io]);

    const captureCanvas = useCallback(() => {
        if (emulatorRef?.current) {
            setStream(emulatorRef?.current.getStream());
        }
    }, [emulatorRef]);

    useEffect(() => {
        if (stream) {
            peersMap.current.forEach((peer) => {
                peer.addStream(stream);
            });
        }
    }, [stream]);

    const createRoom = useCallback(() => {
        io.emit("create_room");
    }, [io]);

    return {
        captureCanvas,
        createRoom,
    };
};
