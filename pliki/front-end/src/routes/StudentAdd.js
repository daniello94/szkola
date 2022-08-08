import React, { useState } from "react";
import axios from "axios";
import style from "../style/AddStudent.module.scss";
import Button from "../components/Button";
import Container from "../components/Container";

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
        return "Podałeś błędny znak. Numer Pesel składa sie z samych cyfr"
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
    const [isActive, setActive] = useState("close")
    const [baseImage, setBaseImage] = useState('')
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
        email: "",
        password: "",
        passwordRep: "",
        role: "",
        photo: "",
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
            const { name,
                lastName,
                numberId,
                classNr,
                role,
                email,
                password,
                passwordRep,
                photo
            } = form

            const formData = new FormData();
            formData.append("name", name);
            formData.append("photo", photo);
            formData.append("email", email);
            formData.append("lastName", lastName,);
            formData.append("numberId", numberId);
            formData.append("classNr", classNr);
            formData.append("role", role);
            formData.append("password", password,);
            formData.append("passwordRep", passwordRep);
           

            axios.post('http://127.0.0.1:8080/api/user/signup', formData)
                .then(() => {
                    setError(<span className={style.errorCorrect}>Dodałeś ucznia</span>)
                })
            setForm({
                name: "",
                lastName: "",
                numberId: "",
                classNr: "",
                role: "",
                email: "",
                password: "",
                passwordRep: "",
                photo: ""
            })
        }
    };

    const handlePhoto = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        onOpen()

        setForm({
            ...form,
            photo: e.target.files[0],
        })
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            };

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    };

    const onOpen = () => {
        setActive('open')
    };

    let stateStudent = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };
    const { name, lastName, numberId,  email, classNr, role, password, passwordRep } = form

    return (
        <Container>
            <p className={style.errorCorrect}>
                {error}
            </p>

            <form className={style.addStudentFrom} encType="multipart/form-data">
                <label>
                    <span className={style.contentHederLabel}>
                        Dane Personalne ucznia
                    </span>
                    <div className={style[isActive]}>
                        <img src={baseImage} alt="Brak Zdjecia" />
                    </div>
                    <input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto} />
                    <input onChange={stateStudent} value={name} type="text" name="name" placeholder="Podaj imie ucznia" />
                    <span className={style.error}>
                        {errorName}
                    </span>
                    <input onChange={stateStudent} value={lastName} type="text" name="lastName" placeholder="Podaj nazwisko ucznia" />
                    <span className={style.error}>
                        {errorLastName}
                    </span>
                    <input onChange={stateStudent} value={numberId} type="text" name="numberId" placeholder="Podaj Pesel ucznia" />
                    <span className={style.error}>
                        {errorNumberId}
                    </span>
                </label>

                <label>
                    <span className={style.contentHederLabel}>
                        Podaj klase ucznia
                    </span>
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
                <span className={style.error}>{errorClassNr}</span>

                <label>
                    <span className={style.contentHederLabel}>
                        Dane konta ucznia
                    </span>

                    <input onChange={stateStudent} value={email} type="text" name="email" placeholder="Podaj email ucznia" />
                    <span className={style.error}>{errorEmail}</span>

                    <input onChange={stateStudent} value={password} type="password" name="password" placeholder="Podaj hasło" />
                    <span className={style.error}>{errorPassword}</span>

                    <input onChange={stateStudent} type="password" value={passwordRep} name="passwordRep" placeholder="Powtórz hasło" />
                    <span className={style.error}>{errorPasswordRep}</span>

                </label>

                <label>
                    <span className={style.contentHederLabel}>
                        Typ konta
                    </span>

                    <select name="role" onChange={stateStudent} value={role}>
                        <option>wybierz</option>
                        <option>student</option>
                    </select>
                </label>
                <span className={style.error}>
                    {errorRole}
                </span>

                <Button isAlternative={true} onClick={addStudent} type="submit">
                    Dodaj
                </Button>
            </form>
        </Container>
    )
}
