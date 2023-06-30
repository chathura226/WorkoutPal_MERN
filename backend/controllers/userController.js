//importing user model schema
const User=require('../models/userModel')
//importing jason web token
const jwt=require('jsonwebtoken')
//login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.login(email,password);
        
        //create token when login is successful
        const token=createToken(user._id);
        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//create jwt token
const createToken=(_id)=>{
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'3d'});//3 arguments: {payload},SECRET string,{options}
}

//signup user
const signupUser=async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.signup(email,password);
        //create token
        const token=createToken(user._id);

        res.status(200).json({email,token})

    } catch (error){
        res.status(400).json({error:error.message})
        // res.json({mssg:'signup user'})
    }
    
}

module.exports= {signupUser,loginUser}