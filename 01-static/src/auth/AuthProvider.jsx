import { createContext, useContext, useState } from "react"
const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => "",
    saveUser: (userData)=>{},
})

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(""); 
    const [refreshToken, setRefreshToken] = useState("");
    const [userInfo, setUserInfo] = useState(""); 
    const getAccessToken = () => {
        return accessToken; 
    };
    const saveUser = (userData) =>{
        console.log(userData.body)
        const {accessToken, refreshToken, user} =userData.body;
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        localStorage.setItem("token", JSON.stringify(refreshToken))
        setUserInfo(user)
        setIsAuthenticated(true)
    }
    return(
        <AuthContext.Provider value={{isAuthenticated, getAccessToken, saveUser, userInfo, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () =>{
    return useContext(AuthContext)
}