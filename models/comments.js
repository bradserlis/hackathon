const mongoose = require('mongoose');

//schema

const commentSchema = mongoose.Schema({
   message: String,
   author: String,
	date: { type: Date, default: Date.now }
	});



module.exports = mongoose.model("Comment", commentSchema);
