import { Outlet } from "react-router";

import Emulator from "@/components/emulator/Emulator.tsx";

const Root = () => {
    return (
        <>
            <h1>Rust Wasm React</h1>
            <Emulator />
            <Outlet />
        </>
    );
};

export default Root;
