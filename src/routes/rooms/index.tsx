import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import { useClientPeer } from "@/hooks/useClientPeer.ts";
import { useIO } from "@/hooks/useIO.ts";
import { Routes } from "@/main.tsx";

const Rooms = () => {
    const { rooms, joinRoom } = useClientPeer();
    const { io } = useIO();
    const navigate = useNavigate();

    useEffect(() => {
        io.on("connection_to_room", (roomID) => {
            console.log("Connected to room", roomID);
            navigate(Routes.CLIENT);
        });
    }, [io]);

    return (
        <div>
            <h2>Rooms</h2>
            <ol>
                {rooms.map((e, index) => (
                    <li className="flex items-center gap-2" key={index}>
                        <p>{e}</p>
                        <Button onClick={() => joinRoom(e)}>Connect</Button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Rooms;
