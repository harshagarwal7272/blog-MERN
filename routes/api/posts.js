const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const auth = require('../../middleware/auth');

//Post Model
const Post = require('../../models/Post');

//Clap Model
const Clap = require('../../models/Clap');

// @route api/posts
// @desc Get all stories
// @access Public


//:userEmail
router.post('/', (req, res) => {
	console.log("Fetching posts");

	const { userEmail } = req.body;

	let criteria = {}

	if (userEmail) {
		criteria = {
			authorEmail: userEmail
		}
	}
	// filter and return requests based on unique-User or userEmail

	Post.find(criteria)
		.sort({date: -1})
		.then((items) => {
			let imageIds = items.map(item => item.imageID);
			Image.find({
			    'imageID': { $in: imageIds }
			}).then((images)=>{
				let completeItems = [];
				for(let i=0; i<items.length; i++){
					for(let j=0; j<images.length; j++){
						if(items[i].imageID == images[j].imageID){
							let completeItem = {};
							completeItem.imageData  = images[j].imageData;
							completeItem._id  = items[i]._id;
							completeItem.author  = items[i].author;
							completeItem.authorEmail = items[i].authorEmail;
							completeItem.title  = items[i].title;
							completeItem.description  = items[i].description;
							completeItem.read_duration  = items[i].read_duration;
							completeItem.imageID  = items[i].imageID;
							completeItem.date  = items[i].date;

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
	const { author, authorEmail, title, description, imageID } = req.body;

	let description_split = description.split(' ');
	const read_duration = Math.ceil(((description_split.length) / 200));

	const newPost = new Post({
		author,
		authorEmail,
		title,
		description,
		read_duration,
		imageID
	});

	newPost.save();

});

// @route GET api/posts
// @desc Get
// @access Public

router.get('/story/:id', (req, res) => {
	const _id = req.params.id;

	Post.find({_id:_id})
		.then((items) => {

			let imageIds = items.map(item => item.imageID);
			Image.find({
				'imageID': { $in: imageIds }
			}).then((images)=>{
				let completeItems = [];
				for(let i=0; i<items.length; i++){
					for(let j=0; j<images.length; j++){
						if(items[i].imageID == images[j].imageID){
							let completeItem = {};
							completeItem.imageData  = images[j].imageData;
							completeItem._id  = items[i]._id;
							completeItem.author  = items[i].author;
							completeItem.authorEmail = items[i].authorEmail;
							completeItem.title  = items[i].title;
							completeItem.description  = items[i].description;
							completeItem.read_duration  = items[i].read_duration;
							completeItem.imageID  = items[i].imageID;
							completeItem.date  = items[i].date;


							//find clap no. here and update completeItem
							completeItem.clap_count = 0;
							Clap.find({"story_id":_id})
								.then((clap_items)=>{
									let clap_cnt = 0;
									clap_items.forEach((clapItem)=>{
										clap_cnt = clap_cnt + clapItem.clap_count;
									})

									completeItem.clap_count = clap_cnt;

									completeItems.push(completeItem);
									res.json(completeItems);

								})


							// completeItems.push(completeItem);
							// break;
						}
					}
				}




				// res.json(completeItems);
			})

		});
});

module.exports = router;