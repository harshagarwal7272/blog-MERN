const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');
const SocialUser = require('../../models/SocialUser');
const Post = require('../../models/Post');

// @route POST api/users
// @desc Register new user
// @access Public

router.post('/', (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	//Check for existing user
	User.findOne({email})
		.then(user => {
			if (user) return res.status(400).json({ msg: "User already exists" });

			const newUser = new User({
				name,
				email,
				password
			});

			//Create salt & hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save()
						.then(user => {

							jwt.sign(
								{ id: user.id },
								process.env.jwtSecret || config.get('jwtSecret'),
								{ expiresIn: 3600 },
								(err, token) => {
									if (err) throw err;
									res.json({
										token,
										user: {
											id: user.id,
											name: user.name,
											email: user.email
										}
									});
								});
						});
				});
			});

		});
});

router.post('/social', (req, res) => {
	const { name, email, thumbnail } = req.body;
	const socialAuth = true;
	SocialUser.findOne({email})
	.then(user => {
		if (user) {
			jwt.sign(
				{ id: user.id },
				process.env.jwtSecret || config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({
						token,
						user: {
							id: user.id,
							name: user.name,
							email: user.email,
							thumbnail: user.thumbnail
						}
					});
				}
			)
			return;
		}

		// add a check if it is facebook login, add the facebook profile link of the user
		const newUser = new SocialUser({
			name,
			email,
			thumbnail
		});

		newUser.save()
			.then(user => {
				jwt.sign(
					{ id: user.id },
					process.env.jwtSecret || config.get('jwtSecret'),
					{ expiresIn: 3600 },
					(err, token) => {
						if (err) throw err;
						res.json({
							token,
							user: {
								id: user.id,
								name: user.name,
								email: user.email,
								thumbnail: user.thumbnail
							}
						});
					});
			});
	});
});

router.get('/author/:userEmail', (req, res) => {

	const userEmail = req.params.userEmail;
	console.log("Do i ever get claled");
	console.log(userEmail);

	SocialUser.find({ "email": userEmail })
		.then((authorData) => {
			console.log("author data : " + authorData);
			res.json(authorData);
		})
		.catch((err)=>{
			console.log("did not find user with email: "+userEmail);
	});

	// find the author details from the relevant users database 
	// add an array in the users database so that the followers of the author can be added their

});

// change request to post
router.post('/follow', (req,res) => {

	const personToFollow = req.body.userToFollow;
	const personWhoFollow = req.body.userWhoFollow;

	console.log(personToFollow);
	console.log(personWhoFollow);

	SocialUser.update({
		"email": personWhoFollow
		},
		{
			$addToSet: {
				"usersIFollow": personToFollow
			}
		}
	)
	.then(() => {console.log("Follow success");});

	SocialUser.update({
		"email": personToFollow
		},
		{
			$addToSet: {
				"usersWhoFollowMe": personWhoFollow
			}
		}
	)
	.then(() => {console.log("Follow success");})

	res.json("Hi");
});

module.exports = router;

// get all the posts written by a author unique by email ID
// Post.find({authorEmail:"harshagarwal7272@gmail.com"})
// 		.then((items) => {
// 			res.json(items);
// 		})