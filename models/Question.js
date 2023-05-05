import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    Question:{
        type:String,
        required:true
    },
    Answer:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        required:true
    }
})

export default mongoose.model("Question", QuestionSchema);