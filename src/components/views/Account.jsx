import { React, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import md5 from 'md5';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { db } from "../../config/firebase/connection";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import {LOGOUT} from "../../config/routes/paths"
import "../styles/Account.css";

const MySwal = withReactContent(Swal)

function Account(params) {

  let navigate = useNavigate();
  const [npassword, setNPassword] = useState("");
  const [lpassword, setLPassword] = useState("");
  const { userAuth } = useAuthContext();
  const usersCollection = collection(db, "Usuarios");
  const usersCollection2 = collection(db, "Galeria");

  function changeOPassword(event) {
    setLPassword(event.target.value);
  }
  function changeNPassword(event) {
    setNPassword(event.target.value);
  }
  function cambiarContraseña(event) {
    event.preventDefault();
    updateUser();
  }
  function eliminarCuenta(event) {
    event.preventDefault();
    MySwal.fire({
      title: '¿DESEA ELIMINAR SU CUENTA?',
      text: "¡no podrá revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAccount();
        Swal.fire(
          'ELIMINADO!',
          'TÚ CUENTA AH SIDO ELIMINADA EXITOSAMENTE.',
          'success'
        )
      }
    })
  }
  const updateUser = async () => {
    const userRef = query(usersCollection, where("username", "==", userAuth));
    const findUsers = await getDocs(userRef);
    findUsers.forEach(async (user) => {
      const getUser = doc(usersCollection, user.id);
      if (userAuth === user.data().username) {
        if (md5(lpassword) === user.data().password) {
          await updateDoc(getUser, {
            password: md5(npassword),
          });
        }
      }
    });
  };
  const deleteAccount = async () => {
    var userRef = query(usersCollection2, where("username", "==", userAuth));
    var findUsers = await getDocs(userRef);
    findUsers.forEach(async (user) => {
        await deleteDoc(doc(usersCollection2, user.id));
    });
    userRef = query(usersCollection, where("username", "==", userAuth));
    findUsers = await getDocs(userRef);
    findUsers.forEach(async (user) => {
        await deleteDoc(doc(usersCollection, user.id));
    });
    return navigate(LOGOUT);
  };

  return (
    <div className="account">
      <div className="contenedorU">
        <div className="form1">
          <form onSubmit={cambiarContraseña}>
            <h1>RESTRABLECER CONTRASEÑA</h1>
            <input
              required
              onChange={changeOPassword}
              value={lpassword}
              type="password"
              placeholder="constraseña actual..."
            />
            <input
              required
              onChange={changeNPassword}
              value={npassword}
              type="password"
              placeholder="nueva contraseña..."
            />
            <button>CAMBIAR CONTRAEÑA</button>
          </form>
        </div>
        <div className="espaciador"></div>
        <div className="form2">
          <form onSubmit={eliminarCuenta}>
            <button>ELIMINAR CUENTA</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
