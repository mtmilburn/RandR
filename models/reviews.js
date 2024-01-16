const mongoose = require(`mongoose`);

const reviewSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    applicantEmail: {type: String},
    rating: {type: Number, default: 5},
    comment: {type: String, required: true},
    });
    
module.exports = reviewSchema