Package.describe({
   summary: 'A collection of methods to interact with the Saasu REST API'
});

Package.on_use(function(api) {
   api.use('underscore', ['server']);
   api.use('xml2js', ['server']);

   api.add_files('common.js', ['client', 'server']);
   api.add_files('server.js', ['server']);

   api.export('Saasu', ['client', 'server']);
});