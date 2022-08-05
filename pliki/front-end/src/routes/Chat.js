import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import config from "./config";
import moment from "moment";
export default function Chat(props) {
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState("");
    let socket = io(config[process.env.NODE_ENV].endpoint);

    useEffect(() => {
        // Load the last 10 messages in the window.
        socket.on("init", (msg) => {
            console.log(msg);
            let msgReversed = msg.reverse();
            setMessages(msgReversed);
        });

        // Update the chat if a new message is broadcasted.
        socket.on("push", (msg) => {
            console.log(msg);
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
        <div>
            <div className="scroll-chat">
                {messages.map((message) => {
                    return (
                        <div className="chat-message" key={message._id}>
                            <span className="chat-title">{message.name} {message.classNr}</span><br />
                            <span className="chat-date">{moment(message.createdAt).format('DD/MM/YYYY - hh:mm:ss')}</span>
                            <span className="chat-content">{message.content}</span>
                        </div>
                    )
                })}
            </div>
            <div className="form-content">
                        <span className="web-user">{props.dataUser.user.name} {props.dataUser.user.classNr}</span><br />
                        <form className="form-chat" onSubmit={handleSubmit}>
                            <textarea className="chat-textarea" placeholder="Napisz swoją wiadomość"
                                onChange={(e) => setFormData(e.target.value)}
                                value={formData}>
                            </textarea>
                            <button className="btn chat click-position">wyślij</button>
                        </form>
            </div>

        </div>
    );
}
