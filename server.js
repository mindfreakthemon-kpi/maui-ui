var app = require('express.io')();

app.http().io();

app.set('domain', 'localhost');
app.set('views', 'views');
app.set('view engine', 'jade');

require('./databases')(app);
require('./models')(app);
require('./middlewares')(app);
require('./routes')(app);

app.listen(process.env.PORT || 80);
