var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('mydb', mongodbServer);

/* open db */
db.open(function() {
  /* Select 'contact' collection */
  db.collection('contact', function(err, collection) {
    /* Insert a data */
    collection.insert({
      name: 'Fred Chien',
      email: 'cfsghost@gmail.com',
      tel: [
          '0926xxx5xx',
          '0912xx11xx'
      ]
    }, function(err, data) {
      if (data) {
        console.log('Successfully Insert');
      } else {
        console.log('Failed to Insert');
      }
    });

    /* Querying */
    collection.find({ name: 'Fred Chien' }, function(err, data) {
      
      /* Found this People */
      if (data) {
        console.log('Name: ' + data.name + ', email: ' + data.email);
      } else {
        console.log('Cannot found');
      }
    });
  });
});