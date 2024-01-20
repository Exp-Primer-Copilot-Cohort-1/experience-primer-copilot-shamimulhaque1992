// Create web server
// Created by: Joseph Canero
// Date: 5/21/2014
// ==================================

// Dependencies
var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Create web server
var app = express();
var server = http.createServer(app);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments');

// Configure web server
app.use(bodyParser());
app.use(express.static(path.resolve(__dirname, 'public')));

// Create schema and model for comments
var CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: Date
});
var Comment = mongoose.model('Comment', CommentSchema);

// GET all comments
app.get('/comments', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});

// POST new comment
app.post('/comments', function(req, res) {
  var comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
    date: Date.now()
  });
  comment.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.json(req.body);
    }
  });
});

// Start web server
server.listen(3000, function() {
  console.log('Server started on port 3000');
});