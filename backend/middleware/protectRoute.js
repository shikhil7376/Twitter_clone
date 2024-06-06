import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const protectRoute = async (req,res,next)=>{
    try{
        console.log("here");
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({error:"unauthorised:No token provided"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({error:"Unauthorised:invalid token"})
        }
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        req.user = user
        next()
    }catch(error){
        console.log("error in protectedroute middleware", error.message);
        res.status(500).json({ error: "internal server error" });
    }
}