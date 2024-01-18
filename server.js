//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Require Modules~~~~~~~~~~~~~~~~~~~~~~

require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Require the db connections/models/seeds~

const db = require('./models');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Require the routes in the controllers folder

const projectsCtrlr = require(`./controllers/projects-ctrlr`);
// const projects = require('./models/projects');
const reviewsCtrlr = require('./controllers/reviews-ctrlr')
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

// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Mount Routes~~~~~~~~~~~~~~~~~~~~~~~~~~
//home page
app.get('/', function (req, res) {
    db.Project.find({})
        .then(projects => {
            console.log(projects)
            res.render('home', {
                projects: projects
            })
        })
});
//when you go to the projects page you're redirected to the home page
app.get('/projects', function (req, res) {
    res.redirect('/')
});
// When a GET request is sent to `/seed`, the projects collection is seeded
app.get('/seed', async (req, res) => {
    // Remove any existing projects
        const formerProjects = await db.Project.deleteMany({})
            console.log(`Removed ${formerProjects.deletedCount} projects`)
            // Seed the projects collection with the seed data
            const newProjects = await db.Project.insertMany(db.seedProjects)
                console.log(`Added ${newProjects.length} `)
                res.json(newProjects)
            })
    
app.get('/:id', function (req, res){
    db.Project.findById(req.params.id)
    .then(projects => {
        res.render('projects-details', {
            projects: projects
        })
    })
})


app.get('*', function (req, res) {
    res.send('404 Error: Page Not Found')
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Tell the app tp listen to a specific port

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});