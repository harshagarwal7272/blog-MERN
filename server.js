const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const multer = require("multer");

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', '*');  // enables all the methods to take place
  return next();
});

//Body parser middleware
app.use(express.json());

//File upload multer middleware
// app.use(multer({ dest: './client/public/uploads/stories' }).single('photo'));
app.use('/uploads', express.static('uploads'));

const db = config.get("mongoURI");

mongoose.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log("MongoDB connected..."))
	.catch(err => console.log(err));

//Use routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/clap", require("./routes/api/clap"));
app.use('/image', require("./routes/api/image"));

// Serve static assets if in production

if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port " + port));