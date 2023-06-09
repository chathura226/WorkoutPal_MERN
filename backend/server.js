require('dotenv').config()
const express=require('express')
const workoutRoutes=require('./routes/workouts')
//import mongoose
const mongoose=require('mongoose')
//express app
const app=express()

//middleware (what to happen between req and response)
app.use(express.json())//for any req body is passes and attached to req obj body
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//route
app.use('/api/workouts',workoutRoutes) //fire these routes when comes to specific path in first argument ('/api/workouts')

//connect to db and connecting to a db is asynchronous (take time)
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to db!")
        //listen to requests
        app.listen(process.env.PORT,()=>{
        console.log('listening on port',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })


