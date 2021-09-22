const express = require('express');
const server = express();
const { generateKashierOrderHash, validateSignature } = require('./backend');
const bodyParser = require('body-parser');
const path = require('path');

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static(path.join(__dirname, 'kashier-files')));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/callback', require('./callBacks'));
server.use('/PaymentWebhook', require('./PaymentWebhook'));

//Order Configuration and index.js rendering.
server.get('/', [], function (req, res, next) {
  //Import merchant configuration
  const config = require('./config');
  const configObj = config[config.mode];

  //Create your Order
  let order = {
    amount: '600.00',
    // Add following option to specific order currency (ISO: "EGP", "USD", "GBP" "EUR")
    currency: 'EGP',
    // Unique order using as reference between merchant and kashier
    merchantOrderId: Date.now(),
    // Your Kashier Merchant ID 'MID-XXX-XX'
    mid: configObj.mid,
    // How to obtain your Payment API key
    // Navigate to Integrate now page
    // Click on Generate for Customizable form service
    secret: configObj.PaymentApiKey,
    // your website baseUrl, www.yourwebsite.com
    baseUrl: configObj.baseUrl,
    //order meta data JSON String
    metaData: JSON.stringify({
      'Product Name': 'Type Cable',
      'Product Description': 'Warranty 2 years.',
    }),
    //Add merchantRedirect, to redirect to it after making payment.
    merchantRedirect: 'http://localhost:9000/callback',
    //Add display, to choose what the display language do you want ar for arabic and en for english.
    display: 'ar',
    //Add failureRedirect, to choose to redirect after first payment failiure or not.
    //, failureRedirect: 'false || true'
    failureRedirect: 'true',
    //Add redirectMethod the callback redirection method after payment, using get or post formdata redirection
    //, redirectMethod: 'post || get'
    redirectMethod: 'get',
    //Add the following options separated by comma remove or leave empty for all allowed methods.
    //,allowedMethods:"card,wallet,bank_installments"
    allowedMethods: 'bank_installments,card',
    // Add the following your brand color by passing hexadecimal color as brandColor= encodeURIComponent("#0"),
    // Also you can set opacity by setting rgba as brandColor= encodeURIComponent("rgba(255, 0, 0, 0.3)")
    // By default the branding color is rgba(45, 164, 78, 0.9)
    brandColor: 'rgba(255, 0, 0, 0.3)',
  };

  //Generate Order Hash
  order.hash = generateKashierOrderHash(order);

  //Formulate Hosted payment page URL
  let hppUrl =
    `${configObj.baseUrl}?` +
    `merchantId=${order.mid}` +
    `&orderId=${order.merchantOrderId}` +
    `&amount=${order.amount}` +
    `&currency=${order.currency}` +
    `&hash=${order.hash}` +
    `&merchantRedirect=${order.merchantRedirect}` +
    `&metaData=${order.metaData ? order.metaData : ''}` +
    `&allowedMethods=${order.allowedMethods ? order.allowedMethods : ''}` +
    `&failureRedirect=${order.failureRedirect ? order.failureRedirect : ''}` +
    `&redirectMethod=${order.redirectMethod ? order.redirectMethod : ''}` +
    `&display=${order.display ? order.display : ''}` +
    `&brandColor=${encodeURIComponent(order.brandColor)}` +
    `&mode=${configObj.mode}`;

  res.render('index', {
    order: order,
    hppUrl: hppUrl,
    configObj: {
      mode: configObj.mode,
      baseUrl: configObj.baseUrl,
    },
  });
});

server.listen(9000, function () {
  console.log('server is running.....');
});
