# NodeJs-Checkout-Demo
Create and pay orders through IFrame and Hosted Payment Page in Nodejs.

## Mode setup and Api keys
### Mode

## Order Parameters
### Merchant ID
### Merchant Order ID 
### Amount
### Currency 
### Hash

## Hosted payment page 
### Payment url structure

## IFrame
### Event Listener

## Setting up callback

## fetching callback



## Signature validation

## API Authentication 
### Secret Keys
### JWT

Authenticate using

    POST https://test-api.kashier.io/authenticate
    BODY  {
          "userType": "merchant",
          "password": "Your Password",
          "email": "Your EMail"
          }
Authentication Response 

    {
         "response": {
         "accessToken":"access_token",
         "refreshToken":"refresh_token",
         "currentMerchantPayformanceId": "merchant_id"
         },
         
         "messages": {
           "en": "You have logged in successfully",
           "ar": "(Needs translation) You have logged in successfully"
          },
          
    "status": "SUCCESS"
    
    }
    
Future Authorized Requests should have the following header keys

    authmerchantid: merchant_id
    authorization: access_token
    
## Get Order API

Get Order by your Merchant Order id

    GET https://test-api.kashier.io/payments/orders/${yourMerchantOrderID}

Response 

    {
    "response": {
        "merchantId": "MID-41-571",
        "merchantOrderId": "5eb0e0e0b380b80048806a42",
        "totalRefundedAmount": 0,
        "totalCapturedAmount": 8889,
        "totalAuthorizedAmount": "8889.00",
        "method": "card",
        "sourceOfFunds": {
            "cardInfo": {
                "maskedCard": "511111******1118",
                "cardBrand": "Mastercard",
                "expiryYear": "22",
                "expiryMonth": "05",
            }
        },
        "transactions": [
            {
                "currency": "EGP",
                "amount": 8889,
                "status": "FAILURE",
                "transactionId": "TX-4157188",
                "operation": "pay",
                "requestDate": "2020-05-06T22:31:09.876Z",
                "responseDate": "2020-05-06T22:31:10.829Z"
            }
        ],
        "status": "FAILED",
        "lastModifiedDate": "2020-05-06T22:31:09.874Z",
        "date": "2020-05-06T22:31:08.297Z",
        "order": {
            "amount": "8889.00",
            "currency": "EGP"
        }
     },
        "status": "SUCCESS"
    }
    
Successfully Paid Order

    response.status = "CAPTURED"
    
Fetch Paid Transaction

    response.transactions[].status = "SUCCESS" && response.transactions[].operation = "pay"
  
Failed Order

    response.status = "FAILED"
    
Fetch Failed Transaction

    response.transactions[].status = "FAILURE" && response.transactions[].operation = "pay"


