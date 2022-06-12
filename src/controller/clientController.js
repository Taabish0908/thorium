const clientModel = require('../models/clientModel')
const jwt = require('jsonwebtoken')


//=============================================================================================================//

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}



//=============================================================================================================//


const createClient = async function(req,res){
    try {
        let data = req.body
        const savedData = await clientModel.create(data)
        return res.status(201).send({ status: true, userData: savedData })
        
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })
        
    }
}
module.exports.createClient=createClient



//==============================================================================================================//


const loginClient = async function(req,res){
    try {
        let data = req.body
        if (!isValid(data.email)) {
            return res.status(401).send({ status: false, ERROR: "please input valid emailId" })
        }

        if (!isValid(data.password)) {
            return res.status(401).send({ status: false, ERROR: "please input valid password" })
        }
        const client = await clientModel.findOne({ email: data.email, password: data.password })
        if (!client) {
            return res.status(404).send({ status: false, ERROR: "User not  found" })
        }
        const clientID = client._id
        const payLoad = { clientId: clientID }
        const secretKey = "client"

        // creating JWT

        const token = jwt.sign(payLoad, secretKey, { expiresIn: "1hr" })

        res.header("tokenkey", token)

        res.status(200).send({ status: true, message: "login successful", data: token })
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })
        
    }
}
module.exports.loginClient=loginClient



//==============================================================================================================//


const getRecruiterByid = async function(req,res){
    try {
        // const data = req.body
        const id = req.params
        // const query = req.query
        const rec = await recruiterModel.findById(id)
        return res.status(200).send({status:true,userData:rec})
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message }) 
        
    }
}

module.exports.getRecruiterByid=getRecruiterByid



//==============================================================================================================//


const updateRecruiter = async function(req,res){
    try {
        let id = req.params
        let data = req.body
        let updatedata = await recruiterModel.findOneAndUpdate({_id:id},data,{new:true})
        return res.status(201).send({status:true,data:updatedata})
    } 
    catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })
        
    }
}
module.exports.updateRecruiter=updateRecruiter