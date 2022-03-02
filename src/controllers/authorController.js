const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    let authorCreated = await AuthorModel.create(req.body)
    res.send({data: authorCreated})
}

const getAuthorsData= async function (req, res) {
    let listofAuthors = await AuthorModel.find()
    res.send({data: listofAuthors})
}

module.exports.createAuthor= createAuthor
module.exports.getAuthorsData= getAuthorsData