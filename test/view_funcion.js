var tap = require('tap')
var cradle = require('cradle');

var c = new(cradle.Connection);
var db = c.database('dbcep');

tap.test('Existe db', function(t) {

    db.exists(function (err, exists) {
      if (err) {
        console.log('error', err);
      } else if (exists) {
        console.log('the force is with you.');
      } else {
        console.log('database does not exists.');
      }
  });

    t.end();
})

tap.test('The Couch app loads', function(t) {
  t.doesNotThrow(load_app, 'No problem loading the app.js file')
  t.end()

  function load_app() {
    var app = require('../lib/app')
  }
})

tap.test('The list function', function(t) {

  var app = require('../lib/app')
    , embedded = app.lists.embedded;

  t.type(embedded, 'function', 'Show list "embedded"');

  var doc = { "_id" : "xxx/123" }
    , null_req = {'query':{}}
    , john_req = {'query':{'who':'John Doe'}}


  //t.equal(full(doc, null_req), mock, '"Hello world" by default');
  //t.equal(hello(doc, john_req), 'Hello, John Doe', 'Supports ?who query string')
  t.end()
})

tap.test('The view function', function(t) {

    db.view('cep/full', function (err, res) {
        console.log(res);
        t.equal(res, '', "teste de retorno vazio");
    });

  t.end()
})
