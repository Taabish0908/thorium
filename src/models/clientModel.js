const mongoose = require('mongoose')
const clientSchema = new mongoose.Schema({
    fname:{
        type:String,
        requied:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
},
    
{timestamps:true});


module.exports = mongoose.model('client',clientSchema)