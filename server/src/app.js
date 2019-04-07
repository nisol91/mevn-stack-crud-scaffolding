
//express connection-----
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())



app.listen(process.env.PORT || 8081)

//#######TODO LIST
//connection to server mongodb with mongodb atlas (for the todo list)


const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const uri = "mongodb://default-user:default_users_psw_010203@cluster0-shard-00-00-dqmij.gcp.mongodb.net:27017,cluster0-shard-00-01-dqmij.gcp.mongodb.net:27017,cluster0-shard-00-02-dqmij.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
var client;
var mongoClient = new MongoClient(uri, {
	reconnectTries: Number.MAX_VALUE,
	autoReconnect: true,
	useNewUrlParser: true
})
mongoClient.connect((err, db) => { // returns db connection
	if (err != null) {
		console.log(err)
		return
	}
	client = db
})


//get all items from server
app.get('/todo', (req, res) => {
	const collection = client.db("test").collection("todos")
	collection.find().toArray(function (err, results) {
		if (err) {
			console.log(err)
			res.send([])
			return
		}

		res.send(results)
		
	})
})

//add item
app.post('/addTodo', (req, res) => {
	const collection = client.db("test").collection("todos")
	var todo = req.body.todo // parse the data from the request's body
	collection.insertOne({
		title: todo
	}, function (err, results) {
		if (err) {
			console.log(err)
			res.send('')
			return
		}
		res.send(results.ops[0]) // returns the new document
	})
})

//delete item
app.post('/deleteTodo', (req, res) => {
	const collection = client.db('test').collection('todos')
	// remove document by its unique _id
	collection.removeOne({
		'_id': mongo.ObjectID(req.body.todoID)
	}, function (err, results) {
		if (err) {
			console.log(err)
			res.send('')
			return
		}
		res.send() // return
	})
})




// ######POSTS CRUD
// ----connection to server mongoose (for the posts crud)-----

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
	console.log("Connection Succeeded");
});


var Post = require("../models/post");



//CREATE
// Add new post
app.post('/posts', (req, res) => {
	var db = req.db;
	var title = req.body.title;
	var description = req.body.description;
	var new_post = new Post({
		title: title,
		description: description
	})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true,
			message: 'Post saved successfully!'
		})
	})
})


//GET (READ)
// Fetch all posts
app.get('/posts', (req, res) => {
	Post.find({}, 'title description', function (error, posts) {
		if (error) {
			console.error(error);
		}
		res.send({
			posts: posts
		})
	}).sort({
		_id: -1
	})
})


//UPDATE
// Fetch single post
app.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
		if (error) {
			console.error(error);
		}
		res.send(post)
	})
})

// Update a post
app.put('/posts/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
		if (error) {
			console.error(error);
		}

		post.title = req.body.title
		post.description = req.body.description
		post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

//DELETE
// Delete a post
app.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function (err, post) {
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})