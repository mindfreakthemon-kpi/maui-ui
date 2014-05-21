var app = require('express.io')();

app
	.http()
	.io();

require('express-require')(app);
require('express-reversible')(app);

app.require('./server/config');
app.require('./server/models');
app.require('./server/middlewares');
app.require('./server/routes');
app.require('./lib/api');

app.listen(process.env.PORT || 80);
