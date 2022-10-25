import React from "react";
import '../styles/Account.css'

function Account(params) {
    return(
        <div className="account">
            <div className="espaciador"></div>
            <div className="contenedorU">
                <div className="form1">
                    <form>
                        <h1>RESTRABLECER CONTRASEÑA</h1>
                    </form>
                </div>
                <div className="form2">
                    <form>
                        <h1>AGREGAR OTRO USUARIO</h1>
                    </form>
                </div>
                <div className="form3">
                    <form>
                        <h1>ELIMINAR CUENTA</h1>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Account;