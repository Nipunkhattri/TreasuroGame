import QuestionModel from "../models/Question.js"
import UserModel from "../models/UserSchema.js"

export const Questiondisplay = async (req,res)=>{
    try {
        const {Username} = req.body;
    
        const user = await UserModel.findOne({Username});
        // // console.log(user)
    
        let level = user.Level;
    
        const Question =  await QuestionModel.findOne({level});
        // // console.log(Question)
    
        let Questiondata =  Question.Question;
        // // console.log(Questiondata);
    
        res.status(200).json({ Question });
    } catch (error) {
        console.log(error);
    }

}   

export const Answer = async (req,res) =>{
    try {
        const {Username,answer} = req.body;
    
        // console.log(answer);
        const user = await UserModel.findOne({Username});
        // console.log(user);
    
        let level = user.Level;
    
        const questiondata = await QuestionModel.findOne({level});
    
        const answerdata = questiondata.Answer;
    
        // console.log(answerdata);
        // console.log(answer);
    
        const answerst1 = answer.split(" ").join("");
        const answerst2 = answerdata.split(" ").join("");
    
        if(answerst1 != answerst2){
            return res.status(400).json({message:"Invalid Answer"});
        }   
        else{
            user.Level += 1; 
            user.Points += 100;
    
            await UserModel.updateMany(
                { Username: user.Username},
                { $set:{Level:user.Level,Points:user.Points}},
                // console.log('Document updated successfully');
            )
            // console.log(user)
        }
        res.status(200).json({message:"You Nailed It !!"})
        
    } catch (error) {
        console.log(error)
    }
}

export const leaderBoard = async (req,res) =>{
    try {
        
        let data = await UserModel.find().sort({Points : -1});
        
        // console.log(data);
        const sortedData = data.map(({ Username, Points }) => ({ Username, Points }));
        
        res.status(200).json({sortedData});
    } catch (error) {
        console.log(error);    
    }
}