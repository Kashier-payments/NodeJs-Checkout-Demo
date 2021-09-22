const crypto = require("crypto");

module.exports = {
    generateKashierOrderHash: function (order) {
        const mid = order.mid; //your merchant id
        const amount = order.amount; //eg: 22.00
        const currency = order.currency; //eg: "EGP"
        const orderId = order.merchantOrderId; //eg: 99
        const secret = order.secret;
        const path = `/?payment=${mid}.${orderId}.${amount}.${currency}`;
        console.log(path);

        const hash = crypto.createHmac('sha256', secret)
            .update(path)
            .digest('hex');
             return hash;
    },
    validateSignature: function (query,secret) {
   let queryString = 
   "&paymentStatus="+query["paymentStatus"]+
   "&cardDataToken="+query["cardDataToken"]+
   "&maskedCard="+query["maskedCard"]+
   "&merchantOrderId="+query["merchantOrderId"]+
   "&orderId="+query["orderId"]+
   "&cardBrand="+query["cardBrand"]+
   "&orderReference="+query["orderReference"]+
   "&transactionId="+query["transactionId"]+
   "&amount="+query["amount"]+
   "&currency="+query["currency"];
   
        let finalUrl = queryString.substr(1);
        const signature = crypto.createHmac('sha256', secret)
            .update(finalUrl)
            .digest('hex');
      
        if (signature == query.signature){
            console.log("Success Signature")
            return true;
        }else{
            console.log("Failed Signature !!")
            return false;
        }
           
    }
}