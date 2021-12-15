let survey = require("../models/survey");

// CREATE
module.exports.createSurvey = function (req, res, next) {
  let newSurvey = survey({
    owner: req.body.owner,
    CreationDate: Date.now(),
    StartDate: req.body.StartDate,
    ExpiryDate: req.body.ExpiryDate,
    Author: req.body.Author,
    Title: req.body.Title,
    Description: req.body.Description,
    Questions: req.body.Questions,
    Meta: {
      Completions: 0,
      Views: 0,
      Respondents: [],
    },
  });

  survey.create(newSurvey, (err, item) => {
    if (err) {
      console.error(err);
      res.status(400).json({
        success: false,
        message: getErrorMessage(err),
      });
    } else {
      console.log(item);
      res.status(200).json({ msg: "success", survey: newSurvey });
    }
  });
};
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

  survey.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        Title: req.body.Title,
        Author: req.body.Author,
        Description: req.body.Description,
        StartDate: req.body.StartDate,
        ExpiryDate: req.body.ExpiryDate,
        Questions: req.body.Questions,
      },
    },
    (err, updatedSurvey) => {
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
    }
  );
};
module.exports.submitSurveyResponse = function (req, res, next) {
  let id = req.params.id;
  console.log(req.body);
  console.log("req to submit");
  res.status(200).json({
    success: true,
    message: `responded to Survey ${id} Successfully`,
  });
  /*survey.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        Title: req.body.Title,
        Author: req.body.Author,
        Description: req.body.Description,
        StartDate: req.body.StartDate,
        ExpiryDate: req.body.ExpiryDate,
        Questions: req.body.Questions,
      },
    },
    (err, updatedSurvey) => {
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
    }
  );*/
};
// DELETE
module.exports.deleteSurvey = function (req, res, next) {
  const id = req.params.id;

  survey.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.status(400).json({
        success: false,
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Deleted Survey ${id} Successfully`,
      });
    }
  });
};
