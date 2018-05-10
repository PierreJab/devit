const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const entrepreneurSchema = new Schema({
// entrepreneur: {
    active: {type: String, enum: ["activated", "disactivated"], default: "disactivated"},
    offers: [
        {
        title: {type: String}, 
        date: {type: String},
        desired_profile: {type: String}, 
        prices_range: {type: String}, 
        description: {type: String}
        }
    ], 
    rate: {type: Number}, 
    reviews: [
        {
            reviewer: {type: String},
            comments: {type: String}
        }
    ]
    // },
});

const Entrepreneur = mongoose.model('Entrepreneur', entrepreneurSchema);
module.exports = Entrepreneur;