import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase/connection";
import useAuthContext from "../../hooks/useAuthContext";
import toast, { Toaster } from "react-hot-toast";
import "../styles/NewPhoto.css";

const success = () =>
  toast.success("IMAGEN GUARDADA", {
    duration: 2000,
    position: "bottom-right",
  });

function NewPhoto(params) {
  const usersCollection = collection(db, "Galeria");
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const { userAuth } = useAuthContext();

  function handleTitleChange(event) {
    setTitulo(event.target.value);
  }
  function handleLinkChange(event) {
    setLink(event.target.value);
    const preview = document.querySelector(".preview img");
    var url = link;
    preview.src = url;
  }
  async function registerNP(event) {
    event.preventDefault();
    await addDoc(usersCollection, {
      username: userAuth,
      title: titulo,
      link: link,
    });
    success();
    setLink("");
    setTitulo("");
    const preview = document.querySelector(".preview img");
    preview.src = "https://media1.giphy.com/media/J19OSJKmqCyP7Mfjt1/giphy.gif?cid=ecf05e47hsiwl160y64hyibjrd2833ovhf815tcyacflgjju&rid=giphy.gif&ct=g";
  }

  return (
    <div className="newPhoto">
      <div className="espaciador"></div>
      <div className="containerNP">
        <form className="formNP" onSubmit={registerNP}>
          <h1>SUBIR NUEVA IMAGEN</h1>
          <input
            type="text"
            value={titulo}
            onChange={handleTitleChange}
            placeholder="ESCRIBE EL TITULO AQUI..."
            name="title"
            id="title"
            required
          />
          <input
            type="text"
            value={link}
            onChange={handleLinkChange}
            placeholder="ESCRIBE EL LINK AQUI..."
            name="linkPhoto"
            id="linkPhoto"
            required
          />
          <button>SUBIR IMAGEN</button>
        </form>
        <div className="preview">
          <img
            src="https://media1.giphy.com/media/J19OSJKmqCyP7Mfjt1/giphy.gif?cid=ecf05e47hsiwl160y64hyibjrd2833ovhf815tcyacflgjju&rid=giphy.gif&ct=g"
            alt="Not Found"
          />
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

export default NewPhoto;
