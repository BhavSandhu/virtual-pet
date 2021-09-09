//Create variables here
var dog, dog1img
var dog2img
var database
var foodS
var foodStock
var fedTime


function preload() {

  //load images here
  dog1img = loadImage("Dog.png")
  dog2img = loadImage("happydog.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database()

  dog = createSprite(250, 400)
  dog.addImage("hungryDog", dog1img)
  dog.scale = 0.2


  foodStock = database.ref('food');
  foodStock.on("value", readStock, showError);

  fedTime = database.ref('feedTime')
  fedTime.on("value", function (data) {
    lastFed = data.val();


  })
}


function draw() {
  background(46, 139, 87)

if(keyDown(UP_ARROW)){
  if(foodS>0){
    foodS=foodS-1
  }

writeStock(foodS)

}
  drawSprites();
  //add styles here
  fill("white")
  text("press the UP_ARROW key to feed drago!",150,100)
  text("Food Remaining:"+foodS,210,200)
  



}


function readStock(data) {

  foodS = data.val()
  console.log(foodS)

}

function showError() {


  console.log("cannot fetch data")
}

function writeStock(x){
database.ref('/').update({

  food:x
})




}
