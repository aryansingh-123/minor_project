const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    cpassword: {
        type: String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    },
    messages:[
        {
            name:{
                type: String,
                required:true
            },
            email: {
                type: String,
                required:true
            },
            message: {
                type: String,
                required:true
            },
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


// We are going to hashing the password

userSchema.pre('save', async function(next) {
     if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
     }
    next();
})

// We are generating Auth Token
userSchema.methods.generateAuthToken = async function() {
    try{
        let mytoken = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:mytoken});
        await this.save();

        return token;
    }
    catch(err){
        console.log(err)
    }
}


// Stored the message

userSchema.methods.addMessage = async function(name,email,message){
    try{
       this.messages = this.messages.concat({name,email,message});
       await this.save();

       return this.messages;
    }
    catch(err){
        console.log(err);
    }
}
// This user become USers i.e. plural form in the database
//collection created
const User = mongoose.model('USER', userSchema);

 
module.exports = User; 