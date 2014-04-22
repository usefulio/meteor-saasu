# A collection of methods to interact with the [Saasu REST API](http://help.saasu.com/api/)

---

## Methods available on both client and server

* Saasu.init
* Saasu.getInventoryItemUid
* Saasu.getPaymentAccountUid

## Methods available on server

* Saasu.get
* Saasu.post
* Saasu.parseResponseToObj

## Examples

__Initialize Saasu key and file id__

```javascript
if ( Meteor.isServer ) {
    Saasu.init({
        accessKey: "YOUR_KEY"
        , fileId: "YOUR_FILEID"
    });
}
```

__Initialize inventory items and payment accounts UIDs__
```javascript
Saasu.init({
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
Saasu.getInventoryItemUid[itemName]
Saasu.getPaymentAccountUid[accountName]
```

__Get contact from contactID__

On server-side, you can call the method directly:

```javascript
var response = Saasu.get('contact', {contactID: 'C1-2345'});
console.log( Saasu.parseResponseToObj(response) );
```

To receive the result on client-side, define a Meteor method and call it with a callback:

```javascript
Meteor.methods({
    'saasuGet': function(type, options) {
        var response = Saasu.get(type, options);
        return Saasu.parseResponseToObj(response);
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
Saasu.post('contact', {
    salutation: 'Mr'
    , givenName: 'Phuc'
    , familyName: 'Nguyen'
    , organisationName: 'UsefulIO'
    , contactID: 'C1-1234'
});
```

__Insert new item sale__
```javascript
Saasu.post('invoice', {
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

__Insert payment for sales__
```javascript
Saasu.post('invoicePayment', {
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