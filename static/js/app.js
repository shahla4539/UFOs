// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select("tbody");

var filter = {}

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    }
    );
  });
}
function handleClick() {
  // Grab the datetime value from the filter
  // this => the current that we click on
  let currentValue = d3.select(this).property("value");
  let filterId = d3.select(this).attr("id");
  let filteredData = tableData;

  if (currentValue) {
    filter[filterId] = currentValue;
  } else {
    delete filter[filterId]
  }


  console.log("Filter: ", filter);

  // Check to see if a date was entered and filter the
  // data using that date.
  if (currentValue) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    // key, value

    Object.entries(filter).forEach(([key, value]) => {
      filteredData = filteredData.filter(row => row[key] === value);
    });

  }

  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("input").on("change", handleClick);

// Build the table when the page loads
buildTable(tableData);











