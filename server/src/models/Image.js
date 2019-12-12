const Mongoose = require('mongoose')

// Schema for Images
const ImageSchema = new Mongoose.Schema({
    originalname: String,
    caption: String,
    path: String,
}, { strict: false })

const Image = Mongoose.model('images', ImageSchema)

// Array of courses
const listOfImages = () => Image.find({ caption: { $ne: null } })

const addImage = (image) => {
    return Image.create(image)
}

module.exports = {
    listOfImages,
    addImage
}