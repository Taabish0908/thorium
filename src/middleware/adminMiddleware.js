const jwt = require("jsonwebtoken");
// const adminModel = require("../models/adminModel");

const authentication = async function (req, res, next) {
    try {
        let token2 = req.headers["tokenkey"];
        const secretKey = "admin"
        if (!token2) return res.status(400).send({ status: false, msg: "login is required, Set a header" })

        let decodedtoken = jwt.verify(token2, secretKey)
        if (!decodedtoken) return res.status(400).send({ status: false, msg: "token is invalid" })

        req.adminId = decodedtoken.adminId
        console.log(req.adminId)
        next();
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

module.exports = {
    authentication
}