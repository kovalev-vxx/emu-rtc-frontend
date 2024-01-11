import { useContext, useImperativeHandle, useRef } from "react";

import { RoomContext } from "@/providers/RoomContextProvider.tsx";

const Emulator = () => {
    const ref = useRef<HTMLIFrameElement | null>(null);
    const { emulatorRef } = useContext(RoomContext);

    useImperativeHandle(emulatorRef, () => ({
        getStream: () => {
            const canvas = ref.current?.contentWindow?.document.getElementsByClassName(
                "ejs_canvas"
            )[0] as HTMLCanvasElement;
            console.log(canvas);
            if (canvas) {
                canvas.getContext("2d");
                return canvas.captureStream(30);
            }
            return null;
        },
    }));

    return (
        <iframe
            ref={ref}
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="100%"
            height="100%"
            sandbox="allow-same-origin allow-scripts"
            src="https://192.168.0.5:5050/emu"
        ></iframe>
    );
};

export default Emulator;
