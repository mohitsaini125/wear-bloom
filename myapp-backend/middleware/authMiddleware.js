import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
export const authMiddleware=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.json({
                success:false,
                message:"token required"
            })
        }
        const tokenData=jwt.verify(token,process.env.SECRET);
        if(!tokenData){
            return res.json({
                success:false,
                message:"unauthorized"
            })
        }
        const userId=tokenData.id;
        if(!userId){
            return res.json({
                success:false,
                message:"user id is required"
            })
        }
        const user=await  User.findById(userId);
           if(!user){
        return res.json({
            success:false,
            message:"user not find"
        })
    }
    req.user=user;
    


    next();

    }catch(error){
        res.json({
            success:false,
            message:error.message
        })
    }
}