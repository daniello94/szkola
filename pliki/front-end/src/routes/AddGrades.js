import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import style from "../style/AddGrades.module.scss";
import Button from "../components/Button";
import Container from "../components/Container";

const validate = form => {
    if (!form.nameSubject) {
        return "Podaj przedmoit "
    };

    if (!form.genus) {
        return "Wybierz Typ "
    };

    if (!form.titleTask) {
        return "Podaj Tytuł Działu "
    };

    if (!form.rating) {
        return "Podaj ocenę "
    };

    if (!form.textarea) {
        return "Podaj uasadnienie oceny"
    };

};

export default function AddGrades() {
    let { id } = useParams()
    const [error, setError] = useState("")
    const [status, setStatus] = useState({
        nameSubject: "",
        rating: "",
        titleTask: "",
        textarea: "",
        genus: ""
    });

    function gradesAdd(_id) {
        const errors = validate(status)
        if (errors) {
            setError(errors)

        } else {
            axios.put('http://127.0.0.1:8080/api/user/addGrade/' + id, {
                nameSubject,
                grades: {
                    rating, titleTask, textarea, genus
                }


            }).then(() => {
                setError(<span className={style.errorAddCorrect}>Wystawiłeś ocene</span>)
            })
            setStatus({
                nameSubject: "",
                rating: "",
                titleTask: "",
                textarea: "",
                genus: ""
            })
        }

    };

    let stateStudent = (e) => {
        setStatus({
            ...status,
            [e.target.name]: e.target.value
        })

    };

    const { nameSubject, rating, titleTask, textarea, genus
    } = status
    return (
        <Container>
            <span className={style.error}>{error}</span>
            <from className={style.addGradesFrom}>
                <label>Przedmiot:
                    <select value={nameSubject} name="nameSubject" onChange={stateStudent}>
                        <option>Wybierz</option>
                        <option>Matematyka</option>
                        <option>Biologia</option>
                        <option>Informatyka</option>
                        <option>Jezyk polski</option>
                        <option>Fizyka</option>
                        <option>Technika</option>
                    </select>
                </label>

                <label>Typ:
                    <select value={genus} name="genus" onChange={stateStudent}>
                        <option>Wybierz</option>
                        <option>Odpowiedź</option>
                        <option>Zadanie domowe</option>
                        <option>Sprawdzian</option>
                        <option>Kartkówka</option>
                    </select>
                </label>

                <label>Tytuł działu
                    <input value={titleTask} name="titleTask" type="text" onChange={stateStudent}/>
                </label>

                <label  >Ocena:
                    <select value={rating} name="rating" onChange={stateStudent}>
                        <option>Wybierz</option>
                        <option>1</option>
                        <option>1.5</option>
                        <option>2</option>
                        <option>2.5</option>
                        <option>3</option>
                        <option>3.5</option>
                        <option>4</option>
                        <option>4.5</option>
                        <option>5</option>
                        <option>5.5</option>
                        <option>6</option>
                    </select>
                </label>
                <textarea value={textarea} name="textarea" type="text" onChange={stateStudent} placeholder="Opis oceny"/>
                <Button isAlternative={true} type="submit" onClick={(e) => {
                    e.preventDefault()
                    gradesAdd(status._id)
                }}>Wystaw ocenę
                </Button>
            </from>
        </Container>
    )
};
