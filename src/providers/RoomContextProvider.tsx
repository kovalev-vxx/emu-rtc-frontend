import { createContext, FC, ReactNode, RefObject, useRef } from "react";

type EmulatorContextProviderProps = {
    children: ReactNode;
};

type emulatorRefType = { getStream: () => MediaStream | null };

type RoomContextType = {
    emulatorRef: RefObject<emulatorRefType> | null;
};

export const RoomContext = createContext<RoomContextType>({ emulatorRef: null });
const RoomContextProvider: FC<EmulatorContextProviderProps> = ({ children }) => {
    const emulatorRef = useRef<emulatorRefType>(null);

    return <RoomContext.Provider value={{ emulatorRef: emulatorRef }}>{children}</RoomContext.Provider>;
};

export default RoomContextProvider;
