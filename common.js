Saasu = {};

Saasu.getInventoryItemUid = function(itemName) {
    return this.inventoryItems[itemName];
};

Saasu.getPaymentAccountUid = function(accountName) {
    return this.paymentAccounts[accountName];
};

Saasu.init = function(config) {
    _.extend(this, config);
};