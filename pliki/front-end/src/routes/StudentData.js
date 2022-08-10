import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../style/StudentData.module.scss";
import Container from "../components/Container";
import Button from "../components/Button";

export default function StudentData() {
    const [status, setStatus] = useState({
        name: "",
        lastName: "",
        classNr: "",
        numberId: "",
        nameMather: "",
        nameFather: "",
        email: "",
        password: "",
        passwordRep: "",
        role: "",
        address: {
            city: "",
            street: "",
            nr: "",
            zipCode: ""
        },
        results: [],
    });

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [classNr, setClassNr] = useState("");
    const [numberId, setNumberId] = useState("");
    const [nameMather, setNameMather] = useState("");
    const [nameFather, setNameFather] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [nr, setNr] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [update, setUpdate] = useState("");

    let { id } = useParams();

    function editClick(id) {
        setUpdate(id)
    };

    function updateUser(_id) {
        axios.put('http://127.0.0.1:8080/api/user/update/' + id, {
            name, lastName, classNr, numberId, nameMather, nameFather, email,
            address: {
                city, street, nr, zipCode
            }
        })
            .then(() => {
                setUpdate("")
                oneStudent(_id)
            })
    }

    function oneStudent(id) {
        axios.get('http://127.0.0.1:8080/api/user/' + id)
            .then((res) => {
                setStatus(res.data)
            })
    }

    useEffect(() => {
        oneStudent(id)
    }, [id]);
    const photos = status.photo;
    if (update === status.id) {

        return (

            <Container>
                <table key={status._id} className={style.tableStudent}>
                    <thead>
                        <tr>
                            <th colSpan="2">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name"></input>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName"></input>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >Pesel</td>
                            <td ><input type="text" value={numberId} onChange={(e) => setNumberId(e.target.value)} name="numberId"></input></td>
                        </tr>
                        <tr >
                            <td >Imie Matki</td>
                            <td><input type="text" value={nameMather} onChange={(e) => setNameMather(e.target.value)} name="nameMather"></input></td>
                        </tr>
                        <tr >
                            <td>Imie Ojca</td>
                            <td><input type="text" value={nameFather} onChange={(e) => setNameFather(e.target.value)} name="nameFather"></input></td>
                        </tr>
                        <tr >
                            <td>Email</td>
                            <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email"></input></td>
                        </tr>
                        <tr >
                            <td>Klasa</td>
                            <td><input type="text" value={classNr} onChange={(e) => setClassNr(e.target.value)} name="classNr"></input></td>
                        </tr>
                        <tr >
                            <td>Typ konta</td>
                            <td>{status.role}</td>
                        </tr>
                        <tr >
                            <th className={style.titleBox} colSpan="4">Adres</th>
                        </tr>

                        <tr >
                            <td>Miasto</td>
                            <td><input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city"></input></td>
                        </tr>
                        <tr>
                            <td>Ulica i Numer</td>
                            <td>
                                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} name="street"></input>
                                <input type="text" value={nr} onChange={(e) => setNr(e.target.value)} name="nr"></input>
                            </td>
                        </tr>
                        <tr >
                            <td>Kod Pocztowy</td>
                            <td>
                                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} name="zipCode"></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <Button onClick={() => updateUser(status._id)}>Zapisz</Button>
                    <Button onClick={() => setUpdate("")}>Anuluj</Button>
                </div>

            </Container>
        )
    };
    return (
        <Container>

            <table className={style.tableStudent}>
                <thead>
                    <tr>
                        <th colSpan="4">
                            <img src={'http://localhost:8080/img/' + photos} alt="foto profil" /><br />
                            Uczeń {status.name} {status.lastName}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="2">
                            Klasa
                        </td>
                        <td colSpan="2">
                            {status.classNr}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            Pesel
                        </td>
                        <td colSpan="2">
                            {status.numberId}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            Imie Matki
                        </td>
                        <td colSpan="2">
                            {status.nameMather}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            Imie Ojca
                        </td>
                        <td colSpan="2">
                            {status.nameFather}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            Email
                        </td>
                        <td colSpan="2">
                            {status.email}
                        </td>
                    </tr>
                    <tr>
                        <th className={style.titleBox} colSpan="4">
                            Adres
                        </th>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            Miasto
                        </td>
                        <td colSpan="2">
                            {status.address.city}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            Ulica i Numer
                        </td>
                        <td colSpan="2">
                            {status.address.street} {status.address.nr}
                        </td>
                    </tr>
                    <tr >
                        <td colSpan="2">
                            Kod Pocztowy
                        </td>
                        <td colSpan="2">
                            {status.address.zipCode}
                        </td>
                    </tr>
                </tbody>
            </table>

            <Button onClick={() => {
                setName(status.name)
                setLastName(status.lastName)
                setClassNr(status.classNr)
                setNumberId(status.numberId)
                setNameMather(status.nameMather)
                setNameFather(status.nameFather)
                setEmail(status.email)
                setCity(status.address.city)
                setStreet(status.address.street)
                setNr(status.address.nr)
                setZipCode(status.address.zipCode)
                editClick(status.id)
            }}>Edytuj dane</Button>

            <table className={style.tableStudent}>
                <thead>
                    <tr>
                        <th className={style.titleGrades} colSpan="4">
                            Oceny
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {status.results.map((result) => {
                        let gradeSum = 0
                        result.grades.forEach(grade => {
                            gradeSum += parseFloat(grade.rating)
                        });
                        return (
                            <>
                                <tr>
                                    <th colSpan='3' className={style.titleBox}>
                                        {result?.nameSubject}
                                        <span className={style.Average}>Średnia: {(gradeSum / result.grades.length).toFixed(2)}</span>
                                    </th>
                                </tr>
                                <tr>
                                    <td className={style.NameType}>Nazwa Działu</td>
                                    <td className={style.NameType}>Rodzaj</td>
                                    <td className={style.NameType}>Stopień</td>
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
                                        </>
                                    )
                                })}
                            </>
                        )
                    })}
                </tbody>
            </table>

        </Container>
    )
}