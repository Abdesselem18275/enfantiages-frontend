  
//Install express server
var express = require('express');
var path = require('path');

var app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }


// Serve only the static files form the dist directory
app.use(express.static('./dist/enfantiages/'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'dist','enfantiages','index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);