import { MutableRefObject, useContext, useEffect } from "react";

import { ClientPeerContext } from "@/providers/ClientPeerProvider.tsx";

type useClientPeerArgs = {
    videoRef?: MutableRefObject<HTMLVideoElement | null>;
};

export const useClientPeer = (args?: useClientPeerArgs) => {
    const context = useContext(ClientPeerContext);

    if (!context) {
        throw new Error("useClientPeer must be used within a ClientPeerContext");
    }

    useEffect(() => {
        if (args) {
            const { videoRef } = args;
            if (videoRef && videoRef.current) {
                videoRef.current.addEventListener("loadeddata", async () => {
                    await videoRef.current?.play();
                });

                if (context.stream) {
                    const videoElement = videoRef.current;
                    if (videoElement) {
                        videoElement.srcObject = context.stream;
                    }
                }
            }
        }
    }, [args, context.stream]);

    return context;
};
