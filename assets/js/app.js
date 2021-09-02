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

const preserveData = (dataBody, columns) => {
  const dataArray = [];

  for (const row of dataBody.children) {
    let i = 0;
    let dataCell = {};

    if (columns.length > 0) {
      for (const col of columns) {
        dataCell[col] = "";
      }
    }

    for (const key in dataCell) {
      dataCell[key] = row.cells[i].innerHTML;
      i++;
    }
    dataArray.push(dataCell);
  }

  return dataArray;
};

const data = preserveData(datatableBody, columns);

cbTimeFrom.addEventListener("change", (e) => {
  var timeFrom = cbTimeFrom.value;
  var timeTo = cbTimeTo.value;

  if (timeFrom !== "" && timeTo !== "") {
    // console.log(`Realiza filtrado de ${timeFrom} a ${timeTo}`);
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
    // console.log(`Realiza filtrado de ${timeFrom} a ${timeTo}`);
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
    // console.log(`actual: ${formatHour} From : ${dateFrom}  To: ${dateTo}`);
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
