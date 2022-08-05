import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

}
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
                setError(<span>Wystawiłeś ocene</span>)
            })
            setStatus({
                nameSubject: "",
                rating: "",
                titleTask: "",
                textarea: "",
                genus: ""
            })
        }

    }

    let stateStudent = (e) => {
        setStatus({
            ...status,
            [e.target.name]: e.target.value
        })

    }
    const { nameSubject, rating, titleTask, textarea, genus
    } = status
    return (
        <div className="container">
            <div className="form">
                <span className="error">{error}</span>
                <from >
                    <label className="label-grades">Przedmiot:
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

                    <label className="label-grades">Typ:
                        <select value={genus} name="genus" onChange={stateStudent}>
                            <option>Wybierz</option>
                            <option>Odpowiedź</option>
                            <option>Zadanie domowe</option>
                            <option>Sprawdzian</option>
                            <option>Kartkówka</option>
                        </select>
                    </label>

                    <label className="label-grades">Tytuł działu
                        <input value={titleTask} name="titleTask" type="text" onChange={stateStudent}></input>
                    </label>

                    <label className="label-grades" >Ocena:
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
                    <textarea className="textarea-grades" value={textarea} name="textarea" type="text" onChange={stateStudent} placeholder="Opis oceny"></textarea><br />
                    <button className="btn" type="submit" onClick={(e) => {
                        e.preventDefault()
                        gradesAdd(status._id)
                    }}>Wystaw ocenę</button>

                </from>
            </div>
        </div>
    )
}
