const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const authenticate = require("../middleware/authenticate");
require('../db/conn');
const User = require("../model/userSchema");


router.get('/', (req,res)=>{
    res.send(`Hello from the server`);
});

// Using promises

// router.post('/register',(req,res)=>{

//     const{name,email,phone,work,password,cpassword} = req.body;

//     // we basically want that user should not leave any field unfilled
//     if (!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"Plz fill the fields properly"});
//     }

//     User.findOne({email:email})
//        .then((userExist)=>{
//             if(userExist){
//                return res.status(422).json({error:"Email already Exist"});
//            }

//            const user = new User({name, email, phone, work, password, cpassword});

//            user.save().then(()=>{
//                res.status(201).json({message: "user registered successfully"});
//            }).catch((err)=> res.status(500).json({error:"Failed to registration"}));

//     }).catch(err =>{console.log(err);});
// });


// Using Asyn-await function

router.post('/register', async (req,res)=>{

    const{name,email,phone,work,password,cpassword} = req.body;

    // we basically want that user should not leave any field unfilled
    if (!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"Plz fill the fields properly"});
    }

    try{

        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(422).json({error:"Email already Exist"});
        }
        else if(password!=cpassword)
        {
            return res.status(422).json({error:"Passwords are not matching"});
        }
        else{
            const user = new User({name, email, phone, work, password, cpassword});
        
            // before saving the data in database we have to hash our passwords
    
            await user.save();
            res.status(201).json({message: "user registered successfully"});    
        }
    }
    catch(err){
        console.log(err);
    }
});


//login Route Code

router.post('/login', async (req,res)=>{
    //  console.log(req.body);
    //  res.json({messamge: "awesome"});

    try{
        let token;
        const{email,password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({error: "plz Fill the data"});
        }

        // want to read the data of database
        // with {email:email} we are checking that the email that we are getting from database is same as entered by the user or not
        const userLogin = await User.findOne({email:email});
        
        // console.log(userLogin);

        if(userLogin)
        {
            const isMatch = await bcrypt.compare(password,userLogin.password);
            
            // JWT Authentication
            token = await userLogin.generateAuthToken();
            console.log(token);
            // only one line here for authenticate

            res.cookie("jwtoken", token,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });
            
            if(!isMatch)
            {
                res.status(400).json({error:"Invalid Credentials"});
            }
            else{
                res.json({message:"User Signin Successfully"});
            }
        }
        else{
            res.status(400).json({error:"Invalid Credentials"});
        }
    }
    catch(err){
        console.log(err);
    }
})


//about Us ka page

router.get('/about', authenticate ,(req,res)=>{
    console.log("Hello my about");
    res.send("Hello About world from the server");
});


router.post('/contact', authenticate, async (req,res)=>{
    try{
        const {name,email,message} = req.body;

        if(!name || !email || !message)
        {
            console.log("Error in Contact form");
            return res.json({error: "Plz fill the contact form"});
        }

        const userContact = await User.findOne({_id: req.userID});

        if(userContact){
            const userMessage = await userContact.addMessage(name,email,message);

            await userContact.save();

            res.status(201).json({message: "User contact Successfully"});
        }
    }
    catch(err){
        console.log(err);
    }
});

//logout ka page

router.get('/logout', authenticate,(req,res) =>{
    console.log("This is my Logout Page");
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("User Logout");
})

module.exports = router;