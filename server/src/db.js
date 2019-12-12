const
    config = require('./config.json'),
    Mongoose = require('mongoose')

Mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true  })
Mongoose.connection.on('error', err => {
    console.log('MongoDB Connection Error:' + err)
})