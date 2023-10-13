const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const theanswers = document.getElementById("the-answers");
let score = 0;
const scoreDisplay = document.getElementById("score-display");
const rotationValues = [
  {
    minDegree: 30,
    maxDegree: 30,
    question: 'What is the capital of France?',
    answers: ['Paris', 'Berlin', 'London'],
  },
  {
    minDegree: 31,
    maxDegree: 90,
    question: 'Which planet is known as the Red Planet?',
    answers: ['Mars', 'Venus', 'Jupiter'],
  },
  {
    minDegree: 91,
    maxDegree: 150,
    question: 'tuinisia is it in',
    answers: ['africa', 'america', 'europe'],
  },
  {
    minDegree: 151,
    maxDegree: 210,
    question: 'the number 10 is before number?',
    answers: ['11', '13', '14'],
  },
  {
    minDegree: 211,
    maxDegree: 270,
    question: '225+225?',
    answers: ['450', '500', '550'],
  },
  {
    minDegree: 271,
    maxDegree: 330,
    question: '100/2?',
    answers: ['50', '30', '10'],
  },
  {
    minDegree: 331,
    maxDegree: 360,
    question: '10*10?',
    answers: ['100', '110', '1000'],
  },
  
];
var data = [16, 16, 16, 16, 16, 16];
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];
let myChart = new Chart(wheel, {
plugins: [ChartDataLabels],
 type: "pie",
  data: {
   labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
     tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Question: ${i.question}</p>`;
      theanswers.innerHTML = `<p1>Pick the right answer:</p1>`;
      i.answers.forEach((answer, index) => {
        theanswers.innerHTML += `<button onclick="checkAnswer(${index})">${answer}</button>`;
      });
      spinBtn.disabled = false;
      break;
    }
  }
};
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
function checkAnswer(selectedIndex) {
  const currentSection = rotationValues.find((section) => {
    const angleValue = myChart.options.rotation;
    return angleValue >= section.minDegree && angleValue <= section.maxDegree;
  });

  if (currentSection) {
    const correctIndex = currentSection.answers.findIndex((answer, index) => {
      return answer === currentSection.answers[0];
    });

    if (selectedIndex === correctIndex) {
      finalValue.innerHTML = `<p>Correct! The answer is ${currentSection.answers[correctIndex]}</p>`;
      score++; 
      scoreDisplay.textContent = `Score: ${score}`; 
    } else {
      finalValue.innerHTML = `<p>Incorrect! The correct answer is ${currentSection.answers[correctIndex]}</p>`;
    }
  }
}
