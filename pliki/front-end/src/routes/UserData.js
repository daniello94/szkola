import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Container from "../components/Container";
import style from "../style/UserData.module.scss";

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
        photo:"",
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
    }, [id])


const photos = status.photo;
console.log(photos);
    return (
        <Container>
            <div>
                
             {/* <img src={require('./../../../back-end/images/'+ photos) } alt="sjsn"/> */}
            </div>
            <table className={style.tableUserData}>
                <thead>
                    <tr>
                        <th colSpan="2">{status.name} {status.lastName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pesel</td>
                        <td>{status.numberId}</td>
                    </tr>
                    <tr>
                        <td>Imie Matki</td>
                        <td>{status.nameMather}</td>
                    </tr>
                    <tr>
                        <td>Imie Ojca</td>
                        <td>{status.nameFather}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{status.email}</td>
                    </tr>
                    <tr>
                        <td>Klasa</td>
                        <td>{status.classNr}</td>
                    </tr>
                    <tr>
                        <td>Typ konta</td>
                        <td>{status.role}</td>
                    </tr>
                    <tr>
                        <th colSpan="2">Adres</th>
                    </tr>

                    <tr>
                        <td>Miasto</td>
                        <td>{status.address.city}</td>
                    </tr>
                    <tr>
                        <td>Ulica i Numer</td>
                        <td>{status.address.street} {status.address.nr}</td>
                    </tr>
                    <tr>
                        <td>Kod Pocztowy</td>
                        <td>{status.address.zipCode}</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    )
};