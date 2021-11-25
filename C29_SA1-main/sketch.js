const Engine = Matter.Engine;
// render to display
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
// constraint = connect 2 bodies
const Constraint = Matter.Constraint;
const Body = Matter.Body;
// composites = to store multiple rectangles in single variable
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
let fruit;
var rope;
var link;
var rabbit, buttonImg, bg, melon;

var blinking, eating, sad;

var cut, bkSound, sadSound, eatingSound, air;

function preload(){
rabbit = loadImage("Rabbit-01 (1).png");
buttonImg = loadImage("cut_button.png");
bg = loadImage("garden_bg.jpg");
melon = loadImage("carrot.png");

blinking = loadAnimation("imgs/blink_1.png", "imgs/blink_2.png", "imgs/blink_3.png");
eating = loadAnimation("imgs/eat_0.png", "imgs/eat_1.png", "imgs/eat_2.png", "imgs/eat_3.png", "imgs/eat_4.png");
sad = loadAnimation("imgs/sad_1.png", "imgs/sad_2.png", "imgs/sad_3.png");

blinking.playing = true;

sad.playing = true;
sad.looping = false;

eating.playing = true;
eating.looping = false;

cut = loadSound("rope_cut.mp3");
bkSound = loadSound("sound1.mp3");
sadSound = loadSound("sad.wav");
eatingSound = loadSound("eating_sound.mp3");
air = loadSound("air.wav");
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canw = displayWidth
    canh = displayHeight
    createCanvas(displayWidth+80, displayHeight)
  }
  else{
    canw = windowWidth
    canh = windowHeight
    createCanvas(windowWidth, windowHeight)
  }
  bkSound.play();
  bkSound.setVolume(0.5);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(canw/2,canh,displayWidth+80,20);

  rope = new Rope(7, {x: 220, y:30})
  rope2 = new Rope(6, {x: 350, y:30})
  rope3 = new Rope(7, {x: 550, y:85})

blinking.frameDelay = 20;
sad.frameDelay = 20;
eating.frameDelay = 20;

  bunny = createSprite(420, 600, 100, 100);
  bunny.addImage(rabbit);
  bunny.addAnimation("blinking", blinking);
  bunny.addAnimation("eating", eating);
  bunny.addAnimation("sad", sad);
  bunny.changeAnimation("blinking", blinking); 
  bunny.scale = 0.25;

button = createImg("cut_button.png");
button.position(220, 30);
button.size(50, 50);
button.mouseClicked(drop);

button2 = createImg("cut_button.png");
button2.position(350, 30);
button2.size(50, 50);
button2.mouseClicked(drop2);

button3 = createImg("cut_button.png");
button3.position(550, 85);
button3.size(50, 50);
button3.mouseClicked(drop3);

mute = createImg("mute.png");
mute.position(450, 30);
mute.size(50, 50);
mute.mouseClicked(muteSound);

/*balloon = createImg ("balloon.png");
balloon.position(100, 300);
balloon.size(100, 100);
balloon.mouseClicked(airforce);*/

  fruit = Bodies.circle(250, 350, 30);
 World.add(world, fruit);

  link = new Link(rope, fruit)
  link2 = new Link(rope2, fruit)
  link3 = new Link(rope3, fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg, 0, 0, displayWidth+80, displayHeight);
  ground.show();
  
  Engine.update(engine);

  
  push ()
  imageMode (CENTER)
  if(fruit!=null){
    image(melon, fruit.position.x, fruit.position.y, 50, 50)
  }

 pop ()

 if(collision(fruit, ground.body)===true){
  bunny.changeAnimation("sad", sad);
  sadSound.play();
}

if(collision(fruit, bunny)===true){
  bunny.changeAnimation("eating", eating);
  eatingSound.play();
}

   rope.show()
   rope2.show()
   rope3.show()
   drawSprites()
}

function drop(){
cut.play();
link.detach()
rope.break()
}


function drop2(){
  cut.play();
  link2.detach()
  rope2.break()
  }

  
function drop3(){
  cut.play();
  link3.detach()
  rope3.break()
  }

function collision(body1, body2){
 if(body1!=null){
    var distance = dist(body1.position.x, body1.position.y, body2.position.x, body2.position.y)
    if(distance<=80){
      World.remove(world, fruit)  
      fruit = null
      return true
    }
    else{
      return false
    }
  }
}

function muteSound(){
  if (bkSound.isPlaying()){
bkSound.stop()
  }
  else{
    bkSound.play()
  }
}

/*function airforce(){
  Matter.Body.applyForce(melon, {x:0,y:0}, {x:0.05,y:0})
  air.play();
}*/