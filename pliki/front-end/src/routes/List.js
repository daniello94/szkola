import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom"
import style from "../style/StudentList.module.scss";
import Button from "../components/Button";

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
                        <span className={style.deleteQuestion}>{student.name} {student.lastName} z {student.classNr} zostanie usunięty/a jesteś pewien ? <br />
                            <div className={style.buttonSection}>
                                <Button onClick={() => deleteUser(student._id)}>Tak</Button>
                                <Button onClick={() => setRemove("")}>NIe</Button>
                            </div>

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
                <td className={style.linkComponent}>
                    <Link className={style.btnLink} to={`/studentData/${student._id}`}>Wiecej Informacji</Link>
                    <Link className={style.btnLink} to={`/addGrades/${student._id}`}>Dodaj Ocene</Link>
                    <Button isAlternative={true} onClick={() => questionDelete(student._id)}>Usuń ucznia</Button>
                </td>
            </tr>


        )
    })

    return (
        <div >
            <table className={style.studentListTable}>
                <thead>
                    <tr>
                        <th colSpan="5">Lista uczniów</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={style.studentTitle}>
                        <td>Imię</td>
                        <td>Nazwisko</td>
                        <td>Klasa</td>
                        <td>Email</td>
                        <td>Akcje</td>
                    </tr>
                    {element}
                </tbody>
            </table>
            <div className={style.linkComponent}>
                <Link className={style.btnLink} to="/studentAdd">Dodaj ucznia</Link>
            </div>
        </div>
    )
}