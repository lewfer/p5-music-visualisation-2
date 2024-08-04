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
  simpleShapes()
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
  circle(100,100,10)
  
  // Line
  line(300, 100, 
       400, 100)
  
  // Triangle
  triangle(400, 200, 
           350, 300, 
           450, 300)
  
  // Quad
  quad(200, 400, 
       240, 430, 
       210, 500, 
       180, 500)
  
  // Drummer
  circle(200,200,10)
  line(100, 200, 
       200, 200)
  line(200, 200, 
       300, 200)
    
  // Custom shape
  beginShape();
  vertex(305, 510);
  vertex(440, 445);
  vertex(430, 412);
  vertex(466, 405);
  vertex(471, 454);
  vertex(538, 423);
  vertex(550, 465);
  vertex(480, 478);
  vertex(463, 561);
  vertex(419, 554);
  vertex(449, 478);
  vertex(322, 544);
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
}

function togglePlay() {
  // Turn the music on or off
  if (sound.isPlaying()) {
    sound.pause()
  } else {
    sound.loop()
  }
}