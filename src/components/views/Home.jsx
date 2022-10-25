import React, { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase/connection";
import useAuthContext from "../../hooks/useAuthContext";
import "../styles/Home.css";
import { NavLink } from "react-router-dom";

function Home(params) {
  const usersCollection = collection(db, "Galeria");
  const { userAuth } = useAuthContext();
  const [datos, setDatos] = useState([]);

  async function getGaleria() {
    const dataDB = await getDocs(usersCollection);
    setDatos(dataDB.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  useEffect(() => {
    getGaleria();
  }, []);

  return (
    <div className="home">
      <div className="espaciador"></div>
      <div className="containerGallery">
        <section className="post-list">
          {datos.map((datos, index) => {
            if (datos.username === userAuth) {
              return <NavLink key={index} className="post" to={`photo/${datos.id}`}>
                <figure className="post-image">
                  <img src={datos.link} alt={datos.title}/>
                </figure>
                <span className="post-overlay">
                  <p>
                    <span className="post-likes">{datos.title}</span>
                  </p>
                </span>
              </NavLink>
            }
          })}
        </section>
      </div>
    </div>
  );
}
/*
<div className="post" key={index}>
                  <img
                    src={datos.link}
                    className="post-image"
                    alt={datos.title}
                  />
                  <span className="post-overlay">
                    <p>
                      <span className="post-likes">{datos.title}</span>
                    </p>
                  </span>
                </div>
*/
export default Home;
