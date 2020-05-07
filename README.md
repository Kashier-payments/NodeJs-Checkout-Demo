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

## fetch order
    GET https://test-api.kashier.io/payments/orders/${yourMerchantOrderID}
    {
    "response": {
        "_id": "5eb33aaceef9a8002b6d39f5",
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

### Successfully Paid Order
    response.status = "CAPTURED"
    
#### Transaction detail
    response.transactions[].status = "SUCCESS" && response.transactions[].operation = "pay"
  
### Failed Order
    response.status = "FAILED"
    
#### Transaction detail
    response.transactions[].status = "FAILURE" && response.transactions[].operation = "pay"


