import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { useIO } from "@/hooks/useIO.ts";

import styles from "./chat.module.css";

type Message = {
    type: "send" | "system" | "received";
    message: string;
    user: User;
};
const Chat = () => {
    const { io, user, roomId } = useIO();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = useCallback(
        (message: string) => {
            io.emit("new_message", { roomId: roomId, message: message });
            const input = inputRef.current;
            if (input) {
                input.value = "";
            }
        },
        [io, roomId]
    );

    const receiveMessage = useCallback((message: Message) => {
        setMessages((prevState) => [...prevState, message]);
    }, []);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    const handleEnterKey = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                sendMessage(inputValue);
            }
        },
        [inputValue, sendMessage]
    );

    useEffect(() => {
        io.on("new_player", (user: User) => {
            receiveMessage({ type: "system", message: `New player connected!`, user: user });
        });

        io.on("new_message", ({ message, user: msgUser }: { user: User; message: string }) => {
            receiveMessage({ type: msgUser.socketId === user.socketId ? "send" : "received", message, user });
        });
    }, [io, receiveMessage, user]);

    return (
        <div className={styles.container}>
            <div>YOU: {user.username}</div>
            <div className={styles.messagesBlockWrapper}>
                <div className={styles.messagesBlock}>
                    {messages.map((e, index) => (
                        <div
                            className={
                                e.type === "send"
                                    ? styles.leftMessage
                                    : e.type === "received"
                                      ? styles.rightMessage
                                      : styles.centerMessage
                            }
                            key={index}
                        >
                            {e.user.username}:<br />
                            {e.message}
                        </div>
                    ))}
                </div>
            </div>
            <Input ref={inputRef} onChange={handleInputChange} onKeyDown={handleEnterKey} placeholder="Your message" />
        </div>
    );
};

export default Chat;
