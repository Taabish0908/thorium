const mongoose = require('mongoose')
const recruiterSchema = new mongoose.Schema({
    fname:{
        type:String,
        requied:true,
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
},
    
{timestamps:true});


module.exports = mongoose.model('recruiter',recruiterSchema)