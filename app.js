const textInput = document.getElementById("text");
const btnCalculate = document.getElementById("btnText");
const infoDiv = document.getElementById("info");
let numbersInputs = document.querySelectorAll("input");
let numbersInputsArray = [];
let values = {};
const ctx = document.getElementById("chart");
const btnMoreInputs = document.getElementById("btn");
const numberInputsContainer = document.querySelector(".number-inputs");
const resetBtn = document.getElementById("reset");

//calculate frequency from numbers input
const calculate = () => {
  for (input of numbersInputs) {
    input.addEventListener("blur", (e) => {
      const value = e.target.value;
      if (value) {
        numbersInputsArray.push(parseInt(value));
      }
      infoDiv.innerText = "";
      calculateFrequency(numbersInputsArray);
    });
  }
};
calculate();

//calculate frequency from text field
btnCalculate.addEventListener("click", () => {
  resetNumberInputs();
  const textInputvalue = textInput.value;
  const inputArray = textInputvalue.split(/[ ,]+/).map(Number);
  const numbersFromTextarea = inputArray.filter(
    (entry) => !Number.isNaN(entry)
  );
  if (numbersFromTextarea.length === 0) {
    infoDiv.innerText = "Please enter numbers ir to the field!";
    infoDiv.classList.add("text-danger");
  } else {
    infoDiv.classList.remove("text-danger");
    infoDiv.innerText = `Your numbers:${numbersFromTextarea}`;
    infoDiv.classList.add("text-info");
  }
  calculateFrequency(numbersFromTextarea);
  textInput.value = "";
});

//calculate frequency from array
function calculateFrequency(arr) {
  const frequencyOriginalNumbers = arr.reduce((acc, cur) => {
    // console.log(acc, cur);
    return acc[cur] ? ++acc[cur] : (acc[cur] = 1), acc;
  }, {});
  const missingNumbers = getMissingNumbers(arr);
  let frequency = frequencyOriginalNumbers;

  for (const number of missingNumbers) {
    frequency[number] = 0;
  }

  const arrayTuple = Object.entries(frequency).sort((a, b) => a[0] - b[0]);
  arrayTuple.map((arr) => (arr[0] = parseInt(arr[0])));
  const frequencyMap = new Map(arrayTuple);
  console.log(frequencyMap);

  let mapNumbersArr = [];
  for (let number of frequencyMap.keys()) {
    mapNumbersArr.push(number);
  }

  let mapValuesArr = [];
  for (let number of frequencyMap.values()) {
    mapValuesArr.push(number);
  }

  values = {
    numbers: mapNumbersArr,
    frequency: mapValuesArr,
  };
  console.log(values);

  addDataToChart(myChart, values);
  return values;
}

//get mising numbers from min to max in an array
function getMissingNumbers(numbers) {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  let result = [];
  for (i = min; i <= max; i++) {
    !numbers.includes(i) && result.push(i);
  }
  return result;
}

//create chart
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: values.numbers,
    datasets: [
      {
        label: "Frequencies of numbers",
        data: values.frequency,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(87, 212, 78, 0.2)",
          "rgba(208, 212, 78, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(87, 212, 78, 1)",
          "rgba(208, 212, 78, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  },
});

//update chart
function addDataToChart(chart, values) {
  chart.data.labels = values.numbers;
  chart.data.datasets[0].data = values.frequency;
  chart.update();
}

//add more inputs
btnMoreInputs.addEventListener("click", function () {
  for (let i = 1; i <= 9; i++) {
    const numberInput = document.createElement("input");
    numberInput.setAttribute("type", "number");
    numberInput.setAttribute("name", "number");
    numberInput.classList.add("input-more");
    numberInputsContainer.appendChild(numberInput);
    numbersInputs = document.querySelectorAll("input");
  }
  calculate();
});

//reset numbers input values
resetBtn.addEventListener("click", () => {
  resetNumberInputs();
});

function resetNumberInputs() {
  for (let number of numbersInputs) {
    number.value = "";
    values = {};
    numbersArray = [];
    addDataToChart(myChart, values);
  }
}
