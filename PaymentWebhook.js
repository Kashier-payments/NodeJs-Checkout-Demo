const express = require("express");
const { validateSignature } = require('./backend');
const bodyParser = require("body-parser");
const urlEncodedMid = bodyParser.urlencoded({ extended: true });

const config = require("./config");
const configObj = config[config.mode]; 




const path = require("path")
var router = express.Router()
router.use(express.static(path.join(__dirname, "kashier-files")));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/', (req, res) => {
    console.log('Got Headers:', req.headers);
    console.log('Got body:', req.body);
    if (req.body.signature) {
        if (validateSignature(req.body, configObj.iFrameSecret))
            res.send("success signature");
        else
            res.send("not matched signature")
    } else {
        res.send("success signature");
    }

});
// handle iframe callback POST METHOD
router.post("/formdata",[urlEncodedMid], function (req, res, next) {
    console.log(req);
    console.log(req.query);
/*

    if (req.body.signature) {
        if (validateSignature(req.body, configObj.iFrameSecret))
            res.send("success signature");
        else
            res.send("not matched signature")
    } else {
        res.send("success signature");
    }
    */
})

module.exports=router;