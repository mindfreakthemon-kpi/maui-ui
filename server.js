var app = require('express')();

require('./server/require')(app);

app.helpers	= {};
app.models = {};
app.db = {};

app.require('./server/config');
app.require('./server/model');
app.require('./server/models');
app.require('./server/middleware');
app.require('./server/api');

app.listen(process.env.PORT || 80);
