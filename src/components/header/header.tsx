import { FaGithub } from "react-icons/fa";
import { GrGamepad } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Routes } from "@/main.tsx";

import styles from "./header.module.css";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div>
                <a onClick={() => navigate(Routes.ROOT)} className={navigationMenuTriggerStyle() + " gap-2"}>
                    <h1>EMU-RTC</h1>
                    <GrGamepad />
                </a>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuLink
                            onClick={() => navigate(Routes.GAMES)}
                            className={navigationMenuTriggerStyle()}
                        >
                            Games
                        </NavigationMenuLink>
                        <NavigationMenuLink
                            onClick={() => navigate(Routes.ROOMS)}
                            className={navigationMenuTriggerStyle()}
                        >
                            Rooms
                        </NavigationMenuLink>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div>
                <Button onClick={() => navigate(Routes.INITIATOR)} className="max-h-8">
                    New Game
                </Button>
                <a href="https://github.com/kovalev-vxx" target="_blank">
                    <FaGithub size={18} />
                </a>
            </div>
        </div>
    );
};

export default Header;
