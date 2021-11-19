/*
PetVey webapp
Group project
Comp 229 Sec009
Fall 2021
*/

const { render } = require('ejs');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let surveyController = require('../controllers/survey');
   
// helper function for guard purpose
function requireAuth(req, res, next)
{
    //check if the user logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// Router for lists surveys function
router.get('/list', surveyController.surveyList);

// Router for survey details function
router.get('/details/:id', requireAuth, surveyController.details);

// Routers for edit functions
router.get('/edit/:id', requireAuth,surveyController.displayEditPage);
router.post('/edit/:id', requireAuth,surveyController.processEditPage);

// Router for Delete function
router.get('/delete/:id', requireAuth,surveyController.performDelete);

// Routers for Add functions
router.get('/add', requireAuth,surveyController.displayAddPage);
router.post('/add', requireAuth,surveyController.processAddPage);


module.exports = router;