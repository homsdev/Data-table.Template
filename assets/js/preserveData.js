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

export {preserveData};