const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Post Schema
const PostSchema = new Schema({
	author: {
		type: String,
		required: true
	},
	authorEmail: {
		type: String,
		required: true
	},
	authorUserName: {
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
	imageID: {
		type: String,
		required: true
	},
	clapsReceived: {
	    type: Number,
	    default: 0
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Post = mongoose.model('post', PostSchema);