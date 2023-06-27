const express=require('express')
const{
    createWorkout,
    getWorkouts,
    getAWrokout,
    deleteWorkout,
    updateWorkout
}=require('../controllers/workoutController')

const router=express.Router()

//get all workouts
router.get('/',getWorkouts)

//GET a single workout
router.get('/:id',getAWrokout)

//POST a new workout
router.post('/',createWorkout)

//DELETE a new workout
router.delete('/:id',deleteWorkout)

//UPDATE a workout
router.patch('/:id',updateWorkout)

module.exports=router