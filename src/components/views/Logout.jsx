import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {HOME} from "../../config/routes/paths"
import useAuthContext from "../../hooks/useAuthContext";

function Logout() {
    const {logout} = useAuthContext()
    useEffect(()=>logout())
    return <Navigate to={HOME}/>
}
export default Logout;