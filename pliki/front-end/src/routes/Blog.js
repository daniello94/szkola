import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from "moment";
import Container from "../components/Container";
import style from "../style/Blog.module.scss";
import Button from "../components/Button";

const validate = form => {
    if (!form.title) {
        return " musisz podać temat posta"
    } else if (form.title.length > 20) {
        return "tytuł może zawierać max 20 znaków"
    }
    if (!form.content) {
        return "musisz wpisać tekst posta"
    }

};
const validateResponse = form => {
    if (!form.content) {
        return "musisz wpisać tekst"
    }
}

export default function Chat(props) {
    const [status, setStatus] = useState([]);
    const [more, setMore] = useState(false);
    const [error, setError] = useState("");
    const [onePost, setOnePost] = useState({
        createdAt: "",
        name: props.dataUser.user.name,
        classNr: props.dataUser.user.classNr,
        content: "",
        title: "",
        responses: []
    });
    const [form, setForm] = useState({
        createdAt: "",
        name: props.dataUser.user.name,
        classNr: props.dataUser.user.classNr,
        content: "",
        title: "",
        responses: []
    });
    const [response, setResponse] = useState({
        createdAt: "",
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
            }).then(() => {
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
            }).then((res) => {
                setForm({
                    title: "",
                    content: "",
                    name: props.dataUser.user.name,
                    classNr: props.dataUser.user.classNr,
                })
                setError(<span className={style.addPost}>dodałeś/aś wpis</span>)
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
            <Container>
                <div className={style.messageBlog}>
                    <span className={style.messageBlogTitle} key={onePost._id}>
                        {onePost.title}
                    </span><br />
                    <span className={style.authorPost}>
                        To jest post urzytkownika: {onePost.name} {onePost.classNr}
                    </span>
                    <span className={style.datumBlog}>
                        {moment(onePost.createdAt).format('DD/MM/YYYY - hh:mm:ss')}
                    </span>
                    <span className={style.blogContent}>
                        {onePost.content}
                    </span>
                </div>
                {onePost.responses.map((responses) => {
                    return (
                        <div key={responses._id} className={style.messageBlogResponse}>
                            <span key={responses._id} className={style.messageBlogUserResponse}>
                                {responses.name} {responses.classNr} napisał/a:
                            </span> <br />
                            <span className={style.blogContent}>
                                {responses.content}
                            </span>
                            <span className={style.datumBlog}>
                                {moment(responses.createdAt).format('DD/MM/YYYY - hh:mm:ss')}
                            </span>
                        </div>
                    )
                })}

                <form className={style.sendResponseBlog}>
                    <label>
                        Twoja odpowiedź {form.name} to:
                    </label>
                    <textarea value={content} onChange={stateChat} type="text" name='content' placeholder='Tutaj wpisz swoją odpowiedź' />
                    <Button isAlternative={true} onClick={(e) => {
                        e.preventDefault();
                        sendResponse(onePost._id)
                    }}>Wyślij odpowiedź
                    </Button>
                    <Button isAlternative={true} onClick={() => setForm("")}>
                        Wróć do postów
                    </Button>
                </form>
            </Container>
        )
    };
    
    return (
        <Container>

            {status.map(message => {
                return (
                    <div key={message._id} className={style.messageBlog}>
                        <span className={style.messageBlogTitle} key={message._id}>
                            {message.title}
                        </span><br />
                        <span className={style.authorPost}>
                            Post urzytkownika: {message.name} {message.classNr}
                        </span>
                        <span className={style.blogContent}>
                            {message.content}
                        </span>
                        <span className={style.datumBlog}>
                            {moment(message.createdAt).format('DD/MM/YYYY - hh:mm:ss')}
                        </span>
                        <Button isAlternative={true} onClick={() => oneMessages(message._id)}>
                            Zobacz odpowiedzi
                        </Button>
                    </div>
                )
            })}


            <Button onClick={() => setMore(!more)}>
                {more ? "Ukryj pole tekstowe" : "Utwórz nowy temat bloga"}
            </Button>
            {more &&
                <form className={style.fromAddContent}>
                    <label value={name} onChange={stateChat}>
                        <span className={style.textLabel}>
                            {form.name} {form.classNr} <span className={style.error}>
                                {error}
                            </span>
                        </span>
                        <input value={title} onChange={stateChat} type="text" name='title' placeholder='Tutaj wpisz temat' />
                        <textarea value={content} onChange={stateChat} type="text" name='content' placeholder='Tutaj napisz trść posta' />
                    </label>
                    <Button isAlternative={true} type='submit' onClick={addMessages}>
                        Dodaj wpis
                    </Button>
                </form>
            }
        </Container>
    )
};