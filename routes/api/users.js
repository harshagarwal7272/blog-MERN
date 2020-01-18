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
								config.get('jwtSecret'),
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
	console.log("I am in");

	const { name, email } = req.body;

	console.log(name);
	console.log(email);

	const socialAuth = true;

	SocialUser.findOne({email})
	.then(user => {
		if (user) {
			jwt.sign(
				{ id: user.id },
				config.get('jwtSecret'),
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
				}
			)
			return;
		}

		// add a check if it is facebook login, add the facebook profile link of the user
		const newUser = new SocialUser({
			name,
			email
		});

		newUser.save()
			.then(user => {
				jwt.sign(
					{ id: user.id },
					config.get('jwtSecret'),
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

router.get('/author/:userEmail', (req, res) => {

	const userEmail = req.params.userEmail;
	console.log("Do i ever get claled");
	console.log(userEmail);

	SocialUser.find({ "email": userEmail })
		.then((authorData) => {
			console.log("author data : " + authorData);
			res.json(authorData);
		});

	// find the author details from the relevant users database 
	// add an array in the users database so that the followers of the author can be added their

});

module.exports = router;

// get all the posts written by a author unique by email ID
// Post.find({authorEmail:"harshagarwal7272@gmail.com"})
// 		.then((items) => {
// 			res.json(items);
// 		})