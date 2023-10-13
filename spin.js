var wheel = document.getElementById("wheel");
var spinBtn = document.getElementById("spin-btn");
var finalValue = document.getElementById("final-value");
var rotationValues = [
  { minDegree: 30, maxDegree: 30, value: 'paris is the capital of1' },
  { minDegree: 31, maxDegree: 90, value: 'paris is the capital of2' },
  { minDegree: 91, maxDegree: 150, value: 'paris is the capital of3' },
  { minDegree: 151, maxDegree: 210, value: 'paris is the capital of4' },
  { minDegree: 211, maxDegree: 270, value: 'paris is the capital of5' },
  { minDegree: 271, maxDegree: 330, value: 'paris is the capital of6' },
  { minDegree: 331, maxDegree: 360, value: 'paris is the capital of7' },
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
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
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





var score = 0
 var winningScore = 10
        function updateScore() {
            score++
            document.getElementById('score').textContent = score
            if (score >= winningScore) {
                document.getElementById('gameStatus').textContent = 'You won!'
            }
        }
        function resetScore() {
            score = 0;
            document.getElementById('score').textContent = score;
            document.getElementById('gameStatus').textContent = 'Not won yet'
        }
        document.getElementById('increaseScore').addEventListener('click', updateScore);
        document.getElementById('resetScore').addEventListener('click', resetScore);







