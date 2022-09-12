let log = console.log;
let doc = document;

// =======================> I - FOR TESTING PASSWORDS
// =======> 1. getting the value from the input

let testPassInput = doc.querySelector(`#input-pass`);
let testBtn = doc.querySelector(`#test-btn`);

testPassInput.onblur = () => {
  window.testThisPass = testPassInput.value;
};

// =======> 2. creating a regExp and testing

testBtn.addEventListener("click", () => {
  testPass();
});

let StrReg =
  /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/g;
let medReg = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,}$/g;

function testPass() {
  let testSpan = doc.querySelector(`#midOrStrg`);

  if (StrReg.test(testThisPass) === true) {
    displayStr();
    testSpan.setAttribute(`isItStr`, `yes`);
  } else {
    setTimeout(() => {
      testSpan.setAttribute(`isItStr`, `no`);
    }, 100);
    if (
      medReg.test(testThisPass) === true &&
      StrReg.test(testThisPass) === false
    ) {
      displayMid();
      testSpan.setAttribute(`isItMed`, `yes`);
      setTimeout(() => {
        testSpan.setAttribute(`isItMed`, `no`);
      }, 100);
    } else {
      if (
        testSpan.getAttribute(`isItMed`) === `no` &&
        testSpan.getAttribute(`isItStr`) === `no`
      ) {
        displayWeak();
      }
    }
  }
}

function displayStr() {
  let testSpan = doc.querySelector(`#midOrStrg`);

  testSpan.innerHTML = `<i class='bx bx-check-double' ></i> Strong`;
}
function displayMid() {
  let testSpan = doc.querySelector(`#midOrStrg`);

  testSpan.innerHTML = `<i class='bx bx-check' ></i> Medium`;
}
function displayWeak() {
  let testSpan = doc.querySelector(`#midOrStrg`);

  testSpan.innerHTML = `<i class='bx bx-x'></i> Weak`;
}

// =======================> II - FOR GENERATING PASSWORDS

let genBtn = doc.querySelector(`#gen-btn`);

genBtn.onclick = () => {
  generatePass();
};

function randomNum() {
  let theRandomNum = Math.floor(1000 + Math.random() * 1000);

  return theRandomNum;
}

function generatePass() {
  doc.querySelector(`#genInputPass`).textContent = `${randomOrder()}`;
}

function generateString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
function generateSp(length) {
  const characters = `!@#$&*`;
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
function randomOrder(length) {
  const characters = [
    generateString(4),
    generateSp(4),
    generateString(5).toLowerCase(),
    randomNum(),
  ];

  var shuffled = characters
    .toString()
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

  return shuffled;
}
