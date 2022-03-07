const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: String,
    balance:{type:Number, required: 100},
    address: String,
    age:Number,
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    isFreeAppUser:false,
    
}, { timestamps: true });

module.exports = mongoose.model('Userdata', userSchema) //users



// String, Number
// Boolean, Object/json, array