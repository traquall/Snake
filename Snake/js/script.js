$(document).ready(function(){

  var dir = "droite";
  var speed = 100; // intervalle de rafraichissement de l'image (1sec)
  var canvas = $("#canvas")[0];
  var wMap = 500;
  var hMap = 500;
  var pas = 10; // nombre de pixel pour un mouvement
  var ctx = canvas.getContext('2d');
  var snake = [];
  var initPosX = 5 * pas;
  var initPosY = 5 * pas;
  var fruit = { x:0, y:0};

  function init(){
    createMap();
    createSnake();
    createFruit();

    setInterval(animate, speed);
  }

  init();

  function animate(){

    console.log("coucou");

    move();
    if(checkCollision() == false)
      regame();

    paint();

  }

  function paint(){

    createMap();

    for (var i = 0; i < snake.length; i++) {
      // dessin du snake
      ctx.beginPath();
      ctx.fillStyle="green";
      ctx.rect(snake[i].x,snake[i].y,pas,pas);
      ctx.fill();
    }

    // dessin du fruit
    ctx.beginPath();
    ctx.fillStyle="red";
    ctx.rect(fruit.x,fruit.y,pas,pas);
    ctx.fill();
  }

  function move(){
    var newCell = snake.pop();



    if(dir == "gauche"){
      newCell.x = snake[0].x - pas;
      newCell.y = snake[0].y;
    }
    else if (dir == "droite"){
      newCell.x = snake[0].x + pas;
      newCell.y = snake[0].y;
    }
    else if (dir == "haut") {
      newCell.x = snake[0].x;
      newCell.y = snake[0].y - pas;
    }
    else if (dir == "bas") {
      newCell.x = snake[0].x;
      newCell.y = snake[0].y + pas;
    }

    snake.unshift(newCell);
  }

  function checkCollision(){

    for (var i = 1; i < snake.length; i++) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
          return false;
        }
    }

    if(dir == "gauche" && snake[0].x <= 0){
      return false;
    }
    if(dir == "droite" && snake[0].x >= 500-(1*pas)){
      return false;
    }
    if(dir == "haut" && snake[0].y <= 0){
      return false;
    }
    if(dir == "bas" && snake[0].y >= 500-(1*pas)){
      return false;
    }
    return true;
  }

  function createMap(){
    // map
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.rect(0,0,500,500);
    ctx.fill();

    // contour de la map
    ctx.beginPath();
    ctx.lineWidth="10";
    ctx.strokeStyle="black";
    ctx.rect(0,0,500,500);
    ctx.stroke();
  }

  function createSnake(){

    for (var i = 0; i < 5; i++) {
      snake[i] = { x : initPosX+i, y : initPosY};
    }

    for (var i = 0; i < snake.length; i++) {
      // dessin du snake
      ctx.beginPath();
      ctx.fillStyle="green";
      ctx.rect(snake[i].x,snake[i].y,pas,pas);
      ctx.fill();
    }
  }

  function createFruit(){
    fruit = {
      x: pas * Math.floor((Math.random() * (500-pas)/pas) + 1),
      y: pas * Math.floor((Math.random() * (500-pas)/pas) + 1)
    };
  }

  function regame(){
  	// recharge la page pour recommencer une partie
  	window.location.reload();
  }

	$(document).keydown(function(e){
		var key = e.which;

		if(key == "37" && dir != "droite") dir = "gauche";
		else if(key == "38" && dir != "bas") dir = "haut";
		else if(key == "39" && dir != "gauche") dir = "droite";
		else if(key == "40" && dir != "haut") dir = "bas";
	})







})
