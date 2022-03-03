const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author_id: {
        type: ObjectId,
        ref: "newAuthor1"
    },
    
    publisher_id:{
        type: ObjectId,
        ref: "newPublisher1"
    },
    name:String,
    price: Number,
    ratings: Number,
    isHardCover:{
        type:Boolean,
        default:false
    }


}, 
{ timestamps: true });


module.exports = mongoose.model('newBook1', bookSchema)
