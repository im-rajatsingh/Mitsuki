function init(){
   
   canvas = document.getElementById('mycanvas');
   pen = canvas.getContext("2d");
   W = canvas.width;
   H = canvas.height;
   game_over = false;

   food = getRandomFood();
   score = 5;

   snake={
      init_length:5,
      color: "lightgrey",
      cells:[],
      direction:"right",

      createSnake:function(){
        for (var i = this.init_length - 1; i >= 0; i--) {
          this.cells.push({x:i,y:0})
        }

      }, 


      drawSnake:function(){
        for (var i = 0; i < this.cells.length; i++) {
          pen.fillStyle = this.color;

          pen.strokeStyle = "black";
          pen.lineWidth = 5;

          pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);

          pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
        }
      },
      updateSnake:function(){
        var headX = this.cells[0].x;
        var headY = this.cells[0].y;

        //Assuminng Snake is Moving in the right direction
        //Insertion at head
        //nextHeadx = headX+1;
        //this.cells.unshift({x:nextHeadx,y:headY});

        if(headX==food.x && headY == food.y){
          food =getRandomFood();
          score++;
        }else{
          //Pop if food not eaten
          this.cells.pop();
        }

       if(this.direction == "right"){
        nextX = headX + 1;
        nextY = headY;
       }
       else  if(this.direction == "left"){
        nextX = headX - 1;
        nextY = headY;
       }
       else  if(this.direction == "down"){
        nextX = headX ;
        nextY = headY + 1;
       }
       else {
        nextX = headX;
        nextY = headY - 1;
       }

       //Insert the new cell at any direction
       this.cells.unshift({x:nextX, y:nextY});


       // cell boundaries for game over
       var last_x= Math.round(W/10);
       var last_y= Math.round(H/10);

       if(this.cells[0].y<0 || this.cells[0].x <0 ||
        this.cells[0].x > last_x || this.cells[0].y > last_y){
                  alert("Game Over");
                game_over = true;
       }
      }

   };

snake.createSnake();

//Add event listeners to the  game for movement
function Keypressed(info){

  if (info.key==="ArrowRight"){
    snake.direction= "right";
  }
  else  if(info.key==="ArrowLeft"){
    snake.direction= "left";
  }
  else  if(info.key==="ArrowDown"){
    snake.direction= "down";
  }
  else{
    snake.direction= "up";
  }
  
}



document. addEventListener('keydown',Keypressed);
}





function draw(){
  
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    //food Drawing
    pen.fillStyle = food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);

    pen.fillStyle = "white";
    pen.font = "14px Roboto";
    pen.fillText("Score: "+ score,10,10);

}





function update(){

    snake.updateSnake();

}




function startgame(){				
	draw();
	update();

  if(game_over == true){
    clearInterval(f);
  }
}


function getRandomFood(){
  var foodX = Math.round(Math.random()*(W-10)/10);
  var foodY = Math.round(Math.random()*(H-10)/10);  

  foodColors = ["red","green","crimson","aqua","white","orchid"];
  var i = Math.round(Math.random()*foodColors.length);

  var food={
    x:foodX,
    y:foodY,
    color:foodColors[i]
  };
  return food
}


init();
var f = setInterval(startgame,100);    //call game loop after t times
