const datatable = document.getElementById("dataTableId");
const datatableBody = datatable.getElementsByTagName("tbody")[0];
const rows = datatableBody.getElementsByTagName("tr");

console.log(datatable.rows);

for (const row of datatable.rows) {
    for (const cell of row.cells) {
        console.log(cell);
    }
}

