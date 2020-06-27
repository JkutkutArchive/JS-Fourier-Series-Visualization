// Fourier Series
// Jkutkut
// Based on the code from the coding train:
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html

let time = 0;
let wave = []; // the actual respresentation. Only the y values (f(x)) are stored

let nSlider, eSlider, a0Input, anInput, updateBtn;
let a0, an, bn, dN;
let period = 2 * Math.PI

let xCoord = function(ele){
    return ele.x + ele.width;
}


function updateF(){ //Change the fourier series based on an, bn and a0
    predN = dN
    try{
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
    }
    catch(error){
        console.log("Invalid value of Δn. It should be like \"n + 1\", \"2 * n + 1\"");
        console.log(error);
        alert("Invalid value of Δn. It should be like \"n + 1\", \"2 * n + 1\"\n"+error);
        dN = predN;
    }

    preA0 = a0
    try{
        if(isNaN(eval(a0Input.value())) || typeof eval(a0Input.value()) != "number"){
            throw "a0 must be a number!";
        }
        a0 = eval(a0Input.value())
    }
    catch(error){
        console.log("Invalid value of a0.");
        console.log(error);
        alert("Invalid value of a0.\n"+error);
        a0 = preA0;
    }

    preAn = an;
    try{
        if(!RegExp("^[n0-9+\\-*\\/ ()Math\\.,PIEpowsqr]+$").test(anInput.value())){
            throw "The syntax is not correct.";
        }
        eval("an = function(n){return " + anInput.value() + "}");
    }
    catch(error){
        console.log("Invalid value of an.");
        console.log(error);
        alert("Invalid value of an.\n"+error);
        an = preAn;
    }

    preBn = bn;
    try{
        if(!RegExp("^[n0-9+\\-*\\/ ()Math\\.,PIEpowsqr]+$").test(bnInput.value())){
            throw "The syntax is not correct.";
        }
        eval("bn = function(n){return " + bnInput.value() + "}");
    }
    catch(error){
        console.log("Invalid value of bn.");
        console.log(error);
        alert("Invalid value of bn.\n"+error);
        bn = preBn;
    }

    wave = [];
    
}

function setup() {
  createCanvas(650, 500);
  // Sliders
  nSlider = createSlider(1, 50, 10);
  nSlider.position(10, height - 50);
  eSlider = createSlider(1, 250, 100);
  eSlider.position(10, height - 20);
  
  // Inputs
  a0Input = createInput("0")
  a0Input.position(nSlider.x + 230, nSlider.y)

  anInput = createInput("4 / (n * Math.PI)")
  anInput.position(eSlider.x + 230, eSlider.y)

  bnInput = createInput("0")
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
  text('Scale', xCoord(eSlider), eSlider.y);
  text('a0 / 2', xCoord(nSlider) + 45, nSlider.y);
  text('an', xCoord(eSlider) + 60, eSlider.y);
  text('bn', xCoord(a0Input) + 10, nSlider.y);
  text('Δn', xCoord(updateBtn) + 8, updateBtn.y);


  translate(eSlider.value(), height / 2);

  let x = y = a0 * eSlider.value(); // coordinates of the center of the actual circle

  let useAn = an.toString() != "function(n){return 0}"; // CAN BE ON UPDATE
  let useBn = bn.toString() != "function(n){return 0}";

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


  if (wave.length > width / 2) { // No need to store all the wave, remove the end when it gets out of the window
    wave.pop();
  }
}