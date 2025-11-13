import { createContext , useContext , useState , useEffect} from "react";
import API from "../api/api";


const AuthContext = createContext()




export const AuthProvider = ({children}) => {

const [user , setUser] = useState(null)
const [loading , setLoading] = useState(true)


const login = async (credentials) => {
    const { token } = credentials
    localStorage.setItem("token" , token)
    setUser(credentials)
}


const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
}


const getUserProfile = async () => {
    try {
        const response = await API.get("/users/me" , { headers : { Authorization  : "Bearer "} })
        setUser(response.data)
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}

useEffect(() => {
    getUserProfile()
},[])



    return (
        <AuthContext.Provider value={{user , login , logout}}>
            {children}
        </AuthContext.Provider>
    )


}


export const useAuth = () => useContext(AuthContext)