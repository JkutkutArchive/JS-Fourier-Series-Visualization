// Fourier Series
// Jkutkut
// Based on the code from the coding train:
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html


//      VARIABLES
let time = 0;
let wave = []; // the actual respresentation. Only the y values (f(x)) are stored

let nSlider, eSlider, a0Input, anInput, updateBtn; // UI
let a0, an, bn, dN; // parameters to generate the series 
let useAn, useBn; 
let initialX; period = 2 * Math.PI; // Period of the function


//      FUNCTIONS:

let xCoord = function(ele){
    return ele.x + ele.width;
}

function updateF(){ //Change the fourier series based on an, bn and a0
    let predN = dN;
    let preA0 = a0;
    let preAn = an;
    let preBn = bn;
    let v;
    try{
        v = "Δn";
        if(!RegExp("n").test(dNInput.value())){
            throw "No \"n\" found. Make sure to use the minus symbol.";
        }
        if(!RegExp("^[n0-9+\\-*\\/ ()]+$").test(dNInput.value())){
            throw "The syntax is not correct.";
        }
        eval("dN = function(n){return " + dNInput.value() + "}");
        if (dN(3) == 3){
            throw "This value can not be the identity \"n\".";
        }

        v = "a0";
        if(isNaN(eval(a0Input.value())) || typeof eval(a0Input.value()) != "number"){
            throw "a0 must be a number!";
        }
        a0 = eval(a0Input.value())

        v = "an";
        if(!RegExp("^[n0-9+\\-*\\/ ()Math\\.,PIEpowsqr]+$").test(anInput.value())){
            throw "The syntax is not correct.";
        }
        eval("an = function(n){return " + anInput.value() + "}");


        v = "bn";
        if(!RegExp("^[n0-9+\\-*\\/ ()Math\\.,PIEpowsqr]+$").test(bnInput.value())){
            throw "The syntax is not correct.";
        }
        eval("bn = function(n){return " + bnInput.value() + "}");

    }
    catch(error){
        console.log("Invalid value of " + v + ".");
        console.log(error);
        alert("Invalid value of " + v + ".\n"+error);
        dN = predN;
        a0 = preA0;
        an = preAn;
        bn = preBn;
    }

    wave = []; // Reset wave

    initialX = Math.abs(a0) * eSlider.value(); //calculate the initial X
    for(let i = 0; i < nSlider.value(); i++){
        let n = i + dN(i)
        initialX += (Math.abs(an(n)) + Math.abs(bn(n))) * eSlider.value();
    }
    if (initialX < 60){
        initialX = 60;
    }
    useAn = an.toString() != "function(n){return 0}"; // CAN BE ON UPDATE
    useBn = bn.toString() != "function(n){return 0}";
}

function linedash(x1, y1, x2, y2, delta, style = '-') {
    // delta is both the length of a dash, the distance between 2 dots/dashes, and the diameter of a round
    let distance = dist(x1,y1,x2,y2);
    let dashNumber = distance/delta;
    let xDelta = (x2-x1)/dashNumber;
    let yDelta = (y2-y1)/dashNumber;

    for (let i = 0; i < dashNumber; i+= 2) {
        let xi1 = i*xDelta + x1;
        let yi1 = i*yDelta + y1;
        let xi2 = (i+1)*xDelta + x1;
        let yi2 = (i+1)*yDelta + y1;

        if (style == '-') { line(xi1, yi1, xi2, yi2); }
        else if (style == '.') { point(xi1, yi1); }
        else if (style == 'o') { ellipse(xi1, yi1, delta/2); }
    }
}

