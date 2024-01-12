import { FC, ReactNode } from "react";

import Chat from "@/components/chat/chat.tsx";
import { useRoom } from "@/hooks/useRoom.ts";
import { cn } from "@/lib/utils.ts";

import styles from "./HUD.module.css";

type Props = {
    mainElement: ReactNode;
};
const Hud: FC<Props> = ({ mainElement }) => {
    const { roomId } = useRoom();

    return (
        <div className={styles.container}>
            <div className={cn(styles.subContainer, roomId ? styles.gameAndChat : styles.onlyGame)}>
                <div className={styles.game}>{mainElement}</div>
                {roomId && (
                    <div className={styles.chat}>
                        <Chat />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hud;
