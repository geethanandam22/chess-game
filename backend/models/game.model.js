const mongoose = require("mongoose");
const  gameSchema = mongoose.Schema(
    {
        roomCode:{type:String,require:true},
        whiteId :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        blackId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        result :{type:String, enum:["white","black","draw"],required:true},
        resaon:{
            type:String,
            enum:["checkmate","draw","timeout","resign","other"],
            required:true,
        },
        statedAt:{type:Date,default:Date.now()},
        endedAt:{type:Date,default:null},
        duration:{type:Number,default:0},
    },
    {timestamps:true},
 
);
const Game =mongoose.model("Game",gameSchema);
module.exports={Game};
