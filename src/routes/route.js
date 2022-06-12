const express=require('express')
const router = express.Router();


//===============================================================================================================//

const adminController = require('../controller/adminController')
const recruiterCOntroller = require('../controller/recruitercontroller')
const clientController = require('../controller/clientController')

const adminAuth = require('../middleware/adminMiddleware')
const recruiterAuth = require('../middleware/recruiterMiddleware')
// const clientAuth = require('../middleware/clientMiddleware')


//=============================================================================================================//



//ADMIN API
router.post("/register-admin", adminController.createAdmin)
router.post("/login-admin", adminController.loginAdmin)
router.get('/get-admin',adminAuth.authentication,adminController.getadmin)
router.put('/update-admin',adminAuth.authentication,adminController.updateAdmin)
router.get('/get-recruiter',adminAuth.authentication,adminController.getRecruiter)
router.get('/get-client',adminAuth.authentication,adminController.getClient)
//RECRUITER API
router.post("/create-rec",adminAuth.authentication,adminController.createRecruiter)
router.post('/login-recruiter',recruiterCOntroller.loginRecruiter)
router.put('/recruiter/:_id', recruiterAuth.authentication,recruiterCOntroller.updateRecruiter)
router.get('/get-recruiter/:_id',recruiterAuth.authentication,recruiterCOntroller.getRecruiterByid)
//CLIENT API
router.post('/create-client',clientController.createClient)
router.post('/login-client',clientController.loginClient)



module.exports = router;