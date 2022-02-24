const express = require('express');
const res = require('express/lib/response');
const router = express.Router();


// Write the api in first project directory (Routes/index.j)
// Problem Statement 1 : 
// NOTE: you must create the players array outside( on the top ) of the api
// ( so that data is maintained across api hits
// Your player collection should be an ARRAY of player objects. 
// Each player object should have the following attributes:
// Write a POST /players api that creates a new player ( that saves a player’s
// details and doesn’t allow saving the data of a player with a name that already exists in the data)
let players = [];

router.post('/players', function (req, res){
    
    let player = req.body;
    let playerName = player.name
    for(let i=0;i<players.length; i++){
        if(players[i].name == playerName){
           return res.send('Player already exists')
        }
    }
    players.push(player);
    console.log('Heres the player array',players);
    return res.send(players)
});

// Write an api that books a slot for a player with relevant details. 
// The api looks like POST /players/:playerName/bookings/:bookingId
// Ensure the below conditions:
// 1. PlayerName and bookingId are path params You have to ensure the playerName 
// received must exist in the players collection. If the playerName doesn’t exist 
// in the players collection return an error message that says something relevant 
// about player not being found. 
// 2. For a valid playerName check if the bookingId is already present in
//  the player’s booking. Again, for a repeated bookingId send an error message
//   conveying the booking was already processed. For a relevant bookingId(which is new), 
//   add the booking object from request body to bookings array. 
// NOTE: you must create the players array outside( on the top ) of the api( so that 
// data is maintained across api hits

router.post('/players/:playerName/booking/:bookingId', function(req, res){
    let name = req.params.playerName
    let isPlayerPresent = false
    for(let i = 0; i< players.length; i++){
        if(players[i].name == name){
            isPlayerPresent = true
        }
    }

    if(!isPlayerPresent){
        return res.send('player not present')
    }

    let booking = req.body
    let bookingId = req.params.bookingId
    for(let i =0; i < players.length; i++){
        if(players[i].name == name){
            for(let j =0; j < players[i].bookings.length; j++){
                if(players[i].bookings[j].bookingNumber == bookingId){
                    return res.send('Booking with this id is already present for the player')
                }
            }
            players[i].bookings.push(booking)
        }
    }

    res.send(players)
})







// router.get("/random" , function(req, res) {
//     res.send("hi there")
// })


// router.get("/test-api" , function(req, res) {
//     res.send("hi FunctionUp")
// })


// router.get("/test-api-2" , function(req, res) {
//     res.send("hi FunctionUp. This is another cool API")
// })


// router.get("/test-api-3" , function(req, res) {
//     res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
// })


// router.get("/test-api-4" , function(req, res) {
//     res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
// })



// router.get("/test-api-5" , function(req, res) {
//     res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
// })

// router.get("/test-api-6" , function(req, res) {
//     res.send({a:56, b: 45})
// })

// router.post("/test-post", function(req, res) {
//     res.send([ 23, 45 , 6])
// })


// router.post("/test-post-2", function(req, res) {
//     res.send(  { msg: "hi" , status: true }  )
// })

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})

module.exports = router;