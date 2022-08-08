import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import React, { useState } from "react";
import StudentList from "./routes/StudentList";
import Login from "./routes/Login";
import UserData from "./routes/UserData";
import MyGrades from "./routes/MyGrades";
import StudentAdd from "./routes/StudentAdd";
import StudentData from "./routes/StudentData";
import AddGrades from "./routes/AddGrades";
import Blog from "./routes/Blog";
import Chat from "./routes/Chat";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import style from './style/Menu.module.scss';

export default function App() {
  const [isActive, setActive] = useState("close")
  const [isClose, setClose] = useState('mobileHamburger')
  const [userData, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  axios.defaults.headers.common["x-auth-token"] = userData ? userData.jwt : "";

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!userData) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
    return children;
  };
  const logOut = () => {
    localStorage.clear();
    setInterval();
  };

  const onOpen = () => {
    setActive('open')
    setClose('close')
  }
  const onClose = () => {
    setClose('mobileHamburger')
    setActive('close')
  }

  return (
    <div>
      <nav className={style.mainNav}>
        <div className={style.container}>
          <div className={style.mainNavHolder}>
            <div className={style[isClose]} onClick={() => onOpen()}>
              <FontAwesomeIcon className="icon-open" icon={faBars} />
            </div>
            <div className={style[isActive]}>
              <div className={style.closeMobileHamburger} onClick={() => onClose()}>
                <FontAwesomeIcon className="icon-close" icon={faXmark} />
              </div>
              <ul className={style.menu}>
                {userData && userData.user.role === "teacher" && (
                  <li className={style.mainItem}>
                    <Link className={style.ulItem} to="/studentList">
                      Lista Studentów
                    </Link>
                  </li>
                )}

                {userData && (
                  <li className={style.mainItem}>
                    <Link className={style.ulItem} to={`/userData/${userData.user._id}`}>
                      Moje Dane
                    </Link>
                  </li>
                )}

                {userData && userData.user.role === "student" && (
                  <li className={style.mainItem}>
                    <Link className={style.ulItem} to={`/myGrades/${userData.user._id}`}>
                      Moje Oceny
                    </Link>
                  </li>
                )}

                {userData && (
                  <li className={style.mainItem}>
                    <Link className={style.ulItem} to="/blog">
                      Blog
                    </Link>
                  </li>
                )}

                {userData && (
                  <li className={style.mainItem}>
                    <Link className={style.ulItem} to="/chat">
                      Czat
                    </Link>
                  </li>
                )}

                {userData && (
                  <li className={style.mainItem}>
                    <Link className={style.ulItem} onClick={logOut} to="/">
                      Wyloguj
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          index
          element={<Login userData={userData} setUser={setUser} />}
        />

        <Route
          path="studentList"
          element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          }
        />

        <Route path="userData/:id" element={<UserData />} />
        <Route path="/myGrades/:id" element={<MyGrades />} />
        <Route path="/studentAdd" element={<StudentAdd />} />
        <Route path="/studentData/:id" element={<StudentData />} />
        <Route path="/addGrades/:id" element={<AddGrades />} />
        <Route path="/blog" element={<Blog dataUser={userData} />} />
        <Route path="/chat" element={<Chat dataUser={userData} />} />
      </Routes>

    </div>
  );
};
