// Fourier Series
// Jkutkut
// Based on the code from the coding train:
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html

let time = 0;
let wave = []; // the actual respresentation. Only the y values (f(x)) are stored

let nSlider, eSlider, a0Input, anInput, updateBtn;
let a0 = 4 / Math.PI;
let an = function(n){return 1/n};
let bn = function(n){return 0};
let dN = function(n){return 2 * n + 1};

let xCoord = function(ele){
    return ele.x + ele.width;
}


function updateF(){ //Change the fourier series based on an, bn and a0

}

function setup() {
  createCanvas(650, 500);
  // Sliders
  nSlider = createSlider(1, 50, 10);
  nSlider.position(10, height - 50);
  eSlider = createSlider(20, 190, 76);
  eSlider.position(10, height - 20);
  
  // Inputs
  a0Input = createInput()
  a0Input.position(nSlider.x + 230, nSlider.y)

  anInput = createInput()
  anInput.position(eSlider.x + 230, eSlider.y)

  bnInput = createInput()
  bnInput.position(a0Input.x + 230, nSlider.y)

  dNInput = createInput()
  dNInput.position(bnInput.x + 123, eSlider.y)
  dNInput.size(bnInput.width / 4, bn.height)

  //Button:
  updateBtn = createButton("Update")
  updateBtn.position(anInput.x + 230, eSlider.y)
  updateBtn.size(bnInput.width / 2, bnInput.height)
  updateBtn.mousePressed(updateF)

  textSize(15);
  textAlign(LEFT, CENTER);
}

function draw() {
  background(0);
  fill(255)
  text('n', xCoord(nSlider), nSlider.y);
  text('Scale', xCoord(eSlider), eSlider.y);
  text('a0 / 2', xCoord(nSlider) + 45, nSlider.y);
  text('an', xCoord(eSlider) + 60, eSlider.y);
  text('bn', xCoord(a0Input) + 10, nSlider.y);
  text('Δn', xCoord(updateBtn) + 2, updateBtn.y);


  translate(eSlider.value() + 100, height / 2);

  let x = 0, y = 0; // coordinates of the center of the actual circle

  for (let i = 0; i < nSlider.value(); i++) {
    let n = dN(i);
    let prevx = x, prevy = y; // Coordinates of the previous circle's center

    // y += (a0 * (an(n) * sin((2 * n + 1) * time))) * eSlider.value()
    y += (a0 * (an(n) * sin(n * time) + bn(n) * cos(n * time))) * eSlider.value()
    x += (a0 * an(n) * cos(n * time)) * eSlider.value()

    let radius = a0 * an(n) * eSlider.value()

    stroke(255, 100); // make the line white with some alpha
    noFill(); // empty circle

    ellipse(prevx, prevy, radius * 2);

    stroke(255); // make the line pure white
    line(prevx, prevy, x, y); // Draw the radius of the circle
  }
  
  wave.unshift(y);


  translate(200, 0);
  line(x - 200, y, 0, wave[0]);
  beginShape(); // Start drawing the wave
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

//   time += 0.01;
  time += 0.05;


  if (wave.length > 250) { // No need to store all the wave, remove the end when it gets big
    wave.pop();
  }
}