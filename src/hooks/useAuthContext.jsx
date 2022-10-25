import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuthContext(params) {
    return useContext(AuthContext)
}
