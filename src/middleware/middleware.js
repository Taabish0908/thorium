
const middle = function (req, res, next) 
{    let freeUser = req.headers["isfreeappuser"]
console.log(freeUser)
     if (freeUser) {
        next()
    } else { 
        res.send("error request is missing a header")
    }

}

module.exports.middle = middle