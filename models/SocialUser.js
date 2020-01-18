const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//SocialUser Schema
const SocialUserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	facebookProfileLink: {
		type: String
	}
});

module.exports = SocialUser = mongoose.model('socialuser', SocialUserSchema);
