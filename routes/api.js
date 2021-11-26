const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

// CREATE
router.post("/create", apiController.createSurvey);
// READ
router.get("/list", apiController.getSurveyList);
router.get("/:id", apiController.getSurvey);
// UPDATE
router.put("/edit/:id", apiController.updateSurvey);
// DELETE
router.delete("/delete/:id", apiController.deleteSurvey);

module.exports = router;
