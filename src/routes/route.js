const express = require('express');

const router = express.Router();


const userController = require("../controller/userController")
const bookController = require("../controller/bookController")
const reviewController = require("../controller/reviewController")
const authController = require("../middleWare/auth.js")


// .....AWS Api ......................................
const aws = require("aws-sdk")
aws.config.update(
    {
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",
        secretAccessKey: "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",
        region: "ap-south-1"
    }
)

let uploadFile = async (file) => {
    return new Promise( function(resolve, reject) {
        //this function will upload file to aws and return the link
        let s3 = new aws.S3({ apiVersion: "2006-03-01" }) //we will be using s3 service of aws
        //  uploadFile(file[0])
        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket", // HERE
            Key: "Taabish/" + file.originalname, // HERE "Taabish/fileName
            Body: file.buffer
        }

      s3.upload(uploadParams, function (err, data) {
            if (err) { 
                return reject({ "error": err }) 
            }

            console.log(data)
            console.log(" file uploaded succesfully ")
            return resolve(data.Location) // HERE
          }
        )

    // let data= await s3.upload(uploadParams)
    // if (data) return data.Location
    // else return "there is an error"

    }
    )
}

router.post("/write-file-aws", async function (req, res) {
    try {
        let files = req.files
        if (files && files.length > 0) {
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL = await uploadFile(files[0])
            res.status(201).send({ msg: "file uploaded succesfully", data: uploadedFileURL })
        }
        else {
            res.status(400).send({ msg: "No file found" })
        }
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
}
)

// ...................User Api..................

router.post("/register", userController.createUser)

router.post("/login",userController.userLogin )

// ...................Book Api..............................

router.post("/books",authController.authenticate,bookController.createBook)

router.get("/books",authController.authenticate,bookController.getBook)

router.get("/books/:bookId",authController.authenticate, bookController.bookById)

router.put("/books/:bookId",authController.authenticate,authController.authorise,bookController.updateBook)

router.delete("/books/:bookId",authController.authenticate,authController.authorise,bookController.deleteBookById)


//.............................review api.....................................

router.post("/books/:bookId/review", reviewController.createReview )

router.put("/books/:bookId/review/:reviewId", reviewController.updateReview )

router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)

module.exports = router;
//adding this comment for nothing