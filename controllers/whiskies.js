var express = require('express');
var app = express();
var whiskyRouter = express.Router();

// var Whisky = require('../client/src/models/whisky');

var Whiskies = require('../client/db/whiskiesQuery');
var query = new Whiskies;


// //whisky by id
// whiskyRouter.get('/:id', function(req, res){
//   res.json(whiskies[req.params.id]);
// });

//whisky index - will now have data
whiskyRouter.get('/', function(req, res) {
  // 'results' from database and then send to json
  query.all(function(results){
    res.json(results);
  })
});

//whisky update
// whiskyRouter.put('/:id', function(req, res) {
//   var whisky = new Whisky({
//     distillery: req.body.distillery,
//     name: req.body.name,
//     year: req.body.year,
//     comment: req.body.comment
//   });
//   whiskies[req.params.id] = whisky;
//   res.json({data: whiskies});
// });

// //add new whisky
// whiskyRouter.post('/', function(req, res) {
//   var whisky = new Whisky({
//    distiller: req.body.distiller,
//    name: req.body.name,
//    year: req.body.year,
//    comment: req.body.comment
//   });
//   // films.push(film);
//   // res.json({data: films});
//   query.add(whisky, function(results){
//     res.redirect('/');
//   });
// });

// //delete whisky
// whiskyRouter.delete('/:id', function(req, res) {
//   whiskies.splice(req.params.id, 1);
//   res.json({data: whiskies});
// });

module.exports = whiskyRouter;