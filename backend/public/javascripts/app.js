/*
PetVey webapp
Group project
Comp 229 Sec009
Fall 2021
*/

console.log("Goes to the client side.");
var questionCount = 0;

if (getTitle == "Survey List") {
  let deleteButtons = document.querySelectorAll(".btn-secondary");

  for (button of deleteButtons) {
    button.addEventListener("click", (event) => {
      if (!confirm("Are you sure?")) {
        event.preventDefault();
      }
    });
  }
}

if (getPage == "Add") {
  const questionGroupContainer = document.getElementById(
    "questionGroupContainer"
  );
  const addQuestionButton = document.getElementById("addQuestionButton");
  try {
    addQuestionButton.addEventListener("click", (event) => {
      event.preventDefault();
      questionCount++;

      // question container
      var container = document.createElement("div");
      container.setAttribute("class", "form-group");
      //label
      var qLabel = document.createElement("label");
      qLabel.setAttribute("for", `Question${questionCount}`);
      qLabel.innerHTML = `Question ${questionCount}.`;
      container.appendChild(qLabel);
      // input
      var qInput = document.createElement("input");
      qInput.setAttribute("type", "text");
      qInput.setAttribute("class", "form-control");
      qInput.setAttribute("id", "statusTextField");
      qInput.setAttribute("placeholder", "Your Question");
      qInput.setAttribute("name", `Question${questionCount}`);
      container.appendChild(qInput);
      // Answer Type Radios
      var aTLabel = document.createElement("label");
      aTLabel.innerHTML = "Answer Type";
      aTLabel.setAttribute("for", `Question${questionCount}AnswerTypeField`);
      container.appendChild(aTLabel);
      container.appendChild(document.createElement("br"));

      for (var i = 0; i < 5; i++) {
        // label
        var aLabel = document.createElement("label");
        aLabel.setAttribute(
          "for",
          `Question${questionCount}AnswerRadioChoice${i + 1}`
        );
        var aRadioButton = document.createElement("input");
        aRadioButton.setAttribute("type", "radio");
        aRadioButton.setAttribute(
          "name",
          `Question${questionCount}AnswerRadio`
        );
        aRadioButton.setAttribute(
          "id",
          `Question${questionCount}AnswerRadioChoice${i + 1}`
        );

        var aType;
        switch (i) {
          case 0:
            aType = "True or False";
            break;
          case 1:
            aType = "Scale";
            break;
          case 2:
            aType = "Multiple Choice";
            break;
          case 3:
            aType = "Short Answer";
            break;
          case 4:
            aType = "Long Answer";
            break;
          default:
            break;
        }
        aLabel.innerHTML = aType;
        aRadioButton.setAttribute("value", aType);
        aLabel.appendChild(aRadioButton);
        container.appendChild(aLabel);
      }

      // add final question element to form
      questionGroupContainer.appendChild(container);
    });
  } catch (error) {
    console.log(error);
  }

  // clicks once to set the initial question
  addQuestionButton.click();
}
