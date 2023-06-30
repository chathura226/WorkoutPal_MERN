//importing user controllers
const { signupUser,loginUser } =require('../controllers/userController');

const express=require('express')
const router=express.Router();

//login route
router.post('/login',loginUser)



//signuo route
router.post('/signup',signupUser)



module.exports=router