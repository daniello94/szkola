import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function UserData(_id) {

    let { id } = useParams()

    const [status, setStatus] = useState({
        name: "",
        lastName: "",
        classNr: "",
        numberId: "",
        nameMather: "",
        nameFather: "",
        email: "",
        role: "",
        address: {
            city: "",
            street: "",
            nr: "",
            zipCode: ""
        }
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
        <div className="container">
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">{status.name} {status.lastName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="box">Pesel</td>
                            <td className="box">{status.numberId}</td>
                        </tr>
                        <tr>
                            <td className="box">Imie Matki</td>
                            <td className="box">{status.nameMather}</td>
                        </tr>
                        <tr>
                            <td className="box">Imie Ojca</td>
                            <td className="box">{status.nameFather}</td>
                        </tr>
                        <tr>
                            <td className="box">Email</td>
                            <td className="box">{status.email}</td>
                        </tr>
                        <tr>
                            <td className="box">Klasa</td>
                            <td className="box">{status.classNr}</td>
                        </tr>
                        <tr>
                            <td className="box">Typ konta</td>
                            <td className="box">{status.role}</td>
                        </tr>
                        <tr>
                            <th className="title-box" colSpan="2">Adres</th>
                        </tr>

                        <tr>
                            <td className="box">Miasto</td>
                            <td className="box">{status.address.city}</td>
                        </tr>
                        <tr>
                            <td className="box">Ulica i Numer</td>
                            <td className="box">{status.address.street} {status.address.nr}</td>
                        </tr>
                        <tr>
                            <td className="box">Kod Pocztowy</td>
                            <td className="box">{status.address.zipCode}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
};