import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { useIO } from "@/hooks/useIO.ts";
import { useRoom } from "@/hooks/useRoom.ts";

import styles from "./chat.module.css";

type Message = {
    type: "send" | "system" | "received";
    message: string;
    user: User;
};
const Chat = () => {
    const { io, userRef } = useIO();
    const { roomRef, roomId, players } = useRoom();

    const messageBlockRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = useCallback(() => {
        const input = inputRef.current;
        if (input && input.value) {
            io.emit("new_message", { roomId: roomRef.current, message: input.value });
            input.value = "";
        }
    }, [io, roomRef]);

    const receiveMessage = useCallback((message: Message) => {
        setMessages((prevState) => [...prevState, message]);
        if (messageBlockRef.current) {
            messageBlockRef.current.scrollTop = messageBlockRef.current.scrollHeight;
        }
    }, []);

    const handleEnterKey = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                sendMessage();
            }
        },
        [sendMessage]
    );

    useEffect(() => {
        io.on("new_player", (user: User) => {
            receiveMessage({ type: "system", message: `${user.username} connected!`, user: user });
        });

        io.on("new_message", ({ message, user: msgUser }: { user: User; message: string }) => {
            receiveMessage({
                type: msgUser.socketId === userRef.current.socketId ? "send" : "received",
                message,
                user: msgUser,
            });
        });
    }, [io, receiveMessage]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>Room: {roomId?.slice(-6)}</div>
                <div className={styles.players}>
                    <FaUser /> {players.length}
                </div>
            </div>
            <div className={styles.messagesBlockWrapper}>
                <div ref={messageBlockRef} className={styles.messagesBlock}>
                    <div>
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
                                {e.type !== "system" && <span className={styles.username}>{e.user.username}</span>}
                                <p>{e.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Input ref={inputRef} onKeyDown={handleEnterKey} placeholder="Your message" />
            </div>
        </div>
    );
};

export default Chat;
