var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());

var port = 3000;
var conn = massive.connectSync({
  connectionString : "postgres://postgres:@localhost/massive_demo"
});
app.set('db', conn);
var db = app.get('db');


app.get('/incidents', function(req, res) {
  console.log('POST sighting');
  var query = req.query.cause;
  if (query) {
    db.get_all_incidents_byId([query],function(err, incidents) {
      if(!err){
        res.json(incidents);

      }
      else res.json(err);
    });
  }
  else{
    db.get_all_incidents(function(err, incidents) {
        if(!err){
          res.json(incidents);

        }
        else res.json(err);
    });
  }
});

app.post('/incidents', function(req, res) {
var inciden = req.body
console.log('POST sighting');

  db.post_an_incidents([inciden.us_state,inciden.injury_id,inciden.cause_id],function(err, response) {
      if(!err){
        res.status(200).send(response);
      }
      else res.status(422).send(err);
  });
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
