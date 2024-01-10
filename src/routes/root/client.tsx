import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";

const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] };

const Client = () => {
    const [offer, setOffer] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const peer = useRef<Peer.Instance>(new Peer({ trickle: false, config: config }));

    useEffect(() => {
        peer.current.on("stream", (stream) => {
            console.log("Stream");
            const videoElement = videoRef.current;
            if (videoElement) {
                videoElement.srcObject = stream;
            }
        });

        videoRef.current?.addEventListener("loadeddata", async () => {
            console.log("Yay! The readyState just increased to  " + "HAVE_CURRENT_DATA or greater for the first time.");
            await videoRef.current?.play();
        });

        peer.current.on("connect", () => {
            console.log("CONNECTED");
        });

        peer.current.on("data", (data) => {
            console.log("MSG:", data);
        });

        peer.current.on("signal", (data) => {
            console.log(JSON.stringify(data));
        });
    }, []);

    const receive = async () => {
        peer.current.signal(offer);
    };

    return (
        <div>
            Client
            <input onChange={(e) => setOffer(e.target.value)} type="text" />
            <button onClick={receive}>Receive</button>
            <video ref={videoRef} style={{ background: "gray" }} width="500" height="500">
                Video
            </video>
        </div>
    );
};

export default Client;