function setup() {
  createCanvas(700, 500);
  // Sliders
  nSlider = createSlider(1, 50, 10);
  nSlider.position(10, height - 50);
  eSlider = createSlider(1, 250, 100);
  eSlider.position(10, height - 20);
  
  // Inputs
  a0Input = createInput("0")
  a0Input.position(nSlider.x + 230, nSlider.y)

  anInput = createInput("0")
  anInput.position(eSlider.x + 230, eSlider.y)

  bnInput = createInput("4 / (n * Math.PI)")
  bnInput.position(a0Input.x + 230, nSlider.y)

  dNInput = createInput("2 * n + 1")
  dNInput.position(bnInput.x + 109, eSlider.y)
  dNInput.size(bnInput.width / 3, bnInput.height)

  //Button:
  updateBtn = createButton("Update")
  updateBtn.position(anInput.x + 230, eSlider.y)
  updateBtn.size(bnInput.width / 3, bnInput.height)
  updateBtn.mousePressed(updateF)

  textSize(15);
  textAlign(LEFT, CENTER);

  updateF()
}

function draw() {
  background(0);
  fill(255)
  text('n', xCoord(nSlider), nSlider.y);
  text('Zoom', xCoord(eSlider), eSlider.y);
  text('a0 / 2', xCoord(nSlider) + 45, nSlider.y);
  text('an', xCoord(eSlider) + 60, eSlider.y);
  text('bn', xCoord(a0Input) + 10, nSlider.y);
  text('Δn', xCoord(updateBtn) + 8, updateBtn.y);


  

  translate(0, height / 2);
  
  stroke(255); // make the axis white
  linedash(0, 0, width, 0, 3)
  linedash(30, -height / 2, 30, height / 2, 3)


  let number = (height / 2) / eSlider.value(); //number of possible - that fit on the 1:1 scale on each side
  let ePerDash = 1;
  while (number < 4){
      number *= 2;
      ePerDash /= 2;
  }
  while (number > 8){
    number = number / 2;
    ePerDash *= 2;
  }

  let dY = ePerDash * eSlider.value();
  for(let i = 0; i < number; i++){
    let y = i * dY;
    stroke(255)
    line(35, y, 25, y);
    line(35, -y, 25, -y);

    stroke(255, 100)
    linedash(35, y, width, y, 3)
    linedash(35, -y, width, -y, 3)

    let m = i * ePerDash;
    if (ePerDash >= 1 || (ePerDash < 1 && i % 2 == 0)){
        textAlign(RIGHT)
        text((-m).toString(), 25, y)
        text((m).toString(), 25, -y)
        textAlign(LEFT, CENTER)
    }
  }

  translate(initialX, 0); //Initial position
  
  let x = 0
  let y = a0 * eSlider.value(); // coordinates of the center of the actual circle
  
  

  for (let i = 0; i < nSlider.value(); i++) {
    let n = dN(i);
    let angle = (2 * Math.PI * n * time) / (period);
    let prevx, prevy; // Coordinates of the previous circle's center
    let radius;
    // an:
    if (useAn){
        prevx = x, prevy = y; // Coordinates of the previous circle's center
        
        y += (an(n) * cos(angle)) * eSlider.value();
        // y += (a0 + an(n) * sin(angle)) * eSlider.value();
        x += (an(n) * sin(angle)) * eSlider.value();
        // x += (a0 + an(n) * cos(angle)) * eSlider.value();
        radius = an(n) * eSlider.value()
        
        stroke(255, 100); // make the line white with some alpha
        noFill(); // empty circle
        ellipse(prevx, prevy, radius * 2); // Draw circle
        
        stroke(255); // make the line pure white
        line(prevx, prevy, x, y); // Draw the radius of the circle
    }

    // bn:
    if (useBn){
        prevx = x, prevy = y; // Coordinates of the previous circle's center

        y += (bn(n) * sin(angle)) * eSlider.value()
        x += (bn(n) * cos(angle)) * eSlider.value()
        radius = bn(n) * eSlider.value()
        
        stroke(255, 100); // make the line white with some alpha
        noFill(); // empty circle
        ellipse(prevx, prevy, radius * 2); // Draw circle
        
        stroke(255); // make the line pure white
        line(prevx, prevy, x, y); // Draw the radius of the circle
    }
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


  if (wave.length > width - 300) { // No need to store all the wave, remove the end when it gets out of the window
    wave.pop();
  }
}