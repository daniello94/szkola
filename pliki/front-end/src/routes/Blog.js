import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from "moment";
const validate = form => {
    if (!form.content) {
        return "Musisz wpisać tekst"
    }
    if (!form.title) {
        return "Podaj Temat"
    }else if(form.title.length > 20){
        return "Tytuł może zawierać max 20 znaków"
    }
};
const validateResponse = form => {
    if (!form.content) {
        return "Musisz wpisać tekst"
    }
}

export default function Chat(props) {
    const [status, setStatus] = useState([]);
    const [more, setMore] = useState(false);
    const [error, setError] = useState("");
    const [onePost, setOnePost] = useState({
        createdAt:"",
        name: props.dataUser.user.name,
        classNr: props.dataUser.user.classNr,
        content: "",
        title: "",
        responses: []
    });
    const [form, setForm] = useState({
        createdAt:"",
        name: props.dataUser.user.name,
        classNr: props.dataUser.user.classNr,
        content: "",
        title: "",
        responses: []
    });
    const [response, setResponse] = useState({
        createdAt:"",
        name: props.dataUser.user.name,
        classNr: props.dataUser.user.classNr,
        content: "",
    });
    
    function blogResponse(_id) {
        setResponse(_id)
    };

    function listChat() {
        axios.get('http://127.0.0.1:8080/api/chat/all')
            .then((res) => {
                setStatus(res.data)
            })
    };

    function oneMessages(_id) {
        blogResponse()
        axios.get('http://127.0.0.1:8080/api/chat/' + _id)
            .then((res) => {
                setOnePost(res.data)
            })
    };

    function sendResponse(_id) {
        const errora = validateResponse(form)
        if (errora) {
            setForm(errora)
            return
        } else {
            const { name, classNr, content } = form
            axios.put('http://127.0.0.1:8080/api/chat/addResponse/' + _id, {
                name, classNr, content
            })
                .then(() => {
                    setForm({
                        title: "",
                        content: "",
                        name: props.dataUser.user.name,
                        classNr: props.dataUser.user.classNr,
                    })
                    oneMessages(_id)
                })
        }
    };

    const addMessages = (e) => {
        e.preventDefault();
        const errorss = validate(form)
        if (errorss) {
            setError(errorss)
            return
        } else {
            const { name, classNr, content } = form
            axios.post('http://127.0.0.1:8080/api/chat/add', {
                name, classNr, content, title
            })
                .then((res) => {
                    setForm({
                        title: "",
                        content: "",
                        name: props.dataUser.user.name,
                        classNr: props.dataUser.user.classNr,
                    })
                    console.log(res.data);
                    setError(<span className='.error span'>Dodałeś wpis</span>)
                    listChat()
                })
        }
    };

    useEffect(() => {
        listChat()

    }, [])
    let stateChat = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    };

    const { name, title, content } = form
    if (response === status._id) {
        return (
            <div className='container'>
                <div className='style-messages'>
                    <span className='message-name' key={onePost._id}>{onePost.title}</span><br />
                    <span className='author-title'>{onePost.name} {onePost.classNr}</span>
                    <span className='datum-blog'>{moment(onePost.createdAt).format('DD/MM/YYYY - hh:mm:ss')}</span>
                    <hr />
                    <span className='message-content'>{onePost.content}</span>
                </div>
                <div>
                    {onePost.responses.map((responses) => {
                        return (
                            <div className='style-messages'>
                                <span key={responses._id} className='author-title'>{responses.name} {responses.classNr}</span> <br />
                                <span className='message-content'>{responses.content}</span>
                                <span className='datum-blog'>{moment(responses.createdAt).format('DD/MM/YYYY - hh:mm:ss')}</span>
                            </div>
                        )
                    })}
                </div>

                <div>
                    <form>
                        <label> {form.name} {form.classNr}</label>
                        <textarea value={content} onChange={stateChat} className='input-chat' type="text" name='content' placeholder='Napisz swoją odpowiedź'></textarea>
                        <button className='btn' onClick={(e) => {
                            e.preventDefault();
                            sendResponse(onePost._id)
                        }}>Odpowiedz</button>
                        <button className='btn' onClick={() => setForm("")}>wstecz</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div className='container'>
            <div>
                {status.map(message => {
                    return (
                        <div className='style-messages'>
                            <span className='message-name' key={message._id}>{message.title}</span><br />
                            <span className='author-title'>{message.name} {message.classNr}</span>
                            <hr />
                            <span className='message-content'>{message.content}</span>
                            <span className='datum-blog'>{moment(message.createdAt).format('DD/MM/YYYY - hh:mm:ss')}</span>
                            <button className='btn pos' onClick={() => oneMessages(message._id)}>Zobacz odpowiedzi</button>
                        </div>
                    )
                })}
            </div>

            <div className='style-send-messages'>
                <button className="btn-chat" onClick={() => setMore(!more)}>{more ? "Ukryj pole tekstowe" : "Utwórz nowy temat bloga"}</button>

                {more &&
                    <form >
                        <p className='error'>{error}</p>
                        <label value={name} onChange={stateChat}>{form.name} {form.classNr}
                            <input className='input-blog' value={title} onChange={stateChat} type="text" name='title' placeholder='wpisz temat' ></input>
                            <textarea className='input-chat' value={content} onChange={stateChat} type="text" name='content' placeholder='Napisz swoje pytanie'></textarea>
                        </label>
                        <button className="btn-chat" type='submit' onClick={addMessages}>Dodaj wpis</button>
                    </form>
                }
            </div>

        </div>
    )
};