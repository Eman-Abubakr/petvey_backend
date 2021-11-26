const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

// CREATE
// READ
router.get("/list", apiController.getSurveyList);
router.get("/:id", apiController.getSurvey);
// UPDATE
router.put("/edit/:id", apiController.updateSurvey);
// DELETE
module.exports = router;
