const jwt = require("jsonwebtoken")
const { User } = require("../models/user.model");

const verifyAuth = async(req,res,next)=>{
    try{
        const {accessToken} = req.cookies;
        if(!accessToken){
            return res.status(401).json({message:"Access token missing"})
        }
        let payload;
        try{
            payload =jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET);
        }catch(err){
            return res.status(401).json({message:err.message})
        }
        const id = payload.sub;
        const user =await User.findById(id).select("-passwordHash")
        if(!user){
            return res.status(401).json({message:"user not found"})
        }
        if(payload.role !== user.role){
            return res.status(401).json({message:"Unauthorized"})
        }
        req.user =user;
        next();

        }catch(err){
    return res.status(500).json({messgae:err.message})
}
};
// const refresh = async(req,res)=>{
//     try{
//         const {refreshToken} = req.cookies;
//         if(!refreshToken){
//             return res.status(400).json({message:"Refresh Token Missing"})

//         }
//         const payload=jwt.verify(refreshToken,process.env .JWT_ACCESS_SECRET);
//         if(payload.type !== "refresh"){
//             return res.status(400).json({message:"Token Type Not Refresh"})
//         }
//         const id = payload.sub;
//         const user = await User.findById(id);
//         if(!user){
//             res.clearCookie("refreshToken",{
//                 httpOnly:true,
//                 secur:process.env.NODE_ENV ==="Production",
//                 path:"/api/v1/auth/refresh",
//             })
//             return res.status(401).json({message:"User Not found"})
//         }
//         const accessToken =jwt.sign(
//             {sub:user._id,role:user.role},
//             process.env.JWT_ACCESS_SECRET,
//             {expiresIn:"15m"},
//         );
//         res.cookies("accessToken",accessToken,{
//             httpOnly:true,
//             secure:Process.env.NODE_ENV ==="production",
//             maxAge:15*60*1000,
//         }); 
//         return res.status(200).json({message:"ok"})
//     }catch(err){
//         return res.status(500).json({message:err.message})
//     }
        
// };

module.exports = {verifyAuth}