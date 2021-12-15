const express = require("express");
const router = express.Router();
const passport = require("passport");
const apiController = require("../controllers/api");

// CREATE
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  apiController.createSurvey
);
// READ
router.get("/list", apiController.getSurveyList);
router.get("/:id", apiController.getSurvey);
// UPDATE
router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  apiController.updateSurvey
);
router.post("/details/:id", apiController.submitSurveyResponse);
// DELETE
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  apiController.deleteSurvey
);

module.exports = router;
