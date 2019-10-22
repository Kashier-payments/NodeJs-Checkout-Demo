const express = require("express");
const server = express();
const { generateKashierOrderHash, validateSignature } = require('./backend');
const bodyParser = require("body-parser");
const urlEncodedMid = bodyParser.urlencoded({ extended: true });
const config = require("./config");
const configObj = config[config.mode]; 

server.set("view engine", "ejs");
server.set("views", "./views");

// handle iframe callback
server.get("/callback", [urlEncodedMid], function (req, res, next) {
    if (req.query.signature) {
        if (validateSignature(req.query, configObj.iFrameSecret))
            res.send("success");
        else
            res.send("not matched signature")
    } else {
        res.send("success");
    }
})

//render index.ejs
server.get("/", [], function (req, res, next) {
    let order = {
        amount: 20.00,
        currency: "EGP",
        merchantOrderId: Date.now(),
        mid: configObj.mid,
        secret: configObj.iFrameSecret,
        baseUrl: configObj.baseUrl,
    }

    // generate iframe hash
    order.hash = generateKashierOrderHash(order);
    order.secret = configObj.HPPSecret;

    // generate HPP hash  
    let phash = generateKashierOrderHash(order);
    console.log(phash);
    let callbackUrl = encodeURI('http://google.com');

    //Hosted payment page URL
    let hppUrl = `${configObj.baseUrl}/payment?mid=${order.mid}&orderId=${order.merchantOrderId}&amount=${order.amount}&currency=${order.currency}&hash=${phash}&merchantRedirect=${callbackUrl}`
    res.render('index', { order: order, hppUrl: hppUrl });
})

server.listen(9000, function () {
    console.log("server is running.....");
});