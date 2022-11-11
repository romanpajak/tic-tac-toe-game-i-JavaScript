const solutions = {
  sol1: {
    field1: "",
    field2: "",
    field3: "",
  },
  sol2: {
    field4: "",
    field5: "",
    field6: "",
  },
  sol3: {
    field7: "",
    field8: "",
    field9: "",
  },
  sol4: {
    field1: "",
    field4: "",
    field7: "",
  },
  sol5: {
    field2: "",
    field5: "",
    field8: "",
  },
  sol6: {
    field3: "",
    field6: "",
    field9: "",
  },
  sol7: {
    field1: "",
    field5: "",
    field9: "",
  },
  sol8: {
    field3: "",
    field5: "",
    field7: "",
  },
};

const fieldArea = document.getElementsByClassName("field");

function addClicks() {
  for (let y = 0; y < fieldArea.length; y++) {
    fieldArea[y].addEventListener("click", clickField);
  }
}

function resetGame() {
  for (let i = 1; i < 10; i++) {
    const contentField = document.getElementById(`field${i}`);
    contentField.innerHTML = "";
    contentField.className = "field";
  }
  for (let x in solutions) {
    let keysArr = Object.keys(solutions[x]);
    for (let i = 0; i < keysArr.length; i++) {
      solutions[x][keysArr[i]] = "";
    }
  }
  addClicks();
  document.querySelector(".infoStatus").innerHTML = "";
  countInStatistics("matches-details");
}

function ifWinningPossible() {
  for (let x in solutions) {
    let valuesArr = Object.values(solutions[x]);
    let keysArr = Object.keys(solutions[x]);
    if (valuesArr.indexOf("x") < 0) {
      let markCounter = 0;
      for (let i = 0; i < valuesArr.length; i++) {
        if (valuesArr[i] === "o") {
          markCounter++;
        }
      }
      if (markCounter === 2) {
        for (let i = 0; i < valuesArr.length; i++) {
          if (valuesArr[i] === "") {
            markField(keysArr[i], "circle");
            document
              .getElementById(keysArr[i])
              .removeEventListener("click", clickField);
            markInObject(keysArr[i], "o");

            for (let y = 0; y < keysArr.length; y++) {
              document
                .getElementById(keysArr[y])
                .classList.add("field-highlight-if-loose");
            }

            showInformation("Niestety przegrałeś.");
            countInStatistics("fails-details");
            clearClicks();
            return true;
            break;
          }
        }
      }
    }
  }
}

function markField(fieldName, sign) {
  const fld = document.getElementById(fieldName);
  if (sign === "cross") {
    const cross = "<span class='cross'>&#9587</span>";
    setTimeout(() => {
      fld.innerHTML = cross;
    }, 50);
  }
  if (sign === "circle") {
    const circle = "<span class='circle'>&#9711</span>";
    setTimeout(() => {
      fld.innerHTML = circle;
    }, 100);
  }
}

function markInObject(field, mark) {
  for (let x in solutions) {
    let keysArr = Object.keys(solutions[x]);
    for (i = 0; i < keysArr.length; i++) {
      if (keysArr[i] === field) {
        solutions[x][field] = mark;
      }
    }
  }
}

function ifComputerLose() {
  for (let x in solutions) {
    let valuesArr = Object.values(solutions[x]);
    let keysArr = Object.keys(solutions[x]);
    if (valuesArr.indexOf("o") < 0) {
      let markCounter = 0;
      for (let i = 0; i < valuesArr.length; i++) {
        if (valuesArr[i] === "x") {
          markCounter++;
        }
      }
      if (markCounter === 3) {
        for (y = 0; y < keysArr.length; y++) {
          document
            .getElementById(keysArr[y])
            .classList.add("field-highlight-if-win");
        }

        showInformation("Brawo! Wygrałeś.");
        countInStatistics("win-details");
        clearClicks();
        return true;
        break;
      }
    }
  }
}

function showInformation(text) {
  document.querySelector(".infoStatus").innerHTML = text;
}

function countInStatistics(class_name) {
  const startingValue = document.body
    .getElementsByClassName(class_name)[0]
    .getElementsByTagName("p")[0].innerHTML;
  document
    .getElementsByClassName(class_name)[0]
    .getElementsByTagName("p")[0].innerHTML = parseFloat(startingValue) + 1;
}

function ifMiddleFieldEmpty() {
  for (let x in solutions) {
    if (solutions[x]["field5"] === "") {
      markInObject("field5", "o");
      markField("field5", "circle");
      document
        .getElementById("field5")
        .removeEventListener("click", clickField);
      return true;
    }
  }
}

function ifBlockingPossible() {
  for (let x in solutions) {
    let valuesArr = Object.values(solutions[x]);
    let keysArr = Object.keys(solutions[x]);
    if (valuesArr.indexOf("o") < 0) {
      let markCounter = 0;
      for (let i = 0; i < valuesArr.length; i++) {
        if (valuesArr[i] === "x") {
          markCounter++;
        }
      }
      if (markCounter === 2) {
        for (let i = 0; i < valuesArr.length; i++) {
          if (valuesArr[i] === "") {
            markField(keysArr[i], "circle");
            document
              .getElementById(keysArr[i])
              .removeEventListener("click", clickField);
            markInObject(keysArr[i], "o");
            return true;
            break;
          }
        }
      }
    }
  }
}

function randomMove() {
  let fieldsArr = [];
  for (let x in solutions) {
    keysArr = Object.keys(solutions[x]);
    for (let i = 0; i < keysArr.length; i++) {
      if (solutions[x][keysArr[i]] === "") {
        if (fieldsArr.indexOf(keysArr[i]) < 0) {
          fieldsArr.push(keysArr[i]);
        }
      }
    }
  }

  const counter = fieldsArr.length;

  if (counter > 1) {
    const randomNumb = Math.floor(Math.random() * counter);
    const fieldToRandomMark = fieldsArr[randomNumb];
    markInObject(fieldToRandomMark, "o");
    markField(fieldToRandomMark, "circle");
    document
      .getElementById(fieldToRandomMark)
      .removeEventListener("click", clickField);
  }
  if (counter === 0) {
    showInformation("Remis");
    countInStatistics("draws-details");
    return;
  }
}

function clearClicks() {
  for (let y = 0; y < fieldArea.length; y++) {
    fieldArea[y].removeEventListener("click", clickField);
  }
}

addClicks();

function highlightFields(cross, circle) {}

function clickField() {
  const fieldKey = this.id;
  markInObject(fieldKey, "x");
  markField(fieldKey, "cross");
  this.removeEventListener("click", clickField);
  if (ifComputerLose === true) {
    return;
  }
  if (ifComputerLose() === true) {
    return;
  }
  if (ifWinningPossible() === true) {
    return;
  }

  if (ifBlockingPossible() === true) {
    return;
  }
  if (ifMiddleFieldEmpty() === true) {
    return;
  }
  randomMove();
}
