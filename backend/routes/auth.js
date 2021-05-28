const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const{JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')



router.get('/protected',requireLogin,(req,res)=>{
    res.send('hello user')
})

router.post('/signup',(req,res)=>{
    const{ firstname ,lastname , email , password,cpassword } = req.body
    if(!email || !password || !firstname ||!lastname  ||!cpassword ){
        return res.status(422).json({error:"please add all the fields"})
    }
    // if (req.body.password !== req.body.confirmPassword) {
    //     var err = new Error('Passwords do not match.');
    //     err.status = 400;
    //     return next(err);
    // }
    
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that mail"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
        const user = new User({
            firstname,
            lastname,
            email,
            password:hashedpassword,
            cpassword

        })
        user.save()
        .then(user=>{
            res.json({message:"sucessfully posted"})
        })
        .catch(err=>{
            console.log(err);
        })
    })    

}) .catch(err=>{
    console.log(err);
})
})

router.post('/signin',(req,res)=>{
    const{email,password}  = req.body
    if(!email || !password){
        return res.status(422).json({error:"please add email and password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:'invalid email or password unsaved user'})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"successfully signed in "})
                 const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                 const{_id,firstname,lastname, email} = savedUser
                 res.json({token,user:{_id,firstname,lastname,email}})
            }
            else{
                return res.status(422).json({error:'invalid email or password'})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})


module.exports = router