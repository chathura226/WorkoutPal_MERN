const express=require('express')
const{
    createWorkout,
    getWorkouts,
    getAWrokout,
    deleteWorkout,
    updateWorkout
}=require('../controllers/workoutController')

const requireAuth=require('../middleware/requireAuth')//importing middleware
const router=express.Router()

//require authenticating user
router.use(requireAuth); //fire the middleware function before firing below things


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