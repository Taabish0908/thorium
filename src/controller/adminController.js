const adminModel = require('../models/adminModel');
const recruiterModel = require('../models/recruiterModel')
const clientModel =require('../models/clientModel')
const jwt = require('jsonwebtoken');


//=============================================================================================================//

// VALIDATION FUNCTION
const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

//===============================================================================================================//



const createAdmin = async function(req,res){

    try {
        let data = req.body
        const savedData = await adminModel.create(data)
        return res.status(201).send({ status: true, userData: savedData })
        
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })
        
    }
}


//==================================================================================================================//



const loginAdmin = async function(req,res){
    try {
        let data = req.body
        if (!isValid(data.email)) {
            return res.status(401).send({ status: false, ERROR: "please input valid emailId" })
        }

        if (!isValid(data.password)) {
            return res.status(401).send({ status: false, ERROR: "please input valid password" })
        }
        const admin = await adminModel.findOne({ email: data.email, password: data.password })
        if (!admin) {
            return res.status(404).send({ status: false, ERROR: "User not  found" })
        }
        const adminID = admin._id
        const payLoad = { adminId: adminID }
        const secretKey = "admin"

        // creating JWT

        const token = jwt.sign(payLoad, secretKey, { expiresIn: "1hr" })

        res.header("tokenkey", token)

        res.status(200).send({ status: true, message: "login successful", data: token })
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })
        
    }
}

//==============================================================================================================//



const getadmin = async function(req,res){
    try {
        // const data = req.body
        const id = req.query.id
        if(req.adminId !=id){
            return res.status(403).send({status:false,message:'you are not authorize'})
        }
        // const query = req.query
        const rec = await adminModel.find()
        return res.status(200).send({status:true,userData:rec})
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message }) 
        
    }
}


//===========================================================================================================//



const updateAdmin = async function(req,res){
    try {
        const id = req.query.id
        if(req.adminId !=id){
            return res.status(403).send({status:false,message:'you are not authorize'})
        }
    
        let data = req.body
        let updatedata = await adminModel.findOneAndUpdate({_id:id},data,{new:true})
        return res.status(201).send({status:true,data:updatedata})
    } 
    catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })
        
    }
}



//=============================================================================================================//




const createRecruiter = async function(req,res){
    try {
        let data = req.body
        const id= req.query.id
        if(req.adminId !=id){
            return res.status(403).send({status:false,message:'you are not authorize'})
        }
        const savedData = await recruiterModel.create(data)
        return res.status(201).send({ status: true, userData: savedData })
        
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })    
    }
}



//==============================================================================================================//



const getRecruiter = async function(req,res){
    try {
        
        const id= req.query.id
        if(req.adminId !=id){
            return res.status(403).send({status:false,message:'you are not authorize'})
        }
        const query = req.query
        const rec = await recruiterModel.find(query)
        return res.status(200).send({status:true,userData:rec})
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message }) 
        
    }
}


//=====================================================================================================================

const getClient = async function(req,res){
    try {
        
        const id= req.query.id
        if(req.adminId !=id){
            return res.status(403).send({status:false,message:'you are not authorize'})
        }
        const query = req.query
        const rec = await clientModel.find(query)
        return res.status(200).send({status:true,userData:rec})
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message }) 
        
    }
}


//========================================================================================================//

module.exports.createAdmin=createAdmin
module.exports.loginAdmin=loginAdmin
module.exports.getadmin=getadmin
module.exports.updateAdmin=updateAdmin
module.exports.createRecruiter=createRecruiter
module.exports.getClient=getClient
module.exports.getRecruiter=getRecruiter



