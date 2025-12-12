
import User from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const signUp=async(req,res,next)=>{
    try{
        const {name,password,email}=req.body;
        if(!name.trim() || !email.trim() || !password.trim()){
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });

        }
        const existUser= await User.findOne({email:email})
        if(existUser){
            return res.status(403).json({
                success:false,
                message:"cannot sign user already exist"

            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        

        const user=await User.create({
            name:name,
            email:email,
            password:hashedPassword
        })
        const token= jwt.sign({user:user._id},process.env.SECRET);
        return res.cookie("token",token).json({
            success:true,
            data:user,
            message:"sign sucessfully"

        })
    }catch(error){
        next(error);
    }
}
export const login=async(req,res,next)=>{
    try{
        const data=req.body;
        
        if(!data.email|| !data.password){
              return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }
        const user=await User.findOne({email:data.email})
        if(!user){
            return res.status(403).json({
                success:false,
                message:"user not exist"
            })
        }
        const correct=await bcrypt.compare(data.password,user.password);
        if(!correct){
            return res.json({
                success:false,
                message:"password not matched"
            })
        }
        const token=jwt.sign({id:user._id},process.env.SECRET)
        return res.cookie("token",token).json({
            success:true,
            message:"login successfully"
        })

    }catch(error){
        next(error)
    }
}