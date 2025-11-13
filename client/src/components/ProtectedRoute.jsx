import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({children}) => {

    const { user  , loading } = useAuth()

    if (!loading) return <p> Loading... </p>

    return user ? children : <Navigate to="/login" />

}