/*
PetVey webapp
Group project
Comp 229 Sec009
Fall 2021
*/

var express = require('express');
var router = express.Router();
let controlerIndex = require('../controllers/index');

// GET pages 
router.get('/', controlerIndex.home);
router.get('/about', controlerIndex.about);
router.get('/login', controlerIndex.displayLoginPage);
router.get('/register', controlerIndex.displayRegisterPage);
router.get('/logout', controlerIndex.performLogout);

//Post pages
router.post('/login', controlerIndex.processLoginPage);
router.post('/register', controlerIndex.processRegisterPage);

module.exports = router;
