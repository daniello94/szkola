import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import config from "./config";
import moment from "moment";
import Container from "../components/Container";
import style from "../style/Chat.module.scss";

export default function Chat(props) {
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState("");
    let socket = io(config[process.env.NODE_ENV].endpoint);

    useEffect(() => {
        // Load the last 10 messages in the window.
        socket.on("init", (msg) => {
            let msgReversed = msg.reverse();
            setMessages(msgReversed);
        });

        // Update the chat if a new message is broadcasted.
        socket.on("push", (msg) => {
            setMessages(oldState => oldState.concat(msg));
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("message", {
            name: props.dataUser.user.name,
            content: formData,
            classNr: props.dataUser.user.classNr,
        });
        setFormData("")
    };

    return (
        <Container>
            <div className={style.chatScroll}>
                {messages.map((message) => {
                    return (
                        <div className={style.chatMessage} key={message._id}>
                            <span className={style.chatTitle}>
                                {message.name} {message.classNr}
                            </span>
                            <span className={style.chatContent}>
                                {message.content}
                            </span>
                            <span className={style.chatDatum}>
                                {moment(message.createdAt).format('DD/MM/YYYY - hh:mm:ss')}
                            </span>
                        </div>
                    )
                })}
            </div>
            <div className={style.contentSendMessage}>
                <span className={style.webUser}>{props.dataUser.user.name} {props.dataUser.user.classNr}</span><br />
                <form className={style.fromChat} onSubmit={handleSubmit}>
                    <textarea placeholder="Napisz swoją wiadomość"
                        onChange={(e) => setFormData(e.target.value)}
                        value={formData} />
                    <button className={style.buttonSend}>wyślij</button>
                </form>
            </div>
        </Container>
    );
}
