exports.csvGenerator = async function (columns, data) {
    let csv = columns.join(', ')+"\n"

    for (const i of data) { //For each data of a row, where i is the current row
        let row = [];
        for (const x of columns){ // Add the data in order of the columns to the row, where current data is i, current column is x
            row.push(i[x] || " ") // push said column of the row
        }
        csv += row.join(', '); // add row to Csv
        csv += "\n"
    }
    return csv

}

