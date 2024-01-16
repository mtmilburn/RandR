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


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all projects
// router.get(`/`, async function(req, res) {
//     const projects = await db.Project.find({})
//     res.render(`projects/project-index`, { projects: projects })
// })



/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */