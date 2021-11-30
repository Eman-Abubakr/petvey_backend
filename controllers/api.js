let survey = require("../models/survey");

// CREATE
module.exports.createSurvey = function (req, res, next) {
  // Iterate over request, using regex to pull out questions and answer types and pushing them on their respective arrays
  let questionBodys = [];
  let questionAnswers = [];
  for (let [key, value] of Object.entries(req.body)) {
    if (/Question/.test(key)) {
      questionBodys.push(value);
    } else if (/AnswerRadio/.test(key)) {
      questionAnswers.push(value);
    }
  }

  // Iterate over the question array, creating survey question objects with the body and answer arrays
  let surveyQuestionsProcessed = [];
  questionBodys.forEach((questionBody, index) => {
    let newSurveyQuestion = {
      QuestionBody: questionBody,
      AnswerType: questionAnswers[index],
      MultipleChoiceAnswers: [],
    };
    surveyQuestionsProcessed.push(newSurveyQuestion);
  });

  let newSurvey = survey({
    owner: req.body.owner,
    CreationDate: Date.now(),
    StartDate: req.body.StartDate,
    ExpiryDate: req.body.ExpiryDate,
    Author: req.body.Author,
    Title: req.body.Title,
    Description: req.body.Description,
    Questions: surveyQuestionsProcessed,
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
  // Iterate over request, using regex to pull out questions and answer types and pushing them on their respective arrays
  let questionBodys = [];
  let questionAnswers = [];
  for (let [key, value] of Object.entries(req.body)) {
    if (/Question/.test(key)) {
      questionBodys.push(value);
    } else if (/AnswerRadio/.test(key)) {
      questionAnswers.push(value);
    }
  }

  // Iterate over the question array, creating survey question objects with the body and answer arrays
  let surveyQuestionsProcessed = [];
  questionBodys.forEach((questionBody, index) => {
    let newSurveyQuestion = {
      QuestionBody: questionBody,
      AnswerType: questionAnswers[index],
      MultipleChoiceAnswers: [],
    };
    surveyQuestionsProcessed.push(newSurveyQuestion);
  });

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
        Questions: surveyQuestionsProcessed,
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
