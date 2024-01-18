/* 
-----------------------------------------------------------------------------------
NOTE: Remember that all routes in this file are prefixed with `localhost:3000/projects`
-----------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()

/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')
// const projects = require('../models/seed')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all projects
router.get(`/`, async function(req, res) {
    const projects = await db.Project.find({})
    res.render(`projects/project-index`, { projects: projects })
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new project document using the form data, 
// and redirects the user to the new pet's show page
router.post('/', (req, res) => {
    db.Project.create(req.body)
        .then(projects => res.redirect('/projects/' + projects._id))
})


// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/new', (req, res) => {
    res.render (`new-form`)
})

// Show Route (GET/Read): Will display an individual pet document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Project.findById(req.params.id)
        .then(projects => {
            res.render('project-details', {
                projects: projects
            })
        })
        .catch(() => res.send('404 Error: Page Not Found'))
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified projects document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(projects => res.redirect('/projects/' + projects._id))
})

// Destroy Route (DELETE/Delete): This route deletes a pet document 
// using the URL parameter (which will always be the pet document's ID)
router.delete('/:id', (req, res) => {
    db.Project.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/projects'))
})



// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing pet
router.get('/:id/edit', (req, res) => {
    db.Project.findById(req.params.id)
    .then(projects => res.render('edit-form', { projects: projects }))
})

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router