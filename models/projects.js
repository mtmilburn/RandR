// Require the Mongoose package
const mongoose = require('mongoose');
const reviewSchema = require(`./reviews.js`)
// Create a schema to define the properties of the project collection

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: {type: String, default: `Unknown`},
    photo: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: Boolean, default: false},
    reviews: [reviewSchema]
});
    


// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Project', projectSchema);