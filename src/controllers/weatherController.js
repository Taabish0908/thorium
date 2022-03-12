const axios = require('axios')

let getWeather = async function(req,res){
    try{
        let city = req.query.q
        let key = req.query.appid
        console.log(`queryparams are:${city} ${key}`)
        let options = {
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({status:true, msg: result.data})
   
    }

    catch (error){
        console.log(error)
        res.status(500).send({error: error.message})
    }
}

let tempOfLondon = async function(req,res){
    try{
        let city = "London"
        let key = req.query.appid
        if(key){
        let options = {
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
        }
        let result = await axios(options)
        res.status(200).send({status:true, msg: result.data.main.temp})
    }else{
        res.status(400).send({status: false, msg: "Please provide valid  key"})
    }

    }catch (error){
        res.status(500).send({error: error.message})
    }
}


let getCities = async function (req, res) {
    try {
        let cities = ["Bangalore", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let appid = req.query.appid
        let arrays = []
        for (i = 0; i < cities.length; i++) {
            let sort = { city: cities[i] }
            
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=${appid}`
            }
            let result = await axios(options)
            sort.temp = result.data.main.temp
            arrays.push(sort)
        }
        let citiesTemp= arrays.sort(function (a, b) { return (a.temp - b.temp) })
             res.status(200).send({status:true, data: citiesTemp})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}
module.exports.getWeather = getWeather
module.exports.tempOfLondon = tempOfLondon
module.exports.getCities = getCities