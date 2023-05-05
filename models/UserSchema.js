import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Level:{
        type:Number,
        required:true
    },
    Points:{
        type:Number,
        required:true
    },
    Image:{
        type:String,
        // required:true
    },
    ZealId:{
        type:String,
        required:true
    },
    Phoneno:{
        type:String,
        required:true
    }
})

export default mongoose.model("User", userSchema);