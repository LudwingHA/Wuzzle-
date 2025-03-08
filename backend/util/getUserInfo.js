const getUserInfo = (user)=>{
    return{
        id: user._id,
        username: user.username,
        email: user.email,
        wins: user.wins,
        createdAt: user.createdAt,
        birthdate: user.birthdate
    }
}
export default getUserInfo;