/* The snake in the game */

var Snake = function (x, y, context, rasterSize) {
    this.xPos = x;
    this.yPos = y;
    this.context = context;
    this.rasterSize = rasterSize;
    this.direction = "right";
    this.lastDirection = "right";

    this.SnakeArray = [];
};

function iniSnake(x, y, context, rasterSize) {
    snake = new Snake(x, y, context, rasterSize);

    snake.addSnakeElement(++x, y, context, rasterSize);
    snake.addSnakeElement(++x, y, context, rasterSize);
    snake.addSnakeElement(++x, y, context, rasterSize);

    return snake;
}

Snake.prototype.drawSnake = function () {
    var i;

    for (i = 0; i < this.SnakeArray.length; i++) {
        this.SnakeArray[i].drawSnakeElement();
    }
};

Snake.prototype.addSnakeElement = function (x, y, context, rasterSize) {
    this.SnakeArray.unshift(new SnakeElement(x, y, context, rasterSize));
};

Snake.prototype.update = function () {
    this.positionUpdate();
    this.wallCollision();
    this.selfCollsisonUpdate();

    //If Apple is eaten last Snake Element is not poped
    if (!this.isAppleEaten()) {
        this.SnakeArray.pop();

    }

    this.isApple2Eaten();

    //helps prevent the snake from turning back
    this.lastDirection = this.direction;
    this.drawSnake();
};

Snake.prototype.positionUpdate = function () {
    switch (this.direction) {
        case "right":
            this.addSnakeElement(++this.xPos, this.yPos, this.context, this.rasterSize);
            break;
        case "left":
            this.addSnakeElement(--this.xPos, this.yPos, this.context, this.rasterSize);
            break;
        case "up":
            this.addSnakeElement(this.xPos, --this.yPos, this.context, this.rasterSize);
            break;
        case "down":
            this.addSnakeElement(this.xPos, ++this.yPos, this.context, this.rasterSize);
            break;
        default:
            break;
    }
};

Snake.prototype.selfCollsisonUpdate = function () {
    var i;
    for (i = 4; i < this.SnakeArray.length; i++) {
        if (this.SnakeArray[0].xPos === this.SnakeArray[i].xPos && this.SnakeArray[0].yPos === this.SnakeArray[i].yPos) {
            //Game Over sound
            var sound = document.getElementById("gameover");
            sound.play();

            game.replay();
        }
    }
};

//Returns True if Apple is eaten and sets it to a random position
Snake.prototype.isAppleEaten = function () {
    if (this.SnakeArray[0].xPos === game.gameApple().xPos && this.SnakeArray[0].yPos === game.gameApple().yPos) {
        game.gameApple().positionReset();
        game.gameScore().addPoints(9);
        return true;
    }
};

Snake.prototype.isApple2Eaten = function () {
    if (this.SnakeArray[0].xPos === game.gameApple2().xPos && this.SnakeArray[0].yPos === game.gameApple2().yPos) {
        game.gameApple2().positionReset();
        game.gameScore().addPoints(-9);
        return true;
    }
};

Snake.prototype.wallCollision = function () {
    if (this.SnakeArray[0].xPos >= (game.gameW()) || this.SnakeArray[0].yPos >= (game.gameH()) ||
        this.SnakeArray[0].yPos < 0 || this.SnakeArray[0].xPos < 0) {
        //Game Over sound
        var sound = document.getElementById("gameover");
        sound.play();

        game.replay();
        return true;
    }
};





