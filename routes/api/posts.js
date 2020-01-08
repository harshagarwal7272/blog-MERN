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
		.then((items) => {
			let imageIds = items.map(item => item.imageID);
			Image.find({
			    'imageID': { $in: imageIds }
			}).then((images)=>{
				// console.log(images);
				let completeItems = [];
				for(let i=0; i<items.length; i++){
					for(let j=0; j<images.length; j++){
						if(items[i].imageID == images[j].imageID){
							let completeItem = {};
							completeItem.imageData  = images[j].imageData;
							completeItem._id  = items[j]._id;
							completeItem.author  = items[j].author;
							completeItem.title  = items[j].title;
							completeItem.description  = items[j].description;
							completeItem.read_duration  = items[j].read_duration;
							completeItem.imageID  = items[j].imageID;
							completeItem.date  = items[j].date;

							completeItems.push(completeItem);
							break;
						}
					}
				}
	
				res.json(completeItems);
			})
		})
});



// @route POST api/posts
// @desc Post
// @access Private

router.post('/addPost', (req, res) => {
	const { author, title, description, imageID } = req.body;
	
	console.log("I am trying to add a post");

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