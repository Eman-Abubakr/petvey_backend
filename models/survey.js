/*
PetVey webapp
Group project
Comp 229 Sec009
Fall 2021
*/

let mongoose = require("mongoose");

// Create a model class
let surveyModel = mongoose.Schema(
  {
    id: String,
    owner: String,
    CreationDate: String,
    StartDate: String,
    ExpiryDate: String,
    Title: String,
    Author: String,
    Description: String,
    Questions: [
      {
        QuestionBody: String,
        AnswerType: String,
        MultipleChoiceAnswers: [],
      },
    ],
    Meta: {
      Completions: Number,
      Views: Number,
      Respondents: [],
    },
  },
  {
    collection: "surveys",
  }
);

module.exports = mongoose.model("Survey", surveyModel);
