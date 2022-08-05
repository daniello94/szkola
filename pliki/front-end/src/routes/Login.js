import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool } from "@fortawesome/free-solid-svg-icons"
import style from '../style/Login.module.scss';
import Container from "../components/Container";
import Button from "../components/Button";

const validateLogin = (form) => {
  if (!form.email) {
    return "wpisz login";
  }
};

const validatePassword = (form) => {
  if (!form.password) {
    return "wpisz hasło";
  }
};

const validate = (form) => {

  if (form.email !== form.data) {
    return "Hasło bądź nazwa urzytkownika są nieprawidłowe";
  }
};

export default function Login(props) {
  const [error, setError] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const userSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8080/api/user/login", {
        email: email,
        password: password,
      })
      .then((req) => {
        if (!req.data.success) {
          const errorss = validate(form);
          const errorLogin = validateLogin(form);
          const errorPassword = validatePassword(form);
          if (errorss) {
            setErrorLogin(errorLogin);
            setErrorPassword(errorPassword);
            setError(errorss);
            e.preventDefault();
            return;
          }
        } else {
          props.setUser(req.data);
          localStorage.setItem("user", JSON.stringify(req.data));
        }
      });
  };

  let stateLogin = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const { email, password } = form;
  return (
    <Container>
      {props.userData && <Navigate to={`/userData/${props.userData.user._id}`} />}
      <p className={style.error}>{error}</p>

      <form className={style.formContend} onSubmit={userSubmit}>
        <FontAwesomeIcon className={style.iconLogin} icon={faSchool} />

        <input
          type="text"
          value={email}
          onChange={stateLogin}
          name="email"
          placeholder="Podaj Login"
        ></input>
        <span className={style.error}>{errorLogin}</span>

        <input
          type="password"
          value={password}
          name="password"
          onChange={stateLogin}
          placeholder="Podaj Hasło"
        ></input>
        <span className={style.error}>{errorPassword}</span>
        <Button type="submit">Zaloguj</Button>
      </form>
    </Container>
  );
};
