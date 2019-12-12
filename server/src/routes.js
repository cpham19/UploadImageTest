const Image = require('./models/Image')

module.exports = (app, path, upload, multer) => {
    // Home handler 
    app.get('/', (req, res) => {
        res.send("HOME")
    })
    app.get('/images/:image', (req, res, next) => {
      // Options for declaring path of files
      var options = {
        root: path.join(__dirname, 'public/uploads'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }

      // Sending images
      var fileName = req.params.image
      res.sendFile(fileName, options, function (err) {
        if (err) {
          next(err)
        }
        else {
          console.log('Sent:', fileName)
        }
      })
    })
    app.post('/upload', function (req, res) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
              res.status(400).send({error: "Error occurred while uploading file."})
            }
            else if (err || !req.file) {
              // An unknown error occurred when uploading.
              res.status(415).send(err)
            }
            else {
                const image = {originalname: req.file.originalname, caption: req.body.caption, path: `http://localhost:8081/images/${req.file.filename}`}
                Image.addImage(image)
                // Everything went fine.
                res.send({file: req.file})
            }
          })
    })
    app.get('/images', (req, res) => {
      Image.listOfImages().then(images => {
        res.send({images: images})
      })
    })
}
