/* 
-----------------------------------------------------------------------------------
NOTE: Remember that all routes in this file are prefixed with `localhost:3000/pets`
-----------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()

/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')
const projects = require('../models/seed')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all projects
router.get(`/`, async function(req, res) {
    const projects = await db.Project.find({})
    res.render(`projects/project-index`, { projects: projects })
})

// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/new', (req, res) => {
    res.send('You\'ve hit the new route!')
})
// Show Route (GET/Read): Will display an individual project documents
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
/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */