let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];

// Define a cabeça da cobrinha no centro na tela
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

// Define a comida da cobrinha
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box 
}

//cria o quadro do canvas
function createBG(){
    context.fillStyle = "white";
    context.fillRect(0, 0, 16*box, 16*box);
}

//cria a cobrinha
function createSnake(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//cria a comida
function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//adiciona um evento de teclado para essa função
document.addEventListener('keydown', update);

//função que define em que direção o jogo deve ir
function update (event){
    if(event.keyCode === 37 && direction !== "right")
        direction = "left";
    if(event.keyCode === 38 && direction !== "down")
        direction = "up";
   if(event.keyCode === 39 && direction !== "left")
        direction = "right";
    if(event.keyCode === 40 && direction !== "up")
        direction = "down";
}

//função de inicio do jogo
function playGame(){

    // configuração para a cobrinha passar para o outro lado da tela quando chegar ao fim do quadro, sem deixar uma linha vazia no ultimo quadrado
    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if(snake[0].x > 15 * box && direction == 'up') snake[0].x = 0;
    if(snake[0].x > 15 * box && direction == 'down') snake[0].x = 0;

    if(snake[0].x < 0  && direction == 'left') snake[0].x = 15 * box;
    if(snake[0].x < 0  && direction == 'up') snake[0].x = 15 * box;
    if(snake[0].x < 0  && direction == 'down') snake[0].x = 15 * box;

    if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if(snake[0].y > 15 * box && direction == 'right') snake[0].y = 0;
    if(snake[0].y > 15 * box && direction == 'left') snake[0].y = 0;

    if(snake[0].y < 0 && direction == 'up') snake[0].y = 15 * box;
    if(snake[0].y < 0 && direction == 'right') snake[0].y = 15 * box;
    if(snake[0].y < 0 && direction == 'left') snake[0].y = 15 * box;


    //verifica se a cobrinha se atingiu e se sim, faz o jogo acabar
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            alert('Game Over --- ');
            clearInterval(game);
            location.reload();
        }
    }


    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); 
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); 
}

let game = setInterval(playGame, 100);
