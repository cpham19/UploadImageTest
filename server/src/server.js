const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
    path = require('path'),
    multer = require('multer')

// Express configuration
const app = express(),
    server = require('http').Server(app)

app.use(morgan('combined'))
app.use(bodyParser.json())
// app.use(bodyParser.json({limit: '50mb', extended: true}))
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './src/public/uploads',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// Init Upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 10000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  }
}).single('file')

function checkFileType(file, cb) {
  // Allowed filetypes
  const filetypes = /jpeg|jpg|png|gif/

  // Checyk extension names
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

  // Check mimetype
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  }
  cb({error: "ERROR. IMAGES ONLY"})
}

// Database
require('./db')

// Routes
require('./routes')(app, path, upload, multer)

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8081;

server.listen(port)