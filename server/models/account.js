const { Schema, model } = require('mongoose');
const orders = require('./orders');
const bcrypt = require('bcrypt');

const ProfileSchema = new Schema({
  firstName: {
      type: String,
      required: [true, 'Please enter your name'],
      unique: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your name'],
    unique: true,
},
  password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Your password must be longer than 6 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  //orders: [orders.Schema]
});


// set up pre-save middleware to create password
ProfileSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  ProfileSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const Profile = model('Profile', ProfileSchema);

module.exports = Profile;