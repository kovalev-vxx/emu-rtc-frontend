import Emulator from "@/components/emulator/Emulator.tsx";
import HUD from "@/components/hud/HUD.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useInitiatorPeer } from "@/hooks/useInitiatorPeer.ts";

const Initiator = () => {
    const { createRoom, captureCanvas } = useInitiatorPeer();

    return (
        <div>
            <Button onClick={createRoom}>Create Room</Button>
            <HUD mainElement={<Emulator />} />
            <Button onClick={captureCanvas}>Capture Canvas</Button>
        </div>
    );
};

export default Initiator;
