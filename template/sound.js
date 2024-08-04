/*
* Functions for sound visualisation
*/

// Global variables
//let sv = {}
let fft
let mic
let spectrum
let waveform
let energyBass
let energyLowMid
let energyMid
let energyHighMid
let energyTreble
let energyAll

function startSoundVisualiser() {
  
  // Create an object to analyse the frequencies in the sound wave
  fft = new p5.FFT();
  
  angleMode(DEGREES);
}

function analyseSound() {

    // Analyse frequency spectrum
    spectrum = fft.analyze();

    // Analyse amplitude by time
    waveform = fft.waveform();  

    // Analyse specific frequencies
    energyBass = round(fft.getEnergy("bass")/255.0*100);
    energyLowMid = round(fft.getEnergy("lowMid")/255.0*100);
    energyMid = round(fft.getEnergy("mid")/255.0*100);
    energyHighMid = round(fft.getEnergy("highMid")/255.0*100);
    energyTreble = round(fft.getEnergy("treble")/255.0*100);
    energyAll = round(fft.getEnergy("bass", "treble")/255.0*100);
}

function enableMicrophone() {
    // Create an audio input from the microphone
    mic = new p5.AudioIn(soundError);
    mic.start();

    // Connect the microphone to the frequency analyser
    fft.setInput(mic);    
}

function soundError() {
    print("Sound error")
}

function wave(x, y, w, h) {
  // Draw a wave centred at x,y along a line w long and with waves h high
  push();
  translate(x, y)
  beginShape();
  noFill()
  stroke(0);
  //print(sv)
  for (let i = 0; i < waveform.length; i++) {
    let xPoint = map(i, 0, waveform.length, -w, w);
    let yPoint = map(waveform[i], -1, 1, -h, h);
    vertex(xPoint, yPoint);
  }
  endShape();
  pop();
}

function frequencyChart(x, y, w, h) {
    // Draw a frequency chart with bottom left at x,y and width w and height h
    push();
    translate(x, y-h);
    noStroke();
    fill(255, 0, 0);
    for (let i = 0; i < spectrum.length; i++) {
      let xBar = map(i, 0, spectrum.length, 0, w);
      let hBar = -h + map(spectrum[i], 0, 255, h, 0);
      rect(xBar, h, w / spectrum.length, hBar)
    }
    pop()
}


function frequencyBars(x, y, params) {
    // Draw a frequency chart with bottom left at x,y
    
    // Set up default parameters
    params = params || {}
    params.w = params.w || 200
    params.h = params.h || 100
    params.numBars = params.numBars || 10
    params.barGap = params.barGap || 2
    params.lowFreq = params.lowFreq || 0
    params.highFreq = params.highFreq || spectrum.length
    params.colour = params.colour || color(255, 0, 0)
    
    // Draw the bars
    push(); // save state
      translate(x, y); // move to origin
      let barWidth = params.w/params.numBars // compute bar width
      strokeWeight(barWidth);
      stroke(params.colour);
      noFill();
    
      // Draw the bars
      for (let i = 0; i < params.numBars; i++) {
        let x = int(map(i, 0, params.numBars, params.lowFreq, params.highFreq)); // x position of bar
        let hBar = map(spectrum[x], 0, 255, 0, params.h); // calc height of bar based on magnitude at the frequency
        line(i * (barWidth + params.barGap), 0, i * (barWidth + params.barGap), -hBar) // draw one bar
      }
    pop()
}


function frequencyRadial(x, y, params) {
    // Draw a circular radial chart of frequencies, centred at x, y

    // Set up default parameters
    params = params || {}
    params.radius = params.radius || 100
    params.numBars = params.numBars || 30
    params.barWidth = params.barWidth || 10
    params.barHeight = params.barHeight || 50
    params.lowFreq = params.lowFreq || 0
    params.highFreq = params.highFreq || spectrum.length
    params.colour = params.colour || color("red")
    
    // Draw the chart
    push()
      translate(x, y)// move to origin
    
      // Set up
      let step = 360/params.numBars // compute number of degrees to step around the circle for each bar
      let angle = 0 // current angle
      strokeWeight(params.barWidth)
      stroke(params.colour)
      noFill()
    
      // Draw the chart
      for (let i = 0; i < params.numBars; i++) {
        // Compute which frequency corresponds to this bar
        let x = int(map(i, 0, params.numBars, params.lowFreq, params.highFreq))
        
        // Compute height of bar based on the frequency
        let hBar = -map(spectrum[x], 0, 255, 0, params.barHeight)

        // Compute the coordinates of the bars
        angle = angle + step
        var x1 = params.radius * cos(angle)
        var x2 = (params.radius - hBar) * cos(angle)
        var y1 = params.radius * sin(angle)
        var y2 = (params.radius - hBar) * sin(angle)

        // Plot the bar
        line(x1, y1, x2, y2)
      }
    pop()
  }


