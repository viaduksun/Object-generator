// Getting in constants node-elements
const startGenerateBtn = document.querySelector('#startGenerateBtn');
const startIndicator = document.querySelector('#startIndicator');
const startGetterIndicator = document.querySelector('#startGetterIndicator');
const getSuccessIndicator = document.querySelector('#getSuccessIndicator');
const startGetterBtn = document.querySelector('#startGetterBtn');
const resetCounter = document.querySelector('#resetCounter');
const counter01 = document.querySelector('#counter01');
const counter02 = document.querySelector('#counter02');
const counter03 = document.querySelector('#counter03');

// Setting starting text in buttons
startGenerateBtn.textContent = 'Start';
startGetterBtn.textContent = 'Start';

// Declaring public variables
let objArray = [];
let generatorTimeout;
let getterTimeout;
let getDelay = 2000;
let generatorDelay = 1000;

let counter01value = 0;
let counter02value = 0;
let counter03value = 0;

counter01.textContent = counter01value;
counter02.textContent = counter02value;
counter03.textContent = counter03value;

// Function for generating random delay for generator
function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// ======= BTN onclick processing =======
startGenerateBtn.addEventListener('click', () => {
  startGenerateBtn.classList.toggle('on')
  startIndicator.classList.toggle('on')
  if (startGenerateBtn.classList.contains('on')) {
    startGenerateBtn.textContent = 'Pause';
    startGeneratorFunction();
  } else {
    startGenerateBtn.textContent = 'Start';
    clearTimeout(generatorTimeout)
  }
})

startGetterBtn.addEventListener('click', () => {
  startGetterBtn.classList.toggle('on')
  startGetterIndicator.classList.toggle('on')
  if (startGetterBtn.classList.contains('on')) {
    startGetterBtn.textContent = 'Pause';
    startGetterFunction();
  } else {
    startGetterBtn.textContent = 'Start';
    clearTimeout(getterTimeout);
    getSuccessIndicator.classList.remove('on');
  }
});

resetCounter.addEventListener('click', () => {
  counter01.textContent = 0;
  counter02.textContent = 0;
  counter03.textContent = 0;

  objArray = [];
})

//  Object generator function
// 1. generating random number for data property;
// 2. creating object with data property equal to random number;
// 3. placeing object in public objects array;

const generator = () => {
  const number = Math.floor(Math.random() * 100);
  const obj = {
    data: number
  }
  objArray.push(obj);
}
// Running object generator with random interval
// 1. creating recursive timeout function inside of witch we generate delay and call generator function

const startGeneratorFunction = () => {
  generatorTimeout = setTimeout(function startGenerate() {
    generatorDelay = getRandomDelay(1000, 10000);
    generator();
    generatorTimeout = setTimeout(startGenerate, generatorDelay);
  }, generatorDelay)
};

// Running object getter function
// 1. Creating recursive timeout with StartGetting function
// 2. Inside this function we are extracting 1 element from public object-array
// 3. Checking data property in current extracted object and dedicating of wich counter should be incremented
// 4. Checking if no current object, we increasin dejay amount by 1000 mili-seconds

const startGetterFunction = () => {
  getterTimeout = setTimeout(function startGetting() {
    const currentObj = objArray.shift();
    if (!currentObj) {
      getSuccessIndicator.classList.remove('on')
    } else {
      getSuccessIndicator.classList.add('on')
    }
    if (currentObj && currentObj.data < 30) {
      counter01value++;
      counter01.textContent = counter01value;
    } else if (currentObj && currentObj.data >= 30 && currentObj.data < 70) {
      counter02value++;
      counter02.textContent = counter02value;
    } else if (currentObj && currentObj.data >= 70) {
      counter03value++;
      counter03.textContent = counter03value;
    }
    if (!currentObj) {
      getDelay = getDelay + 1000;
    }
    getterTimeout = setTimeout(startGetting, getDelay);
  }, getDelay)
}