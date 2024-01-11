import { useContext } from "react";

import { SocketContext } from "@/providers/SocketContextProvider.tsx";

export const useIO = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error("useIO must be used within a SocketContextProvider");
    }

    return context;
};
