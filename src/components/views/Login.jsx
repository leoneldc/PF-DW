import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import md5 from 'md5';
import useAuthContext from "../../hooks/useAuthContext";
import { db } from "../../config/firebase/connection";
import toast, { Toaster } from "react-hot-toast";
import "../styles/Login.css";

const success = () =>
  toast.success("USUARIO REGISTRADO CORRECTAMENTE.", {
    duration: 2000,
    position: "top-center",
  });
const error = () =>
  toast.error("USUARIO YA ESTA REGISTRADO.", {
    duration: 2000,
    position: "top-center",
    style: {},
    className: "",
    style: {
      background: "#ff4b2b",
      color: "#fff",
    },
  });
const errorlogin = () =>
  toast.error("USUARIO O CONTRASEÑA INCORRECTA.", {
    duration: 2000,
    position: "top-center",
    style: {},
    className: "",
    style: {
      textAlign: "center",
      background: "#ff4b2b",
      color: "#fff",
    },
  });

function Login(params) {
  const [lUser, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const usersCollection = collection(db, "Usuarios");
  const { login, usernameAuth } = useAuthContext();

  function handleUserChange(event) {
    setUser(event.target.value);
  }
  function hanblePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    validateAuth();
  }
  async function registerNU(event) {
    event.preventDefault();
    validateUser();
  }
  function styleSU() {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
    setUser("");
    setPassword("");
  }
  function styleSI() {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
    setUser("");
    setPassword("");
  }

  const validateAuth = async () => {
    const userRef = query(usersCollection, where("username", "==", lUser));
    const findUsers = await getDocs(userRef);
    findUsers.forEach(async (user) => {
      if (lUser === user.data().username) {
        if (md5(password) === user.data().password) {
          usernameAuth(lUser);
          return login();
        }
      }
    });
    return errorlogin();
  };

  const validateUser = async () => {
    let encontrado = false;
    const userRef = query(usersCollection, where("username", "==", lUser));
    const findUsers = await getDocs(userRef);
    findUsers.forEach(async (user) => {
      if (lUser === user.data().username) {
        encontrado = true;
      }
    });
    return encontrado == true ? error() : await addDoc(usersCollection, { username: lUser, password: md5(password) }) + setUser("") + setPassword("") + success();
  };

  return (
    <div className="login">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={registerNU}>
            <h1>Crear un usuario</h1>
            <input
              required
              onChange={handleUserChange}
              value={lUser}
              type="username"
              placeholder="Username"
            />
            <input
              required
              onChange={hanblePasswordChange}
              value={password}
              type="password"
              placeholder="Password"
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <input
              required
              type="username"
              onChange={handleUserChange}
              value={lUser}
              placeholder="Username"
            />
            <input
              required
              type="password"
              onChange={hanblePasswordChange}
              value={password}
              placeholder="Password"
            />
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>¡Guardamos tu recuerdo!🖼️</h1>
              <p className="textLogin">
                ¿Ya tienes un usuario? <br /> <br /> Inicia sesión y sube tus
                imagenes preferidas.
              </p>
              <button className="ghost" id="signIn" onClick={styleSI}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>¡Hola🐒!</h1>
              <p className="textLogin">
                ¿Aún no tienes un usuario? <br /> <br /> Registrate y comienza a
                guardar y editar tus recuerdos con nosotros.
              </p>
              <button className="ghost" onClick={styleSU} id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}

export default Login;
