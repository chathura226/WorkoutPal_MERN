const Workout=require('../models/workoutModel')
const mongoose=require('mongoose')
//GET all workouts
const getWorkouts=async(req,res)=>{
    const user_id=req.user._id;
    const workouts=await Workout.find({user_id}).sort({createdAt:-1})//sort in descending order of date

    res.status(200).json(workouts)
}

//GET a single workout
const getAWrokout=async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){//check whether id is valid
        return res.status(404).json({error:'No such workout'})
    }
    const workout=await Workout.findById(id)
    if(!workout){//if no workout found
        return res.status(404).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}

//Create new workot
const createWorkout=async(req,res)=>{
    const{title,load,reps}=req.body

    let emptyFields=[]
    if(!title)emptyFields.push('title');
    if(!load)emptyFields.push('load')
    if(!reps)emptyFields.push('reps')
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the field',emptyFields})
    }
    //add to db
    try{
        const user_id=req.user._id;//the id is passed by the middle ware along the request
        const workout=await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//Delete a workout
const deleteWorkout=async(req,res)=>{
    const{id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout=await Workout.findByIdAndDelete({_id:id})
    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}

//Update a workout
const updateWorkout=async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout=await Workout.findByIdAndUpdate({_id:id},{...req.body})//... (threedots) is to spread open the object since we need inside data
    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}


module.exports={
    createWorkout,
    getWorkouts,
    getAWrokout,
    deleteWorkout,
    updateWorkout
}