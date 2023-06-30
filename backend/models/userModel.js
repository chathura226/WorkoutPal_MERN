const mongoose=require('mongoose')
const bcrypt = require('bcrypt')//for hashing
const validator=require('validator')//to validate mails and passwords
const schema=mongoose.Schema

const userSchema=new schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//making a static signup method
userSchema.statics.signup= async function(email,password){

    //validation
    if(!email||!password){
        throw Error("All fields must be filled!");
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid!')
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough!");
    }

    const exists=await this.findOne({email})
    
    if(exists){
        throw Error('Email already in use!');
    }

    //salt is a random string added to the password before hashing
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt)

    const user=await this.create({email:email,password:hash});

    return user

}

//making a static login method
userSchema.statics.login=async function(email,password){
    //validation
    if(!email || !password){
        throw Error("All fields must be filled!");
    }
    
    
    const user=await this.findOne({email});
    if(!user){
        throw Error("Incorrect email address!")
    }

    const match=await bcrypt.compare(password,user.password);//comparing the plain given password with hashed one in the database 
    if(!match){
        throw Error("Incorrect password!")
    }

    return user;

}



module.exports=mongoose.model('User',userSchema)