Saasu = function() {};

Saasu.prototype.init = function(config) {
    _.extend(this, config);
};

Saasu.prototype.getInventoryItemUid = function(itemName) {
    return this.inventoryItems[itemName];
};

Saasu.prototype.getPaymentAccountUid = function(accountName) {
    return this.paymentAccounts[accountName];
};