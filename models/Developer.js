const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const developerSchema = new Schema({
// developer: {
    active: {type: String, enum: ["activated", "disactivated"], default: "disactivated"},
    experience: {
        type: String, 
        enum: ["junior", "young, confirmed", "expert", "unknown"]
    }, 
    previous: [
        {type: String}
    ], 
    prices: {type: String},
    rate: {type: Number}, 
    reviews: [
        {
            reviewer: {type: String},
            comments: {type: String}
        }
    ]
//   },
});

const Developer = mongoose.model('Developer', developerSchema);
module.exports = Developer;