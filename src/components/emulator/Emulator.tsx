import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] };

const Emulator = () => {
    const ref = useRef<HTMLIFrameElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [answer, setAnswer] = useState<string>("");
    const peer = useRef<Peer.Instance>(new Peer({ initiator: true, trickle: false, config: config }));

    useEffect(() => {
        peer.current.on("connect", () => {
            console.log("CONNECTED");
        });

        peer.current.on("signal", (data) => {
            console.log("SIGNAL", JSON.stringify(data));
        });
    }, []);

    const send = async () => {
        // ref.current?.contentWindow?.postMessage(JSON.stringify({event: '3123', status: true}), "http://localhost:55202");
        console.log(ref.current?.contentWindow?.document.getElementsByClassName("ejs_canvas"));

        const canvas = ref.current?.contentWindow?.document.getElementsByClassName(
            "ejs_canvas"
        )[0] as HTMLCanvasElement;
        if (canvas) {
            const context = canvas.getContext("2d");
            console.log(context);
            const stream = canvas.captureStream(30);

            peer.current.addStream(stream);
        }
    };

    const setRemoteDesc = async () => {
        peer.current.signal(answer);
    };

    const sendMsd = () => {
        peer.current.send("Hello");
    };

    return (
        <>
            <h1>Emulator</h1>
            <iframe
                ref={ref}
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="500"
                height="500"
                sandbox="allow-same-origin allow-scripts"
                src="https://localhost:5050/emu"
            ></iframe>
            <div>
                <button onClick={send}>Capture</button>
            </div>
            <input type="text" onChange={(e) => setAnswer(e.target.value)} />
            <button onClick={setRemoteDesc}>setRemoteDesc</button>
            <button onClick={sendMsd}>SEND MESSAGE</button>
            <video ref={videoRef} style={{ background: "gray" }} width="500" height="500">
                Video
            </video>
        </>
    );
};

export default Emulator;

// const videoTracks = stream.getVideoTracks();
// if (videoRef.current) {
//     videoRef.current.srcObject = new MediaStream(videoTracks);
//     videoRef.current.play();
// }
