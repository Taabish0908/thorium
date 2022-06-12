const recruiterModel = require('../models/recruiterModel')
const jwt = require('jsonwebtoken');


//=============================================================================================================//

//VALIDATION

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

//============================================================================================================//



const loginRecruiter = async function(req,res){
    try {
        let data = req.body
        if (!isValid(data.email)) {
            return res.status(401).send({ status: false, ERROR: "please input valid emailId" })
        }

        if (!isValid(data.password)) {
            return res.status(401).send({ status: false, ERROR: "please input valid password" })
        }
        const recruiter = await recruiterModel.findOne({ email: data.email, password: data.password })
        if (!recruiter) {
            return res.status(404).send({ status: false, ERROR: "User not  found" })
        }
        const recruiterID = recruiter._id
        const payLoad = { recruiterId: recruiterID }
        const secretKey = "recruiter"

        // creating JWT

        const token2 = jwt.sign(payLoad, secretKey, { expiresIn: "1hr" })

        res.header("tokenkey", token2)

        res.status(200).send({ status: true, message: "login successful", data: token2 })
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })
        
    }
}
module.exports.loginRecruiter=loginRecruiter



//=============================================================================================================//



const getRecruiterByid = async function(req,res){
    try {
        // const data = req.body
        const id = req.params._id
        console.log(id)
        if(req.recruiterId !=id){
            return res.status(403).send({status:false,message:'you are not authorize'})
        }
        
        // const query = req.query
        const rec = await recruiterModel.findById(id)
        return res.status(200).send({status:true,userData:rec})
    } catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message }) 
        
    }
}

module.exports.getRecruiterByid=getRecruiterByid


//============================================================================================================//


const updateRecruiter = async function(req,res){
    try {
        const id = req.params._id
        console.log(id)
        if(req.recruiterId !=id){
            return res.status(403).send({status:false,message:'you are not authorize'})
        }
        let data = req.body
        let updatedata = await recruiterModel.findOneAndUpdate({_id:id},data,{new:true})
        return res.status(201).send({status:true,data:updatedata})
    } 
    catch (error) {
        return res.status(500).send({ Status: false, ERROR: error.message })
        
    }
}
module.exports.updateRecruiter=updateRecruiter

