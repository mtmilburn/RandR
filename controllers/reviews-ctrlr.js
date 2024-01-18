/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/applications`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models');
// const projects = require('../models/projects');


/* Routes
--------------------------------------------------------------- */
// Index Route (All reviews): 
// GET localhost:3000/reviews/
router.get('/', (req, res) => {
	db.Project.find({}, { reviews: true, _id: false })
        .then(projects => {
		    // format query results to appear in one array, 
		    // rather than an array of objects containing arrays 
	    	const flatList = []
	    	for (let project of projects) {
	        	flatList.push(...project.reviews)
	    	}
	    	res.render('reviews/rev-index', {reviews: flatList})
		}
	)
});

// Show Route: GET localhost:3000/applications/:id
router.get('/:id', (req, res) => {
    db.Project.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
        )
        .then(projects => {
            // format query results to appear in one object, 
            // rather than an object containing an array of one object
            res.render(projects.applications[0])
        })
    });

// New Route: GET localhost:3000/reviews/new
router.get('/new/:projectId', (req, res) => {
    res.send('You\'ve reached the new route. You\'ll be making a new application for pet ' + req.params.petId)
})


    
    // Destroy Route: DELETE localhost:3000/reviews/:id
    router.delete('/:id', (req, res) => {
        db.Project.findOneAndUpdate(
            { 'reviews._id': req.params.id },
            { $pull: { reviews: { _id: req.params.id } } },
            { new: true }
            )
            .then(projects => res.redirect(projects))
        });
        // Create Route: POST localhost:3000/applications/
        router.post('/create/:projectsId', (req, res) => {
            db.Project.findByIdAndUpdate(
                req.params.projectsId,
                { $push: { reviews: req.body } },
                { new: true }
            )
                .then(projects => res.redirect(projects))
        });


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
