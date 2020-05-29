//Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const shakeButton = document.querySelector('.shake');
const up = document.querySelector('.uparrow');
const down = document.querySelector('.downarrow');
const left = document.querySelector('.leftarrow');
const right = document.querySelector('.rightarrow');

const MOVE_AMOUNT = 10; //variables with caps & underscore usually mean that the value will not change!

//Setup our canvas
const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

//stroke changing colour
let hue = 0;
ctx.strokeStyle= `hsl(${hue}, 100%, 50%)`

const { width, height } = canvas;

//create random x and y points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

//where we place a dot
ctx.beginPath(); //start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();


//Write a draw function for key
function draw({ key, value }) {
  ctx.beginPath();
  ctx.moveTo(x, y);

  //update x and y to new coordinates
  switch(key) {
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;
    default:
        break;
  }

  switch(value) {
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;
    default:
        break;
  }

  ctx.lineTo(x, y);
  ctx.stroke();

    //Rainbow colour in line. Increments hue
    ctx.strokeStyle= `hsl(${hue += 1}, 100%, 50%)`
}

//Write a handler for the keys
function handleKey(e) {
  if(e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

//Function to use arrow keys
function handleArrowClick(event) {
  if(event.currentTarget.value.includes("Arrow")) {
    event.preventDefault();
    draw({ value: event.currentTarget.value });
  }
}

//clear/shake function
function clearCanvas() {
  canvas.classList.add('shake');
  //clear canvas
  ctx.clearRect(0, 0, width, height);
  //shake canvas when clearing
  canvas.addEventListener('animationend', function() {
    canvas.classList.remove('shake');
  }, { once: true })
}

//listen for arrow keys, arrow clicks & shake button
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
up.addEventListener('click', handleArrowClick);
down.addEventListener('click', handleArrowClick);
left.addEventListener('click', handleArrowClick);
right.addEventListener('click', handleArrowClick);