import jwt from "jsonwebtoken";

export const sendcookie = (user,res,message,statuscode=200)=>{

    const token = jwt.sign({_id:user._id},process.env.JWT_Token);

    res.status(statuscode).cookie("token",token ,{
        httpOnly:true,
        maxAge:15 * 60 * 1000,
        //samesite use for backend frontend url and lax used in dev but in production we need none
        samesite: process.env.NODE_ENV === "development" ? "lax" : "none",
        //if samesite is none secure should be true
        secure: process.env.NODE_ENV === "development" ? false : true,
    }).json({
        success:true,
        message,
})
}