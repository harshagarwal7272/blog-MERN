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
		trim: true
	},
	thumbnail: {
		type: String
	},
	usersIFollow: {
		type: [String]
	},
	usersWhoFollowMe: {
		type: [String]
	},
	facebookProfileLink: {
		type: String
	}
});

module.exports = SocialUser = mongoose.model('socialuser', SocialUserSchema);
