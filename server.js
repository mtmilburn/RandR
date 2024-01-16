//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Require Modules~~~~~~~~~~~~~~~~~~~~~~

require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Require the db connections/models/seeds~

const db = require('./models');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Require the routes in the controllers folder

const projectsCtrlr = require(`./controllers/projects-ctrlr`)

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Create Express app~~~~~~~~~~~~~~~~~~~

const app = express();

//~~~~~~~~~~~~~~~~~~~~~~~~Configure the app to refresh when nodemon restarts

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Configure the app (app.set)~~~~~~~~~~

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Middleware (app.use)~~~~~~~~~~~~~~~~~~

app.use(express.static('public'))
app.use(connectLiveReload());

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Mount Routes~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/', function (req, res) {
    res.send('R and R')
});
// When a GET request is sent to `/seed`, the projects collection is seeded
app.get('/seed', function (req, res) {
    // Remove any existing pets
    db.Project.deleteMany({})
        .then(removedProjects => {
            console.log(`Removed ${removedProjects.deletedCount} projects`)
            // Seed the projects collection with the seed data
            db.Project.insertMany(db.seedProjects)
            .then(addedProjects => {
                console.log(`Added ${addedProjects.length} `)
                res.json(addedProjects)
            })
    })
});



// This tells our app to look at the `controllers/projects.js`
// to handle all routes that begin with `localhost:3000/projects`
// app.use('/projects', projectsCtrlr)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Tell the app tp listen to a specific port

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});