import { FC, ReactNode } from "react";

import Chat from "@/components/chat/chat.tsx";

import styles from "./HUD.module.css";

type Props = {
    mainElement: ReactNode;
};
const Hud: FC<Props> = ({ mainElement }) => {
    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                {mainElement}
                <div>
                    <Chat />
                </div>
            </div>
        </div>
    );
};

export default Hud;
