import { useRef } from "react";

import HUD from "@/components/hud/HUD.tsx";
import { useClientPeer } from "@/hooks/useClientPeer.ts";

const Client = () => {
    const ref = useRef<HTMLVideoElement | null>(null);
    useClientPeer({ videoRef: ref });

    return (
        <HUD
            mainElement={
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        overflow: "hidden",
                        background: "black",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <video
                        ref={ref}
                        style={{ background: "black", objectFit: "contain", height: "100%", width: "100%" }}
                    >
                        Video
                    </video>
                </div>
            }
        />
    );
};

export default Client;
