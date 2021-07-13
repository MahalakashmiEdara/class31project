const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var bg_img;
var food_img;
var rabbit,rabbit_img;
var button;
var blink;
var sad;
var eat;

function preload(){
bg_img=loadImage('background.png');
food_img=loadImage('melon.png');
rabbit_img=loadImage('Rabbit-01.png');
eat = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');
blink = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
sad = loadAnimation('sad_1.png','sad_2.png','sad_3.png');

blink.playing=true;
eat.playing=true;
eat.looping=false;

sad.playing=true;
sad.looping=false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  
  blink.frameDelay=20;
  eat.frameDelay=20;
   sad.frameDelay=20;
  rabbit = createSprite(250,650,100,100)
  //rabbit.addImage (rabbit_img)
  rabbit.scale = 0.2

  rabbit.addAnimation("blinking",blink);
  rabbit.addAnimation("eating",eat);
  rabbit.addAnimation("crying",sad);
  rabbit.changeAnimation('blinking');
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  imageMode(CENTER);
  
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,500,700);
  rope.show();
  push();
  imageMode(CENTER);

  if(fruit!=null){
  image(food_img,fruit.position.x,fruit.position.y,60,60);
  }
  pop();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,rabbit)== true){
    rabbit.changeAnimation('eating');
  }
  if(collide(fruit,ground.body)==true){
    rabbit.changeAnimation('crying');
  }

 drawSprites()

 
   
}
function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null ;
}
function collide(body,sprite){

  if(body!=null){
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80){
      World.remove(world,fruit);
      fruit=null;
      return true;
    }
    else{
      return false;
    }
  }
}