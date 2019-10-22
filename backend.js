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
            console.log(hash);
        return hash;
    },
    validateSignature: function (query,secret) {
        let queryString = "";
        for (let key in query) {
            if (key == "signature" || key == "mode")
                continue;
            queryString = queryString + "&" + key + "=" + query[key];
        }
        let finalUrl = queryString.substr(1);
        const signature = crypto.createHmac('sha256', secret)
            .update(finalUrl)
            .digest('hex');
      
        if (signature == query.signature)
            return true;
        else
            return false;
    }
}