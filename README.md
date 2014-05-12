# A collection of methods to interact with the [Saasu REST API](http://help.saasu.com/api/)

---

## Create a new instance

You can have many different instances, each corresponds to a unique Saasu account.

```javascript
saasuAccount = new Saasu();
```

__Initialize Saasu key and file id__

```javascript
if ( Meteor.isServer ) {
    saasuAccount.init({
        accessKey: "YOUR_KEY"
        , fileId: "YOUR_FILEID"
    });
}
```

__Initialize inventory items and payment accounts UIDs__
```javascript
saasuAccount.init({
    inventoryItems: {
        "Item1": "UID_OF_ITEM"
        , "Item2": "UID_OF_ITEM"
    }
    , paymentAccounts: {
        "Account1": "UID_OF_ACCOUNT"
        "Account2": "UID_OF_ACCOUNT"
    }
});
```

After these values are initialized, you can conveniently retrieve them with
```javascript
saasuAccount.getInventoryItemUid[itemName]
saasuAccount.getPaymentAccountUid[accountName]
```

## Methods available on both client and server

* init
* getInventoryItemUid
* getPaymentAccountUid

## Methods available on server

* get
* post
* parseResponse

## Examples

__Get contact from contactID__

On server-side, you can call the method directly:

```javascript
var response = saasuAccount.get('contact', {contactID: 'C1-2345'});
console.log( saasuAccount.parseResponse(response) );
```

To receive the result on client-side, define a Meteor method and call it with a callback:

```javascript
Meteor.methods({
    'saasuGet': function(type, options) {
        var response = saasuAccount.get(type, options);
        return saasuAccount.parseResponse(response);
    }
});
```

```javascript
Meteor.call('saasuGet', 'contact', {contactID: 'C1-2345'}, function(err, res) {
    console.log( res );
});
```

__Insert new contact__
```javascript
saasuAccount.post('contact', {
    salutation: 'Mr'
    , givenName: 'Phuc'
    , familyName: 'Nguyen'
    , organisationName: 'UsefulIO'
    , contactID: 'C1-1234'
});
```

__Insert new item sale (single item)__
```javascript
saasuAccount.post('invoice', {
    transactionType: 'S'
    , date: '2014-04-19'
    , layout: 'I'
    , status: 'I'
    , purchaseOrderNumber: 'S1-1111'
    , summary: 'Test item sale'
    , invoiceItems: {
        itemInvoiceItem: {
            quantity: 1
            , inventoryItemUid: Saasu.getInventoryItemUid('Item1')
            , unitPriceInclTax: 150
        }
    }
});
```

__Insert new item sale (multiple items)__
```javascript
saasuAccount.post('invoice', {
    transactionType: 'S'
    , date: '2014-04-19'
    , layout: 'I'
    , status: 'I'
    , purchaseOrderNumber: 'S1-1111'
    , summary: 'Test item sale'
    , invoiceItems: {
         itemInvoiceItem: [
             {
                 quantity: 1
                 , inventoryItemUid: saasu.getInventoryItemUid('Item1')
                 , unitPriceInclTax: 150
             },
             {
                 quantity: 2
                 , inventoryItemUid: saasu.getInventoryItemUid('Item2')
                 , unitPriceInclTax: 250
             }
         ]
    }
});
```

__Insert payment for sales__
```javascript
saasuAccount.post('invoicePayment', {
    transactionType: 'SP'
    , date: '2014-04-19'
    , paymentAccountUid: Saasu.getPaymentAccountUid('Account1')
    , invoicePaymentItems: {
        invoicePaymentItem: {
            invoiceUid: '123456'
            , amount: '25'
        }
    }
});
```