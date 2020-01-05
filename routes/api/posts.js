const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const auth = require('../../middleware/auth');

//User Model
const Story = require('../../models/Story');
const Image = require('../../models/Image');


router.get('/', (req, res) => {
	console.log("Fetching posts");
	Story.find()
		.sort({date: -1})
		.then(items => res.json(items))
});

// @route POST api/storys
// @desc Post new story
// @access Private // will change to private later by checking if the user is authorized or not

router.post('/addPhoto', auth, (req, res) => {
	const { author, title, description, picture } = req.body;

	console.log("Hey i am here");

	let description_split = description.split(' ');
	const read_duration = ((description_split.length) / 200) + 1;

	const newPost = new Story({
		author,
		title,
		description,
		read_duration,
		picture
	});

	newPost.save();

});



module.exports = router;