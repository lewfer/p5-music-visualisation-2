function preload() {
  sound = loadSound('MrJuan_12_OClock.mp3')
}

function setup() {
  let canvas = createCanvas(600, 600)
 
  // Create a sound visualiser
  startSoundVisualiser()
  
  // Turn on the microphone input
  //enableMicrophone()
  
  // Handle the mouse click event to play/pause the music
  canvas.mouseClicked(togglePlay)  
}

function draw() {
  // Analyse the sound being played
  analyseSound()

  // Set the background colour
  background(220)
  
  // Draw some simple shapes
  //simpleShapes()
  
  // Draw some dancing shapes
  //dancingShapes()
  myDance()
}

function simpleShapes() {
  // Draw some simple shapes
  line(50,100,150,200)
  circle(250,100, 150)
  ellipse(450,100, 150, 100)
  triangle(100,300, 20,400, 150,450)
  quad(200,300, 330,300, 350,430, 170,400)
  rect(400,300, 150, 100)
  
  // Draw a custom shape
  beginShape();
  vertex(300, 540);
  vertex(340, 460);
  vertex(430, 530);
  vertex(460, 530);
  vertex(470, 570);
  vertex(370, 530);
  endShape(CLOSE);      
}

function dancingShapes() {
  // Circle
  circle(100+energyAll, 100, 10)
  circle(100-energyAll, 100, 10)
  circle(100, 100+energyAll, 10)
  circle(100, 100-energyAll, 10)
  
  // Line
  line(300, 100+energyBass, 
       400, 100-energyTreble)
  
  // Triangle
  triangle(400+energyBass, 200+energyTreble, 
           350, 300, 
           450, 300)
  
  // Quad
  quad(200-energyHighMid, 400, 
       240+energyTreble, 430, 
       210+energyLowMid, 500, 
       180-energyBass, 500)
  
  // Drummer
  circle(200,200,10)
  line(100, 200+energyBass, 
       200, 200)
  line(200, 200, 
       300, 200+energyTreble)
    
  // Custom shape
  beginShape();
  vertex(305+energyBass, 510);
  vertex(440, 445);
  vertex(430-energyLowMid/5, 412);
  vertex(466+energyLowMid/5, 405);
  vertex(471, 454);
  vertex(538, 423-energyTreble);
  vertex(550, 465-energyTreble);
  vertex(480, 478);
  vertex(463, 561-energyHighMid/5);
  vertex(419, 554-energyHighMid/5);
  vertex(449, 478);
  vertex(322+energyBass, 544);
  endShape(CLOSE);  
}

function dancingColours() {
  // Dancing colours
  push()
  redness = 255
  fill(color(redness, 0, 0))
  circle(150, 350, 50)  
  pop()  
}

function myDance() {
  // Add your dance code here  
  
  // Draw the wave
  // wave(300, 300, 200, 100)
  
  // Draw the frequency chart
  // frequencyChart(200, 300, 200, 100);
  // frequencyBars(200, 300, {numBars:20, colour:color(60, 200, 60)})
  // frequencyRadial(300, 300, {radius:100, numBars:30, barWidth:10, barHeight:50, colour:color("red")})
  // energyCircle(300,300, {energy:"bass", radius:150, fillColour:color("yellow"), strokeColour:color("yellow")})
  
  // Lead cat
  // ---------------------------
  
  // Make it rotate a bit
  dir = 1
  push()
  if (energyBass>90) {
    adjustment = 3*energyBass*dir/100
    translate(300, 300);
    rotate(adjustment)
    translate(-300, -300);
    dir *= -1
  }
  
  // Draw it
  cat(300, 300, 1,
         {mouthHeight:30 * energyAll/100,
          tailWag:30 * energyAll/100,
          whiskerWaveHeight:20,
          bodyColour:color(231, 122,122)  
          });  
  energyCircle(300,400, {energy:"treble", radius:100, fillColour:color(255, 122,122), strokeColour:color(255, 122,122)})
  pop()
  

  // Bass cat
  // ---------------------------
  adjustment = 20*energyBass/100
  cat(150, 80-adjustment, 0.5, 
        {mouthHeight:30 * energyBass/100,
        tailWag:30 * energyBass/100,
        whiskerWaveHeight:10,
        bodyColour:color(15, 155, 155)})
  
  // Mid cat
  // ---------------------------
  cat(300, 80, 0.5,
        {mouthHeight:30 * energyMid/100,
        tailWag:30 * energyMid/100,
        whiskerWaveHeight:10,
        eyePupilOffset:5*energyMid*random([-1,1])/100,
        bodyColour:color(155, 15, 155)})
  
  // Treble cat
  // ---------------------------
  adjustment = 20*energyTreble/100
  cat(450+adjustment, 80, 0.5, 
        {mouthHeight:30 * energyTreble/100,
        tailWag:30 * energyTreble/100,
        whiskerWaveHeight:10,
        eyePupilOffset:5*energyTreble*random([-1,1])/100,
        bodyColour:color(155, 155, 15),
        eyeColour:color(255, 255-255*energyTreble/100, 255-255*energyTreble/100)})     
      
}


function togglePlay() {
  // Turn the music on or off
  if (sound.isPlaying()) {
    sound.pause()
  } else {
    sound.loop()
  }
}