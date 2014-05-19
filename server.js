var fs = require('fs'),
	app = require('express.io')();

app
	.http()
	.io();

app.set('domain', 'localhost');
app.set('views', 'views');
app.set('view engine', 'jade');

app.set('backend endpoint', process.env.BACKEND_ENDPOINT || 'http://localhost:8080/rest/maui/');
app.set('backend offline', process.env.BACKEND_OFFLINE);
app.set('session secret', process.env.SESSION_SECRET || 'test');
app.set('cookie secret', process.env.COOKIE_SECRET || 'test');

require('./lib/require')(app);
require('./lib/reversible')(app);

app.require('./config');
app.require('./models');
app.require('./middlewares');
app.require('./routes');
app.require('./lib/api');

app.listen(process.env.PORT || 80);
