import { useEffect, useState } from "react";

import HUD from "@/components/hud/HUD.tsx";
import { useClientPeer } from "@/hooks/useClientPeer.ts";
import { useIO } from "@/hooks/useIO.ts";

const Client = () => {
    const { io } = useIO();
    const [players, setPlayers] = useState<string[]>([]);
    useEffect(() => {
        io.on("room_players", (players: string[]) => {
            setPlayers(players);
            console.log("Players:", players);
        });

        io.on("connection_to_room", (roomID) => {
            console.log("Connected to room", roomID);
        });
    }, [io]);

    const { rooms, joinRoom, videoRef } = useClientPeer();

    return (
        <div>
            <h1>Client</h1>
            <div>
                <h2>Rooms</h2>
                <ol>
                    {rooms.map((e, index) => (
                        <li style={{ display: "flex" }} key={index}>
                            <p>{e}</p>
                            <button onClick={() => joinRoom(e)}>Connect</button>
                        </li>
                    ))}
                </ol>
                <h2>Players: {players.length}</h2>
            </div>
            <HUD
                mainElement={
                    <video
                        ref={videoRef}
                        style={{ background: "gray", objectFit: "contain", height: "100%" }}
                        width="100%"
                    >
                        Video
                    </video>
                }
            />
        </div>
    );
};

export default Client;
