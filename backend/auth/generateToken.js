import jwt from 'jsonwebtoken'
const sign = (payload, isAccesToken) =>{
    return jwt.sign(payload, isAccesToken ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: isAccesToken ? "15m" : "7d",
    })
}
export const generateAccessToken = (user)=>{
    return sign({user}, true)
}
export const generateRefreshToken = (user)=>{
    return sign({user}, false)
}