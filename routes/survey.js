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

// Router for lists surveys function
router.get('/list', surveyController.surveyList);

// Router for survey details function
router.get('/details/:id', surveyController.details);

// Routers for edit functions
router.get('/edit/:id', surveyController.displayEditPage);
router.post('/edit/:id', surveyController.processEditPage);

// Router for Delete function
router.get('/delete/:id', surveyController.performDelete);

// Routers for Add functions
router.get('/add', surveyController.displayAddPage);
router.post('/add', surveyController.processAddPage);


module.exports = router;