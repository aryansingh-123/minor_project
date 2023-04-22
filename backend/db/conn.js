const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    // Inorder to remove the deprecation error
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>console.log(err));