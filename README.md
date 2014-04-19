# A collections of methods to interact with the [Saasu REST API](http://help.saasu.com/api/)

---

The Saasu object provides the following methods:

## Methods available on both client and server:

* init
* getInventoryItemUid
* getPaymentAccountUid

## Methods available on server:

* get
* post
* parseResponseToJSON

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

__Get contact from contactID__

Meteor.call('/saasu/get', 'contact', {contactID: 'C1-1111'}, function(err, res) {
    console.log( err || res );
});

var response = Saasu.get('contact', options);
Saasu.parseResponseToJSON(response);


