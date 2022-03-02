const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author_id: {
        type: ObjectId,
        ref: "newAuthor"
    },
    
    publisher_id:{
        type: ObjectId,
        ref: "newPubisher"
    },
    name:String,
    price: Number,
    ratings: Number


}, 
{ timestamps: true });


module.exports = mongoose.model('newBook', bookSchema)
