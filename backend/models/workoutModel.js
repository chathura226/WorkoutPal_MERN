//this doc contains how workout document should look

const mongoose=require('mongoose')
const Schema=mongoose.Schema

//how workout document looks
const workoutSchema=new Schema({
    title:{
        type: String,
        required:true
    },
    reps:{
        type: Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{//this is the second argument
    timestamps:true//automatically add created/updated time
})

module.exports=mongoose.model('Workout',workoutSchema)
