let survey = require("../models/survey");

// READ
module.exports.getSurveyList = function (req, res, next) {
  survey.find((err, surveyList) => {
    if (err) {
      console.error(err);
      return res.status(400).send({
        success: false,
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Retrieved Survey List Successfully",
        surveyList: surveyList,
      });
    }
  });
};
module.exports.getSurvey = function (req, res, next) {
  let id = req.params.id;

  survey.findById(id, (err, surveySearched) => {
    if (err) {
      console.error(err);
      res.status(400).json({
        success: false,
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Retrieved Survey ${id} Successfully`,
        survey: surveySearched,
      });
    }
  });
};
// UPDATE
module.exports.updateSurvey = function (req, res, next) {
  let id = req.params.id;

  let updatedSurvey = survey({
    _id: id,
    CreationDate: req.body.CreationDate,
    StartDate: req.body.StartDate,
    ExpiryDate: req.body.ExpiryDate,
    Title: req.body.Title,
    Author: req.body.Author,
    Description: req.body.Description,
    Questions: req.body.Questions,
    Meta: req.body.Meta,
  });

  survey.updateOne({ _id: id }, updatedSurvey, (err, updatedSurvey) => {
    if (err) {
      console.error(err);
      res.status(400).json({
        success: false,
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Updated Survey ${id} Successfully`,
        updatedSurvey: updatedSurvey,
      });
    }
  });
};
