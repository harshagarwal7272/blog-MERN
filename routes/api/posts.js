const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const auth = require('../../middleware/auth');

//User Model
const Post = require('../../models/Post');

// @route api/posts
// @desc Get all stories
// @access Public

router.get('/', (req, res) => {
	console.log("Fetching posts");
	Post.find()
		.sort({date: -1})
		.then(items => res.json(items))
});


// @route POST api/posts
// @desc Post
// @access Private

router.post('/addPost', auth, (req, res) => {
	const { author, title, description, imageID } = req.body;
	
	let description_split = description.split(' ');
	const read_duration = Math.ceil(((description_split.length) / 200));

	const newPost = new Post({
		author,
		title,
		description,
		read_duration,
		imageID
	});

	newPost.save();

});

module.exports = router;