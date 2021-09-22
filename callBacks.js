const express = require("express");
const { validateSignature } = require('./backend');
const bodyParser = require("body-parser");
const urlEncodedMid = bodyParser.urlencoded({ extended: true });

const config = require("./config");
const configObj = config[config.mode]; 

var router = express.Router()



router.get("/", [urlEncodedMid], function (req, res, next) {
    console.log(req.query)
    if (req.query.signature) {
        if (validateSignature(req.query, configObj.PaymentApiKey))
            res.send("success signature");
        else
            res.send("not matched signature")
    } else {
        res.send("success signature");
    }
})

router.post("/",  function (req, res, next) {
    console.log(req.body);
    if (req.body.signature) {
        if (validateSignature(req.body, configObj.PaymentApiKey))
            res.send("success signature");
        else
            res.send("not matched signature")
    } else {
        res.send("success signature");
    }
})

module.exports=router;