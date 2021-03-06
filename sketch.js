//Create variables here
var dog, dogImg, happyDog, database, foodS, foodStock;
var bg;
function preload()
{
  //load images here
  bg = loadImage("images/day.jpg");

  dogImg = loadImage('images/dogImg.png');
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  dog = createSprite(800, 350, 100, 100);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  
}


function draw() {
  background(bg);  

  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  push();
  textSize(25);
  strokeWeight(4);
  stroke(255, 120, 0);
  fill(0);
  textAlign(CENTER);
  text("Press Up arrow key to feed the dog", width/2, 100);
  pop();
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else if(x>0){
    x=x-1;
  }
  database.ref("/").update({
    'Food': x
  })
}



async function getTime(){

  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responsejson = await response.json();
    var dt = responsejson.datetime;
    var hr = dt.slice(11, 13);

    if(hr>=06&&hr<18){
      bg = loadImage("images/day.jpg");
    }
    else if (hr>=18&&hr<06){
      bg = loadImage("images/night.jpg");
    }

}



