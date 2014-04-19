_.extend(Saasu, {
    baseURL: 'https://secure.saasu.com/webservices/rest/r1/'

    , _getAuthenticationString: function() {
        return 'wsaccesskey=' + this.accessKey + '&fileuid=' + this.fileId;
    }

    , _sendRequest: function(method, url, options, cb) {
        try {
            if ( cb ) {
                HTTP.call(method, url, options, function(err, res) {
                    cb(err, res);
                });

            } else return HTTP.call(method, url, options);

        } catch (e) {
            console.log('Error sending request to Saasu: ' + e.message);
            throw new Meteor.Error(500, e.message);
        }
    }

    , parseResponseToJSON: function(response) {
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

        var url = Saasu.baseURL + query + Saasu._getAuthenticationString();
        return Saasu._sendRequest('GET', url, {params: options}, cb);
    }

    , post: function(type, info, cb) {
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
        var url = Saasu.baseURL + 'tasks?' + Saasu._getAuthenticationString();
        return Saasu._sendRequest('POST', url, {content: xml}, cb);
    }
});