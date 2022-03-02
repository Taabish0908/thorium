const authorModel = require("../models/authorModel")
const publisherModel = require("../models/publisherModel")

const createPublisher = async function(req, res){
    let publisherCreated = await publisherModel.create(req.body)
    res.send({data : publisherCreated})
}

const getPublisherData = async function (req, res) {
    let listofpublishers = await publisherModel.find()
    res.send({data: listofpublishers})
}


module.exports.createPublisher = createPublisher
module.exports.getPublisherData = getPublisherData 