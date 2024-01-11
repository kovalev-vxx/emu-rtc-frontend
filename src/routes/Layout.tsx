import { Outlet } from "react-router";

import Header from "@/components/header/header.tsx";

import styles from "./Layout.module.css";

const Layout = () => {
    return (
        <div className={styles.container}>
            <header>
                <div>
                    <Header />
                </div>
            </header>
            <main>
                <div>
                    <Outlet />
                </div>
            </main>
            <footer>
                <div>Footer</div>
            </footer>
        </div>
    );
};

export default Layout;
