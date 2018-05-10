const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Entrepreneur = require('./Entrepreneur');
const Developer = require('./Developer');

const userSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {
    type: String, 
    enum: ["developer", "entrepreneur", "unknown"], 
    default: "unknown", 
  },
  status: {type: String, enum: ["Pending Confirmation", "Active"], default: "Pending Confirmation"},
  confirmationCode: {type: String, unique: true},
  profilePicture: {
      originalname: {type: String},
      secure_url: {type: String} 
  },
  phone: {type: String},
  completeAdress: {
    address: {type: String},
    city: {type: String},
    zip: {type: String},
    country: {type: String},
  },
  birthday: {type: Date},
  entrepreneur: {
    type: Schema.Types.ObjectId,
    ref: "Entrepreneur"
  },
  developer: {
    type: Schema.Types.ObjectId,
    ref: "Developer"
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
