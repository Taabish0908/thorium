const obj = require('./helper')
const express = require('express');
const app = express();
const router = express.Router();


router.get('/test-me', function (req, res) {
    let date_ob = new Date();
    obj.printMessage('Call Welcome')
    console.log(obj.endpoint)
    res.send('Welcome to my application. i am Taabish Masood Anwar and a part of FunctionUp Thorium cohort')
});

module.exports = router;