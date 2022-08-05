import React, { useState } from "react";
import axios from "axios";


const validateName = form => {
    if (!form.name) {
        return "Podaj imię"
    } else if (form.name.length < 3) {
        return "Podaj prawdziwe imię"
    };
};

const validateLastName = form => {
    if (!form.lastName) {
        return "Podaj nazwisko ucznia"
    } else if (form.name.length < 3) {
        return "Podaj prawdziwe nazwisko"
    };
};

const validateClassNr = form => {
    if (!form.classNr) {
        return "Podaj klase ucznia"
    };
}

const validateNumberId = form => {
    if (!form.numberId) {
        return "wpisz Pesel"
    } else if (form.numberId.length <= 10) {
        return "Podałeś za mało cyfr Pesel składa się z 11 liczb"
    } else if (form.numberId.length >= 12) {
        return "Podałes za dużo cyf Pesel składa się z 11 liczb"
    } else if (/\D/.test(form.numberId)) {
        return "Podałeś błędny znak numer Pesel składa sie z samych cyfr"
    }
};

const validateEmail = form => {
    if (!form.email) {
        return "Wpisz email"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
        return "Podaj poprawny email"
    };
};

const validatePassword = form => {
    if (!form.password) {
        return "Wpisz hasło"
    } else if (form.password.length < 6) {
        return "Hasło musi zawierać minimum 6 znaków"
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(form.password)) {
        return "Hasło musi zawierać znak specjalny np: @ ! # & % $"
    } else if (!/^[^\s]*$/.test(form.password)) {
        return "Hasło nie może zawierać pustych znaków"
    }
};

const validatePasswordRep = form => {
    if (!form.passwordRep) {
        return "Powtórz hasło"
    } else if (form.passwordRep !== form.password) {
        return "Podane hasła nie są identyczne"
    }
};

const validateRole = form => {
    if (!form.role) {
        return "Podaj typ konta"
    }
};
const validate = form => {
    if (!form.name)
        return " "
}


export default function StudentAdd() {
    const [error, setError] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordRep, setErrorPasswordRep] = useState("");
    const [errorNumberId, setErrorNumberId] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorClassNr, setErrorClassNr] = useState("");
    const [errorRole, setErrorRole] = useState("");
    const [form, setForm] = useState({
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
        photo: "",
        address: {
            city: "",
            street: "",
            nr: "",
            zipCode: ""
        }
    });

    console.log(form);
    const addStudent = (e) => {
        e.preventDefault();
        const errorss = validate(form)
        const errorName = validateName(form)
        const errorLastName = validateLastName(form)
        const errorEmail = validateEmail(form)
        const errorPassword = validatePassword(form)
        const errorPasswordRep = validatePasswordRep(form)
        const errorNumberId = validateNumberId(form)
        const errorClassNr = validateClassNr(form)
        const errorRole = validateRole(form)
        if (errorss) {
            setError(errorss)
            setErrorName(errorName)
            setErrorLastName(errorLastName)
            setErrorEmail(errorEmail)
            setErrorPassword(errorPassword)
            setErrorPasswordRep(errorPasswordRep)
            setErrorNumberId(errorNumberId)
            setErrorClassNr(errorClassNr)
            setErrorRole(errorRole)
            return
        } else {
            const { name, lastName, numberId, classNr, nameMather, nameFather, role, email, password, passwordRep,
                city, street, nr, zipCode, photo } = form
            axios.post('http://127.0.0.1:8080/api/user/signup', {
                name, lastName, numberId, classNr, nameMather, nameFather, role, email, password, passwordRep, photo,
                address: {
                    city,
                    street,
                    nr,
                    zipCode
                }

            })
                .then(() => {
                    setError(<span>Dodałeś ucznia</span>)
                })
            setForm({
                name: "",
                lastName: "",
                numberId: "",
                classNr: "",
                nameMather: "",
                nameFather: "",
                role: "",
                email: "",
                password: "",
                passwordRep: "",
                city: "",
                street: "",
                nr: "",
                zipCode: "",
                photo: ""
            })
        }
    }
    const handlePhoto = (e) => {
        setForm({
            ...form,
            photo: e.target.files[0]
        })
        console.log(form.photo);
    }
    let stateStudent = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })

    }
    const { name, lastName, photo, numberId, nameMather, nameFather, email, classNr, role, password, passwordRep, city, street, nr, zipCode } = form

    return (
        <div className="container">
            <div className="form">
                <h2>Dodaj Ucznia </h2>
                <p className="error">{error}</p>
                <form encType="multipart/form-data">

                    <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto}>
                    </input>

                    <input onChange={stateStudent} value={name} type="text" name="name" placeholder="Podaj imie ucznia" />
                    <span className="error">
                        {errorName}</span>

                    <input onChange={stateStudent} value={lastName} type="text" name="lastName" placeholder="Podaj nazwisko ucznia" />
                    <span className="error">{errorLastName}</span>

                    <label>Podaj klase ucznia
                        <select onChange={stateStudent} value={classNr} type="text" name="classNr">
                            <option>wybierz</option>
                            <option>1a</option>
                            <option>1b</option>
                            <option>1c</option>
                            <option>2a</option>
                            <option>2b</option>
                            <option>2c</option>
                            <option>3a</option>
                            <option>3b</option>
                            <option>3c</option>
                            <option>4a</option>
                            <option>4b</option>
                            <option>4c</option>
                        </select>
                    </label>
                    <span className="error">{errorClassNr}</span>
                    <input onChange={stateStudent} value={numberId} type="text" name="numberId" placeholder="Podaj Pesel ucznia" />
                    <span className="error">{errorNumberId}</span>

                    <input onChange={stateStudent} value={nameMather} type="text" name="nameMather" placeholder="Podaj imie matki ucznia"></input>
                    <input onChange={stateStudent} value={nameFather} type="text" name="nameFather" placeholder="Podaj imie ojca ucznia"></input>

                    <label>Adres
                        <input onChange={stateStudent} value={city} type="text" name="city" placeholder="Miasto" />

                        <input onChange={stateStudent} value={street} type="text" name="street" placeholder="ulica" />

                        <input onChange={stateStudent} value={nr} type="text" name="nr" placeholder="numer domu" />

                        <input onChange={stateStudent} value={zipCode} type="text" name="zipCode" placeholder="Kod pocztowy"></input>
                    </label>
                    <label>Dane konta ucznia
                        <input onChange={stateStudent} value={email} type="text" name="email" placeholder="Podaj email ucznia" />
                        <span className="error">{errorEmail}</span>

                        <input onChange={stateStudent} value={password} type="password" name="password" placeholder="Podaj hasło" />
                        <span className="error">{errorPassword}</span>

                        <input onChange={stateStudent} type="password" value={passwordRep} name="passwordRep" placeholder="Powtórz hasło" />
                        <span className="error">{errorPasswordRep}</span>

                    </label>
                    <label>Typ konta
                        <select name="role" onChange={stateStudent} value={role}>
                            <option>wybierz</option>
                            <option>student</option>
                        </select>
                    </label>
                    <span className="error">{errorRole}</span>

                    <button className="btn-1" onClick={addStudent} type="submit">Dodaj</button>
                </form>
            </div>
        </div>
    )
}
