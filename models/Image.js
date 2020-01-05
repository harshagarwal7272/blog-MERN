const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Image Schema
const ImageSchema = new Schema({
	imageID: {
		type: String,
		required: true
	},
	imageData: {
		type: String,
		required: true
	}
});

module.exports = Image = mongoose.model('image', ImageSchema);