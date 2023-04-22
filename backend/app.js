const dotenv = require('dotenv');
// const mongoose = require('mongoose');  -->> This code has been transferred to conn.js
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our router easy 
app.use(require('./router/auth'));


// const DB = process.env.DATABASE;     -->> This code has been transferred to conn.js
const PORT = process.env.PORT;

// -->> This full mongoose.connect code has been transferred to conn.js

// mongoose.connect(DB,{
//     // Inorder to remove the deprecation error
//     useNewUrlParser:true,
//     // useCreateIndex:true,
//     useUnifiedTopology:true,
//     // useFindAndModify:false
// }).then(()=>{
//     console.log(`connection successful`);
// }).catch((err)=>console.log(err));

//MiddleWare

// const middleware = (req,res,next) =>{
//     console.log(`Hello my Middleware`);
//     next();
// }

// middleware();


// app.get('/', (req,res)=>{
//     res.send(`Hello from the server`);
// });

// app.get('/about',(req,res)=>{
//     console.log("Hello my about");
//     res.send("Hello About world from the server");
// });

// app.get('/contact', (req,res)=>{
//     res.send("Hello Contact world from the server");
// });

// app.get('/signin', (req,res)=>{
//     res.send("Hello Login World from the server");
// });

// app.get('/signup', (req,res)=>{
//     res.send("Hello Registration world from the server");
// });

app.listen(PORT,()=>{
    console.log(`The server is running at port no. ${PORT}`);
})