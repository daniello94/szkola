import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import style from '../style/MyGrades.module.scss';
import Container from "../components/Container";
import Button from "../components/Button";

export default function MyGrades(_id) {
    let { id } = useParams()
    const [more, setMore] = useState(false)
    const [status, setStatus] = useState({
        name: "",
        lastName: "",
        results: [],
    });

    function oneUser(id) {
        axios.get('http://127.0.0.1:8080/api/user/' + id)
            .then((res) => {
                setStatus(res.data)
            })
    };

    useEffect(() => {
        oneUser(id)
    }, [])

    return (
        <Container>
            <table className={style.tableName}>
                <thead>
                    <tr>
                        <th colSpan="4">Oceny: {status.name} {status.lastName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={style.box} colSpan="4">
                        <table className={style.tableGrades} colSpan="3">
                            {status.results.map((result) => {
                                let gradeSum = 0
                                result.grades.forEach(grade => {
                                    gradeSum += parseFloat(grade.rating)

                                });
                                return (
                                    <>
                                        <tr>
                                            <th className={style.titleSubject} colSpan="3">
                                                {result?.nameSubject}
                                                <span className={style.Average}>Średnia: {(gradeSum / result.grades.length).toFixed(2)}</span>
                                            </th>
                                        </tr>
                                        <tr className={style.titleBoxSubject}>
                                            <td>Rodzaj</td>
                                            <td>Nazwa działu</td>
                                            <td>Stopień</td>
                                        </tr>
                                        {result.grades.map((grade) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                            {grade?.titleTask}
                                                        </td>
                                                        <td>
                                                            {grade?.genus}
                                                        </td>
                                                        <td>
                                                            {grade?.rating}
                                                        </td>
                                                    </tr>
                                                    {more &&
                                                        <tr>
                                                            <td colSpan="3">
                                                                {grade?.textarea}
                                                            </td>
                                                        </tr>
                                                    }
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </table>
                    </tr>
                </tbody>
            </table>
            <Button onClick={() => setMore(!more)}>{more ? "Ukryj opisy" : "Wyswetl opisy"}</Button>
        </Container>
    )
};