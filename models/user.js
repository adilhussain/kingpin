const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
  userName: String,
  googleToken: String, 
  uuid: String
});

mongoose.model('users', userSchema);