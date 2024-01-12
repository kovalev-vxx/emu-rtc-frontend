import Emulator from "@/components/emulator/Emulator.tsx";
import HUD from "@/components/hud/HUD.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useInitiatorPeer } from "@/hooks/useInitiatorPeer.ts";
import { useRoom } from "@/hooks/useRoom.ts";

const Initiator = () => {
    const { roomId } = useRoom();
    const { createRoom, captureCanvas } = useInitiatorPeer();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                {!roomId && <Button onClick={createRoom}>Create Room</Button>}
                <Button onClick={captureCanvas}>Stream Canvas</Button>
            </div>
            <HUD mainElement={<Emulator />} />
        </div>
    );
};

export default Initiator;
