const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//SocialUser Schema
const SocialUserSchema = new Schema({
	userName: String,
	email: {
		type: String,
		required: true,
		trim: true
	},

	thumbnail:String,
	gender: String,

	//this can be any id, google, facebook or linkedin ; this will be unique
	accountId: {
		type: String,
		required: true,
		index: { unique: true },
		trim: true
	},
	provider: String
});

module.exports = SocialUser = mongoose.model('socialuser', SocialUserSchema);
