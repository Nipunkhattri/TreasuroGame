import UserModel from "../models/UserSchema.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "Treasuro";

export const signup = async (req,res)=>{
    // console.log(formdata);
    const {Username,Password,ZealId,Phoneno} = req.body;
    // console.log(req.body);
    let level = 1;
    let points = 0;
    try {
        const user = await UserModel.findOne({Username});
        const Zealid = await UserModel.findOne({ZealId});
        // console.log(user)
        if(user){
            return res.status(400).json({message:"Username already taken"});
        }
        if(Zealid){
            return res.status(400).json({message:"Wrong Zeal Id"});
        }
        const hashedPassword = await bcrypt.hash(Password, 12);
        console.log(hashedPassword);
        const result = await UserModel.create({
            Username,
            Password: hashedPassword,
            Level:level,
            Points:points,
            ZealId:ZealId,
            Phoneno:Phoneno
        });

        // console.log(result);

        const token = jwt.sign({ Username: result.Username, id: result._id }, secret, {
            expiresIn: "1h",
        });

        res.status(200).json({ result , token });
    } catch (error) {
        res.status(500).json({message:"Something Wrong"})
        console.log(error);
    }

}

export const signin = async (req,res)=>{
    const {Username,Password} = req.body;

    const user = await UserModel.findOne({Username});
    console.log(user);

    if(user == null){
        return res.status(400).json({message:"Username not found.."})
    }

    const matchParrsword = await bcrypt.compare(Password,user.Password);

    if(!matchParrsword){
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ Username: user.Username, id: user._id }, secret, {
        expiresIn: "1h",
    });
  
    res.status(200).json({ result: user, token });
}