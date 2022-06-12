const jwt = require("jsonwebtoken");
// const adminModel = require("../models/adminModel");

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["tokenkey"];
        const secretKey = "recruiter"
        if (!token) return res.status(400).send({ status: false, msg: "login is required, Set a header" })

        let decodedtoken = jwt.verify(token, secretKey)
        if (!decodedtoken) return res.status(400).send({ status: false, msg: "token is invalid" })

        req.recruiterId = decodedtoken.recruiterId
        console.log(req.recruiterId)
        next();
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

module.exports = {
    authentication
}