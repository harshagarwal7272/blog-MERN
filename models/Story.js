const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User Schema
const StorySchema = new Schema({
	author: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	read_duration: {
		type: Number,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Story = mongoose.model('story', StorySchema);