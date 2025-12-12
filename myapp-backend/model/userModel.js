import mongoose from 'mongoose';
const userSchema=mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        required:true,
        trim:true
    },
    email:{
        type:String,
        validate:(v)=>v.includes("@"),
        unique:true,
         lowercase: true,
        required:true

    },
    password:{
        type:String,
        required:true,
        minlength:4,
        match: [/[!@#$%^&*(),{}<>]/, "At least one special character required"]
    }
},{
    timestamps:true
})
const User=mongoose.model("User",userSchema);
export default User;