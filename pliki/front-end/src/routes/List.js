import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom"


export default function List(props) {
    const [remove, setRemove] = useState("")

    function questionDelete(_id) {
        setRemove(_id)
    };

    function deleteUser(_id) {
        axios.delete('http://127.0.0.1:8080/api/user/delete/' + _id)
            .then(() => {
                props.dataStudent()
            })
    };

    let dataStudent = props.dataStudents;
    let element = dataStudent.map((student) => {
        if (remove === student._id) {
            return (
                    <tr key={student._id}>
                        <td className="box">{student.name}</td>
                        <td className="box">{student.lastName}</td>
                        <td className="box">{student.classNr}</td>
                        <td className="box">{student.email}</td>
                        <td className="box">
                            <span>Jesteś pewien? <br/>
                            <button onClick={() => deleteUser(student._id)} className="btn-4">Tak</button>
                            <button onClick={() => setRemove("")} className="btn-4">NIe</button>
                        </span>
                        </td>
                    </tr>
            )
        }
        return (
                <tr key={student._id}>
                    <td className="box">{student.name}</td>
                    <td className="box">{student.lastName}</td>
                    <td className="box">{student.classNr}</td>
                    <td className="box">{student.email}</td>
                    <td className="box">
                        <Link className="btn" to={`/studentData/${student._id}`}>Wiecej Informacji</Link>
                        <Link className="btn" to={`/addGrades/${student._id}`}>Dodaj Ocene</Link>
                        <button onClick={() => questionDelete(student._id)} className="btn">Usuń ucznia</button>
                    </td>
                </tr>
            

        )
    })

    return (
        <div className="container">
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="5">Lista uczniów</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="title-box">
                            <td>Imię</td>
                            <td>Nazwisko</td>
                            <td>Klasa</td>
                            <td>Email</td>
                            <td>Akcje</td>
                        </tr>
                        {element}
                    </tbody>
                </table>
                <Link className="btn" to="/studentAdd">Dodaj ucznia</Link>
            </div>
        </div>

    )
}