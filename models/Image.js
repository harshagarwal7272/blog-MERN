const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User Schema
const ImageSchema = new Schema({
	imageID: {
		type: String,
		default: "none",
		required: true
	},
	imageData: {
		type: String,
		required: true
	}
});

module.exports = Image = mongoose.model('image', ImageSchema);