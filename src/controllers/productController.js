const ProductModel= require("../models/productModel")

const createProduct= async function (req, res) {
    let data= req.body
    let savedData= await ProductModel.create(data)
    console.log(req.newAtribute)
    res.send({msg: savedData})
}

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     console.log(req.newAtribute)
//     res.send({msg: allUsers})
// }

module.exports.createProduct= createProduct
// module.exports.getUsersData= getUsersData