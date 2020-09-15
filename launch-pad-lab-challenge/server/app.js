const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');

app.use(session({secret: 'jay'}));

app.use(express.static(path.join(__dirname, '../public')));

// api routes
app.use('/api', require('./api'));

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 500 Error handling endware
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 7777;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}/`);
});
