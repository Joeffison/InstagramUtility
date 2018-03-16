var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public/app')); //aqui você define onde está o index.html da sua aplicação.
app.listen(process.env.PORT || 3000);
