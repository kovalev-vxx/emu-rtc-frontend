import { useContext } from "react";

import { RoomContext } from "@/providers/RoomContextProvider.tsx";

export const useRoom = () => {
    const context = useContext(RoomContext);

    if (!context) {
        throw new Error("useRoom must be used within a RoomContextProvider");
    }

    return context;
};
