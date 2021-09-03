import { preserveData } from "./preserveData.js";
const datatable = document.getElementById("dataTableId");
const datatableBody = datatable.getElementsByTagName("tbody")[0];

const cbTimeFrom = document.getElementById("timeFrom");
const cbTimeTo = document.getElementById("timeTo");

const columns = [
  "Checkbox",
  "Status",
  "Name",
  "Position",
  "Office",
  "Age",
  "Date",
  "Hour",
  "Comments",
  "Comments1",
  "Comments2",
];

const data = preserveData(datatableBody, columns);

cbTimeFrom.addEventListener("change", (e) => {
  var timeFrom = cbTimeFrom.value;
  var timeTo = cbTimeTo.value;

  if (timeFrom !== "" && timeTo !== "") {
    let filteredArr = filterPerHour(
      data,
      timeFrom.concat(":00"),
      timeTo.concat(":00")
    );

    updateRowsToShow(filteredArr);
  }
});

cbTimeTo.addEventListener("change", (e) => {
  var timeFrom = cbTimeFrom.value;
  var timeTo = cbTimeTo.value;

  if (timeFrom !== "" && timeTo !== "") {
    let filteredArr = filterPerHour(
      data,
      timeFrom.concat(":00"),
      timeTo.concat(":00")
    );
    updateRowsToShow(filteredArr);
  }
});

function filterPerHour(data, timeFrom, timeTo) {
  let filteredArr = data.filter((element) => {
    let formatHour = new Date("01/01/2021 " + element.Hour).getHours();
    let dateFrom = new Date("01/01/2021 " + timeFrom).getHours();
    let dateTo = new Date("01/01/2021 " + timeTo).getHours();
    if (formatHour >= dateFrom && formatHour <= dateTo) {
      return element;
    }
  });

  return sortItemsByHour(filteredArr);
}

function updateRowsToShow(rowsArr) {
  datatableBody.innerHTML = "";
  for (const row of rowsArr) {
    let nRow = datatableBody.insertRow();
    let data = Object.values(row);
    for (const value of data) {
      let nCell = nRow.insertCell();
      nCell.innerHTML = value;
    }
  }
}

function sortItemsByHour(itemsArr) {
  let sortedArr = itemsArr.sort((A, B) => {
    let aHour = new Date("01/01/2021 " + A.Hour).getHours();
    let bHour = new Date("01/01/2021 " + B.Hour).getHours();
    return aHour > bHour;
  });
  return sortedArr;
}

function popUpLargeText(tableBody) {
  for (const row of tableBody.rows) {
    for (const cell of row.cells) {
      if (!cell.children.length > 0) {
        if (cell.innerHTML.length > 15) {
          let text = cell.innerHTML;
          cell.innerHTML = "";
          let abbr = document.createElement("abbr");
          abbr.innerHTML = text;
          abbr.setAttribute("title", text);
          cell.appendChild(abbr);
        }
      }
    }
  }
}

popUpLargeText(datatableBody);
