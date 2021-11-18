/*
PetVey webapp
Group project
Comp 229 Sec009
Fall 2021
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Survey = require("../models/survey");

// Gets all surveys from the Database and renders the page to list all surveys.
module.exports.surveyList = function (req, res, next) {
  Survey.find((err, surveyList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("survey/list", {
        title: "Survey List",
        page: "SurveyList",
        surveys: surveyList,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
};

// Gets a survey by id and renders the details page.
module.exports.details = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, surveyToShow) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("survey/details", {
        title: "Survey Details",
        page: "SurveyDetails",
        survey: surveyToShow,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
};

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
  let newSurvey = Survey();

  res.render("survey/add_edit", {
    page: "Add",
    title: "Add a new survey",
    survey: newSurvey,
    displayName: req.user ? req.user.displayName : ''
  });
};

// Processes the data submitted from the Add form to create a new survey
module.exports.processAddPage = (req, res, next) => {
  console.log(req.body);

  let surveyQuestionsProcessed = [];

  for (let [key, value] of Object.entries(req.body)) {
    if (/Question/.test(key)) {
      console.log(key + ": " + value);
      let newSurveyQuestion = {
        QuestionBody: value,
        AnswerType: req.body.question1AnswerRadio,
        MultipleChoiceAnswers: [],
      };
      surveyQuestionsProcessed.push(newSurveyQuestion);
    }
  }

  let newSurvey = Survey({
    _id: req.body.id,
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

  Survey.create(newSurvey, (err, item) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(item);
      res.redirect("/survey/list");
    }
  });
};

// Gets a survey by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
  let surveyId = req.params.id;

  Survey.findById(surveyId, (err, editSurvey) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("survey/add_edit", {
        title: "Edit Survey",
        survey: editSurvey,
        page: "Edit",
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });
};

// Processes the data submitted from the Edit form to update a survey
module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;

  let updatedSurvey = Survey({
    _id: req.body.id,
    Title: req.body.Title,
    Author: req.body.Author,
    Description: req.body.Description,
    StartDate: req.body.StartDate,
    ExpiryDate: req.body.EndDate,
  });

  Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/survey/list");
    }
  });
};

// Deletes a survey based on its id.
module.exports.performDelete = (req, res, next) => {
  let surveyId = req.params.id;

  Survey.remove({ _id: surveyId }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/survey/list");
    }
  });
};
