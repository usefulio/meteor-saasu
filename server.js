_.extend(Saasu, {
    _baseURL: 'https://secure.saasu.com/webservices/rest/r1/'

    , _getAuthenticationString: function() {
        return 'wsaccesskey=' + this.accessKey + '&fileuid=' + this.fileId;
    }

    , _sendRequest: function(method, query, options, cb) {
        var url = Saasu._baseURL + query + Saasu._getAuthenticationString();
        try {
            return HTTP.call(method, url, options, cb);
        } catch (e) {
            console.log('Error sending request to Saasu: ' + e.message);
            throw new Meteor.Error(500, e.message);
        }
    }

    , parseResponse: function(response) {
        var result;
        response && xml2js.parseString(response.content, function(err, res) {
            if ( err ) throw new Meteor.Error(500, err.message);
            result = res;
        });
        return result;
    }

    , get: function(type, options, cb) {
        var query;
        switch (type) {
            case 'contact':
                query = 'contactlist?';
                break;
        }

        return Saasu._sendRequest('GET', query, {params: options}, cb);
    }

    , post: function(type, info, cb) {
        // XXX Saasu only accepts 'contactID' as property name for the custom contact id
        if ( info.contactId ) info.contactID = info.contactId;

        // The object used to generate xml
        var contentObj;
        switch (type) {
            case 'contact':
                contentObj = {insertContact: {contact: info}};
                break;
            case 'invoice':
                contentObj = {insertInvoice: {invoice: { invoiceNumber: '<Auto Number>'}}};
                _.extend(contentObj.insertInvoice.invoice, info);
                break;
            case 'invoicePayment':
                contentObj = {insertInvoicePayment: {invoicePayment : info}};
                break;
        }

        // Generate xml content
        var builder = new xml2js.Builder({rootName: 'tasks', xmldec: {'version': '1.0', 'encoding': 'utf-8'}});
        var xml = builder.buildObject(contentObj);

        // Send the request
        return Saasu._sendRequest('POST', 'tasks?', {content: xml}, cb);
    }
});