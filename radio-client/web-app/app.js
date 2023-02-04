var express = require('express');

app = express();
port = process.env.PORT || 8083;

var routes = require('./routes/api-routes'); // importing routes
routes(app); // register routes
app.listen(port);
app.use(express.static('public'));

var cors = require('cors');
app.use(cors());
console.log('Radio App started on: ' + port);