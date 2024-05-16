let inputTable = document.getElementById("input-table");
let rowAppearCount;
initRowAppearCount();

function addCountTable(element) {
  const row = element.parentNode.parentNode;
  const countTable = row.querySelector(".count-table");

  if (countTable) {
    countTable.remove();
  }

  const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const inputValues = row.querySelectorAll("input");
  for (let i = 0; i < inputValues.length; i++) {
    const input = inputValues[i];
    if (input.value !== "") {
      const numbers = input.value.split("");
      for (let j = 0; j < numbers.length; j++) {
        const num = parseInt(numbers[j]);
        if (!isNaN(num) && num >= 0 && num <= 9) {
          counts[num]++;
        }
      }
    }
  }

  if (counts.reduce((a, b) => a + b, 0) > 0) {
    const newTable = document.createElement("table");
    newTable.classList.add("count-table");
    const newHeader = document.createElement("thead");
    const newHeaderRow = document.createElement("tr");
    const newHeaderCell1 = document.createElement("th");
    newHeaderCell1.innerHTML = "数字";
    const newHeaderCell2 = document.createElement("th");
    newHeaderCell2.innerHTML = "出现次数";
    newHeaderRow.appendChild(newHeaderCell1);
    newHeaderRow.appendChild(newHeaderCell2);
    newHeader.appendChild(newHeaderRow);
    const newBody = document.createElement("tbody");
    for (let i = 0; i < counts.length; i++) {
      const count = counts[i];
      if (count > 0) {
        const newRow = document.createElement("tr");
        const numCell = document.createElement("td");
        const countCell = document.createElement("td");
        numCell.innerHTML = i;
        countCell.innerHTML = count;
        newRow.appendChild(numCell);
        newRow.appendChild(countCell);
        newBody.appendChild(newRow);
      }
    }
    newTable.appendChild(newHeader);
    newTable.appendChild(newBody);
    row.appendChild(newTable);
  }

  showCountTables();
  showCount();
}

function addRow() {
  const newRow = inputTable.insertRow();
  for (let i = 0; i < 4; i++) {
    const newCell = newRow.insertCell();
    const newInput = document.createElement("input");
    newInput.type = "number";
    newInput.oninput = function () {
      addCountTable(this);
    };
    newCell.appendChild(newInput);
  }
}

function resetTable() {
  inputTable.innerHTML = `
        <thead>
            <tr>
                <th>数字 1</th>
                <th>数字 2</th>
                <th>数字 3</th>
                <th>数字 4</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="number" oninput="addCountTable(this)"></td>
                <td><input type="number" oninput="addCountTable(this)"></td>
                <td><input type="number" oninput="addCountTable(this)"></td>
                <td><input type="number" oninput="addCountTable(this)"></td>
            </tr>
        </tbody>`;
  showCountTables();
  showCount();
}

function generateStatisticsTable() {
  const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const inputValues = inputTable.querySelectorAll("tbody input");
  for (let i = 0; i < inputValues.length; i++) {
    const input = inputValues[i];
    if (input.value !== "") {
      const numbers = input.value.split("");
      for (let j = 0; j < numbers.length; j++) {
        const num = parseInt(numbers[j]);
        if (!isNaN(num) && num >= 0 && num <= 9) {
          counts[num]++;
        }
      }
    }
  }

  const statisticsTableHTML =
    "<table><thead><tr><th>数字</th><th>出现次数</th></tr></thead><tbody>" +
    counts.reduce(
      (acc, cur, i) =>
        cur == 4
          ? acc + "<tr><td>" + i + "</td><td>" + cur + "</td></tr>"
          : acc,
      ""
    ) +
    "</tbody></table>";

  const statisticsTableContainer = document.getElementById(
    "statistics-table-container"
  );
  statisticsTableContainer.innerHTML = statisticsTableHTML;
}

function showCountTables() {
  let countTablesHTML = "";
  initRowAppearCount();
  for (let i = 1; i < inputTable.rows.length; i++) {
    const row = inputTable.rows[i];
    const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const inputValues = row.querySelectorAll("input");
    for (let j = 0; j < inputValues.length; j++) {
      const input = inputValues[j];
      if (input.value !== "") {
        const numbers = input.value.split("");
        for (let k = 0; k < numbers.length; k++) {
          const num = parseInt(numbers[k]);
          if (!isNaN(num) && num >= 0 && num <= 9) {
            counts[num]++;
          }
        }
      }
    }
    countTablesHTML +=
      "<div class='count-table-container'><h3>行 " +
      i +
      " 统计表格</h3><table><thead><tr><th>数字</th><th>出现次数</th></tr></thead><tbody>";
    for (let j = 0; j < counts.length; j++) {
      const count = counts[j];
      if (count > 0) {
        if (count <= 4) {
          rowAppearCount[count][j]++;
        }
        countTablesHTML += "<tr><td>" + j + "</td><td>" + count + "</td></tr>";
      }
    }
    countTablesHTML += "</tbody></table></div>";
  }

  const countTablesContainer = document.getElementById(
    "count-tables-container"
  );
  countTablesContainer.innerHTML = countTablesHTML;
}

function showCount() {
  let countTablesHTML =
    "<div class='table-container'><h3>统计表格</h3><table><tbody><thead><tr><th></th>";
  for (let i = 0; i < 10; i++) {
    countTablesHTML += "<th>" + i + "</th>";
  }
  for (let i = 1; i < rowAppearCount.length; i++) {
    countTablesHTML += "<tr>";
    for (let j = -1; j < rowAppearCount[i].length; j++) {
      if (j == -1) {
        countTablesHTML += "<td>" + i + "</td>";
      } else {
        countTablesHTML += "<td>" + rowAppearCount[i][j] + "</td>";
      }
    }
    countTablesHTML += "</tr>";
  }
  countTablesHTML += "</tbody></table></div>";
  const finalTablesContainer = document.getElementById(
    "whole-count-table-container"
  );
  finalTablesContainer.innerHTML = countTablesHTML;
}
function initRowAppearCount() {
  rowAppearCount = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

document.addEventListener("DOMContentLoaded", function (event) {
  showCountTables();
  initRowAppearCount();
  showCount();
});
