const obj = require('./logger')
const express = require('express');
const router = express.Router();

router.get('/test-me', function (req, res) {
    obj.printMessage('call Welocme')
    console.log(obj.endpoint)
    res.send('Welcome to my application. i am Taabish Masood Anwar and a part of FunctionUp Thorium cohort')
});

module.exports = router;