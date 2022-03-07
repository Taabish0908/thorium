const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
    
    userID:{type:ObjectID, ref:"userdata"},

    productID:{type:ObjectID, ref:"product"},

    amount:Number,
    isFreeAppUser:{type:Boolean, },
    date: {type:Date, default:Date.now}
}, { timestamps: true });
    
module.exports = mongoose.model('order', orderSchema)
    
    // " best boook on earth"   [ "Nodejs in detail" , "mongodb in detail", "fronend in detail"] 
    // {
        // "ch1 ": "awesome intro to JS",
        // "ch2" : "intro to nodejs",
        // "ch3" : "intro to db"
    // //  }
    // summary :  mongoose.Schema.Types.Mixed,
    // isDeleted: Boolean //true on book deletion i.e you flag the document/data as isDeleted: true..(mark "dirty")




 //users