function energyCircle(x, y, params) {
    // Draw a circle centred at x,y based on a specific energy level
    
    // Set up default parameters
    params = params || {}
    params.radius = params.radius || 20
    params.energy = params.energy || "all"
    params.fillColour = params.fillColour || color(255,0,0)
    params.strokeColour = params.strokeColour || color(0,0,0)
    
    let energy
    switch(params.energy) {
      case "all" : energy = energyAll; break
      case "bass" : energy = energyBass; break
      case "lowMid" : energy = energyLowMid; break
      case "mid" : energy = energyMid; break
      case "highMid" : energy = energyHighMid; break
      case "treble" : energy = energyTreble; break
    }
    
    // Draw the circle
    push()
    stroke(params.strokeColour)
    fill(params.fillColour)
    circle(x, y, int(params.radius*energy/100))
    
    pop()
  }
  

function cat(x, y, size, params) {
    // Set up default parameters
    params = params || {}
    params.earWidth = params.earWidth || 50
    params.headSize = params.headSize || 100
    params.noseSize = params.noseSize || 10
    params.eyeW = params.eyeW || 20
    params.eyeH = params.eyeH || 15
    params.eyeRotation = params.eyeRotation || 30
    params.eyePupilOffset = params.eyePupilOffset || 0
    params.bodySize = params.bodySize || 140
    params.tailWag = params.tailWag || 0
    params.legW = params.legW || 80
    params.legH = params.legH || 40
    params.legRotation = params.legRotation || 30
    params.mouthHeight = params.mouthHeight || 0 
    params.whiskerLength = params.whiskerLength || 100
    params.whiskerWaveHeight = params.whiskerWaveHeight || 0
    params.bodyColour = params.bodyColour || color(255, 0, 0)
    params.eyeColour = params.eyeColour || color(255, 255, 255)
    params.mouthColour = params.mouthColour || color(0,0,0)
  
   
    noStroke();
    fill(params.bodyColour);

    push();

    translate(x, y)
    scale(size);

    // Left ear
    push()
    translate(0, -40)
    rotate(35)
    triangle(0, 0, params.earWidth / 2, -50, params.earWidth, 0)
    pop()

    // Right ear
    push()
    translate(0, -40)
    rotate(-35)
    triangle(0, 0, -params.earWidth / 2, -50, -params.earWidth, 0)
    pop()

    // Head
    circle(0, 0, params.headSize)

    // Nose
    fill("black")
    circle(0, 0, params.noseSize)

    // Left eye
    push()
    fill(params.eyeColour)
    translate(-15, -15)
    rotate(params.eyeRotation)
    ellipse(0, 0, params.eyeW, params.eyeH)
    fill("black")
    circle(params.eyePupilOffset, 0, 10)
    pop()

    // Right eye
    push()
    fill(params.eyeColour)
    translate(15, -15)
    rotate(-params.eyeRotation)
    ellipse(0, 0, params.eyeW, params.eyeH)
    fill("black")
    circle(params.eyePupilOffset, 0, 10)
    pop()


    // Body
    fill(params.bodyColour)
    circle(0, 120, params.bodySize) // main body
    circle(0, 60, 40) // neck
    ellipse(0, 175, 80, 40) // bottom

    // Tail
    push()
    noFill();
    strokeWeight(15);
    stroke(params.bodyColour);
    beginShape();
    curveVertex(0, 180);
    curveVertex(0, 180);
    curveVertex(70, 150);
    curveVertex(100, 80 - params.tailWag);
    curveVertex(130, 50 + params.tailWag);
    curveVertex(150, 90 - params.tailWag);
    curveVertex(150, 90 - params.tailWag);
    endShape();
    pop()

    // Legs
    push()
    translate(-50, 165)
    rotate(params.legRotation)
    ellipse(0, 0, params.legW, params.legH)
    pop()

    push()
    translate(50, 165)
    rotate(-params.legRotation)
    ellipse(0, 0, params.legW, params.legH)
    pop()

    // Mouth
    push()
    fill(params.mouthColour)
    ellipse(0, 15 + params.mouthHeight / 2, 10, params.mouthHeight)
    pop()

    // Whiskers
    push();
    noFill();
    //translate(width / 2, height / 2)
    wave(0, 0, params.whiskerLength, params.whiskerWaveHeight)

    rotate(20)
    wave(0, 0, params.whiskerLength, params.whiskerWaveHeight)

    rotate(-40)
    wave(0, 0, params.whiskerLength, params.whiskerWaveHeight)
    pop();

    pop();

  }  