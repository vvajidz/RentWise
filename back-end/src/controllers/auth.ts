import { Request , Response } from "express";
import User from "../models/userModel"
import { ROLES } from "../constatnts.ts/role";
import { comparePasswords, generateToken, hashPassword } from "../services/passHash";
import { AuthRequest } from "../middleware/getme";


// SIGNUP-------------------------------

export const signup = async (req : Request , res : Response) => {

    try {
    const{fullName , email , password , role , agreedToTerms} = req.body;

    if (!fullName || !email || !password || !role ) {
        return res.status(400).json({message : "Fill the details Check missing one"})
    }
    if(![ROLES.TENANT,ROLES.OWNER].includes(role)){
        return res.status(400).json({message : "Invalid role"})
    }
    if (!agreedToTerms) {
      return res.status(400).json({ message: "You must agree to the terms to sign up." });
    }
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message : "email already used"})
    }

    const passwordHash = await hashPassword(password)

    const newUser = await User.create({
        fullName,
        email,
        passwordHash,
        role,
        agreedToTerms,
    })
    
const token = generateToken(newUser)

    res
    .cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201).json({
        message : "Signup Successful",
        token,
        user:{
            id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email,
            role : newUser.role
        }
    })
    }catch(error){
        console.error("Signup error" , error);
        res.status(500).json({message : "Server error during signup"})
}
}


// LOG-IN----------------------------------------------------------------------------------------------------


export const login = async(req:Request , res:Response) => {

    try{
        const{email , password} = req.body

        if(!email || !password){
            return res.status(400).json({message : "Email and password is required"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message : "invalid Credentials"})
        }
        const isMatch = await comparePasswords(password , user.passwordHash)
        if(!isMatch){
            return res.status(401).json({message:"invalid Credentials"})
        }
        
        const token =generateToken(user)

        res
        .cookie("token" , token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,

        })

        .status(200).json({
            message : "Login Successfully Done",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                createdAt : user.createdAt
      },
        })

    }catch(error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
}
//---------------------------------------------------------------------LOGOUT

export const logout = async(req:Request , res:Response) => {
    try{
        res
        .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
        })
        .status(200).json({
            message: "Logout successfully"
        })
    }catch(error){
        console.error("Logout error ," , error)
        res.status(500).json({ message: "Server error during logout." })
    }
}

// -----------------------------------CHECK WHO AM I ---------------------------

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    // We get userId from decoded JWT (middleware puts it into req.userId)
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
