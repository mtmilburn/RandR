// Require the Mongoose package
const mongoose = require('mongoose');
const reviewSchema = require(`./reviews.js`)
// Create a schema to define the properties of the project collection

const projectSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Category: {type: String, default: `Unknown`},
    Photo: {type: String, required: true},
    Description: {type: String, required: true},
    Status: {type: Boolean, default: false},
    reviews: [reviewSchema]
});
    


// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Project', projectSchema);