const { count } = require("console")
const authorModel = require("../models/authorModel.js")
const bookModel= require("../models/bookModel.js")
const publisherModel= require("../models/publisherModel.js")
const mongoose = require("mongoose");


const createBook= async function (req, res) {
    let book = req.body
    let authorId = req.body.author_id
    let publisherId = req.body.publisher_id

    
    if(!authorId){
        return res.send('Author id needs to be present in the request body')
    }

    let author_id = await authorModel.findById(authorId)
    if(!author_id){
        return res.send('No author is present with the given id')
    }
    
    if(!publisherId){
        return res.send('publisher id needs to be present in the request body')
    }

    let publisher_id = await publisherModel.findById(publisherId)
    if(!publisher_id){
        return res.send('No publisher is present with the given id')
    }
    let bookCreated = await bookModel.create(book)
    return res.send({data: bookCreated})
};
        
    // const authorDetails = await authorModel.findById(authorId)
    // const publisherDetails = await publisherModel.findById(publisherId)

    

const getBooksWithAuthor = async function (req, res) {
    let allBooks = await bookModel.find().populate('author_id publisher_id');
    res.send({data: allBooks});
}

const changeValueOfPublication = async function(req,res) {
    let specifiedBook = await bookModel.find().populate('author1 publisher1')
    res.send({data : specifiedBook})
}

const hardCover = async function(req,res) {
    let publisherId = await publisherModel.find({nameOfPublication: {$in: ["penguine", "HarperCollins"]}})
    let match = []

    for(let i=0; i<publisherId.length; i++)
    match.push(publisherId[i]._id)

    let books = await bookModel.updateMany(

        {publisher : {$in:match}},
        {$set: req.body},
        {$new: true}
    )

    res.send({data : books})
}


const ratings = async function (req, res) {
    let ratings = await authorModel.find({ rating: { $gt: 3.5 } })
    let match = []
    for (let i = 0; i < ratings.length; i++)
        match.push(ratings[i]._id)
    let newbooks = await bookModel.updateMany(
        { author: { $in: match } },
        { $inc: req.body },
        { $new: true }
    )
    let bookee = await bookModel.find({ author: { $in: match } })

    res.send({ data: bookee })
}


module.exports.createBook= createBook
module.exports.getBooksWithAuthor = getBooksWithAuthor

module.exports.changeValueOfPublication = changeValueOfPublication

module.exports.hardCover = hardCover

module.exports.ratings = ratings