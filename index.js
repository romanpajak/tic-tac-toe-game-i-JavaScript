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
function addClicks(){
  for (let y = 0; y < fieldArea.length; y++) {
    fieldArea[y].addEventListener("click", clickField);
  }
  }
function resetGame(){
  for (let i=1;i<10;i++){
    const contentField=document.getElementById(`field${i}`);
   contentField.innerHTML="";
   contentField.className="field"
  }
  for (x in solutions){
    let keysArr = Object.keys(solutions[x]);
    for (i = 0; i < keysArr.length; i++) {
        solutions[x][keysArr[i]] = "";
    }
  }
  addClicks();
  document.querySelector(".infoStatus").innerHTML="";
  countInStatistics("matches-details");
}


function markField(){
  const fld=document.getElementById("field1");
  const cross="<span class='cross'>&#9587</span>";
  fld.innerHTML=cross;
}
function ifMiddleFieldEmpty() {
  for (x in solutions) {
    //let keysArr=Object.keys(solutions[x]);
    if (solutions[x]["field5"] === "") {
      return true;
      break;
    }
  }
  return false;
}

function markInObject(field, mark) {
  for (x in solutions) {
    let keysArr = Object.keys(solutions[x]);
    for (i = 0; i < keysArr.length; i++) {
      if (keysArr[i] === field) {
        solutions[x][field] = mark;
      }
    }
  }
}
function ifBlockingPossible() {
  for (x in solutions) {
    let valuesArr = Object.values(solutions[x]);
    keysArr = Object.keys(solutions[x]);
    if (valuesArr.indexOf("o") < 0) {
      let markCounter = 0;
      for (i = 0; i < valuesArr.length; i++) {
        if (valuesArr[i] === "x") {
          markCounter++;
        }
      }
      if (markCounter === 2) {
        return true;
        break;
      }
    }
  }
  return false;
}

function ifWinningPossible() {
  for (x in solutions) {
    let valuesArr = Object.values(solutions[x]);
    keysArr = Object.keys(solutions[x]);
    if (valuesArr.indexOf("x") < 0) {
      let markCounter = 0;
      for (i = 0; i < valuesArr.length; i++) {
        if (valuesArr[i] === "o") {
          markCounter++;
        }
      }
      if (markCounter === 2) {
        return true;
        break;
      }
    }
  }
}

function ifComputerLose(){
    for (x in solutions) {
        let valuesArr = Object.values(solutions[x]);
        keysArr = Object.keys(solutions[x]);
        if (valuesArr.indexOf("o") < 0) {
          let markCounter = 0;
          for (i = 0; i < valuesArr.length; i++) {
            if (valuesArr[i] === "x") {
              markCounter++;
            }
          }
          if (markCounter === 3) {
            for(y=0;y<keysArr.length;y++){
              document.getElementById(keysArr[y]).classList.add("field-highlight-if-win")
            }

            return true;
            break;
          }
        }
      }
}
function showInformation(text){
    document.querySelector(".infoStatus").innerHTML=text;
}
function countInStatistics(class_name){
const startingValue=document.body.getElementsByClassName(class_name)[0].getElementsByTagName("p")[0].innerHTML;
document.getElementsByClassName(class_name)[0].getElementsByTagName("p")[0].innerHTML= parseFloat(startingValue)+1;
}
//zrobić pętlę
function clearClicks(){
    for (let y = 0; y < fieldArea.length; y++) {
        fieldArea[y].removeEventListener("click", clickField);
      }  
}
addClicks();
function highlightFields(cross,circle){

}
// document.getElementsByClassName("field")[0].addEventListener("click",clickField);
//everyField

function clickField() {
//   this.innerHTML = "x";
  fieldKey = this.id;
  document.getElementById(fieldKey).innerHTML="x"
  this.removeEventListener("click", clickField);
  markInObject(fieldKey, "x");
  if (ifComputerLose()===true){
    showInformation("Brawo! Wygrałeś.");
    countInStatistics("win-details");
    clearClicks();
    return;
  }

  if (ifWinningPossible() === true) {
    //alert("możliwe zwycięstwo komputera ");
   
    for (x in solutions) {
      let valuesArr = Object.values(solutions[x]);
      keysArr = Object.keys(solutions[x]);
      if (valuesArr.indexOf("x") < 0) {
        let markCounter = 0;
        for (i = 0; i < valuesArr.length; i++) {
          if (valuesArr[i] === "o") {
            markCounter++;
          }
        }
        if (markCounter === 2) {
          for (i = 0; i < valuesArr.length; i++) {
            if (valuesArr[i] === "") {
              //solutions[x][i]="o"
              //solutions[x][keysArr[i]]="o";
              document.getElementById(keysArr[i]).innerHTML = "o";
              document
                .getElementById(keysArr[i])
                .removeEventListener("click", clickField);
              markInObject(keysArr[i], "o");
              
              for(y=0;y<keysArr.length;y++){
                document.getElementById(keysArr[y]).classList.add("field-highlight-if-loose")
              }
              
              showInformation("Niestety przegrałeś.");
              countInStatistics("fails-details");
              clearClicks();
              break;
              
              
              
              return;



            }
          }
        }
      }
    }

  }

  if (ifBlockingPossible() === true) {
    //alert("możliwe zablokowanie");
 for (x in solutions) {
      let valuesArr = Object.values(solutions[x]);
      keysArr = Object.keys(solutions[x]);
      if (valuesArr.indexOf("o") < 0) {
        let markCounter = 0;
        for (i = 0; i < valuesArr.length; i++) {
          if (valuesArr[i] === "x") {
            markCounter++;
          }
        }
        if (markCounter === 2) {
          for (i = 0; i < valuesArr.length; i++) {
            if (valuesArr[i] === "") {
              //solutions[x][i]="o"
              //solutions[x][keysArr[i]]="o";
              document.getElementById(keysArr[i]).innerHTML = "o";
              document
                .getElementById(keysArr[i])
                .removeEventListener("click", clickField);
              markInObject(keysArr[i], "o");
              break;
            }
          }
          return;
        }
      }
    }



  }



  if (ifBlockingPossible() === false && ifMiddleFieldEmpty() === true) {
    //alert("możliwe zajęcie środkowego pola");

    markInObject("field5", "o");
    document.getElementById("field5").innerHTML = "o";
    document.getElementById("field5").removeEventListener("click", clickField);
  } else if (ifBlockingPossible() === false && ifMiddleFieldEmpty() === false) {
    const fieldsArr = [];
    for (x in solutions) {
      keysArr = Object.keys(solutions[x]);
      for (i = 0; i < keysArr.length; i++) {
        if (solutions[x][keysArr[i]] === "") {
          if (fieldsArr.indexOf(keysArr[i]) < 0) {
            fieldsArr.push(keysArr[i]);
          }
        }
      }
    }

    const counter = fieldsArr.length;
    if(counter>1){
    const randomNumb = Math.floor(Math.random() * counter);
    const fieldToRandomMark = fieldsArr[randomNumb];
    //alert(fieldToRandomMark);
    markInObject(fieldToRandomMark, "o");
    document.getElementById(fieldToRandomMark).innerHTML = "o";
    document
      .getElementById(fieldToRandomMark)
      .removeEventListener("click", clickField);

    return;
  }else{
    showInformation("Remis")
    countInStatistics("draws-details")
    return;
  }
}
}
