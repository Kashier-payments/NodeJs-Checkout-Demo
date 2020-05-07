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

### Successfully Paid Order
    response.status = "CAPTURED"
    
#### Transaction detail
    response.transactions[].status = "SUCCESS" && response.transactions[].operation = "pay"
  
### Failed Order
    response.status = "FAILED"
    
#### Transaction detail
    response.transactions[].status = "FAILURE" && response.transactions[].operation = "pay"


