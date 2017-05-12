/* The snake in the game */

var Snake = function(x, y, context, rasterSize) {
    this.xPos = x;
    this.yPos = y;
    this.context = context;
    this.rasterSize = rasterSize;



    this.SnakeArray = [];

};
/*
Snake.prototype.moveUp = function() {
    this.yPos -= this.hopSpeed;
};

Snake.prototype.moveDown = function() {
    this.yPos += this.hopSpeed;
};

Snake.prototype.moveLeft = function() {
    this.xPos -= this.hopSpeed;
};

Snake.prototype.moveRight = function() {
    this.xPos += this.hopSpeed;
};

*/


Snake.prototype.drawSnake = function() {
    var i;
    for (i = 0; i < this.SnakeArray.length; i++) {
        this.SnakeArray[i].drawSnakeElement();
    }

};

Snake.prototype.addSnakeElement = function (x, y, context, rasterSize) {
    this.SnakeArray.push(new SnakeElement(x, y, context, rasterSize));
};


function iniSnake(x, y, context, rasterSize){

    var snake = new Snake(x, y, context, rasterSize);

    snake.addSnakeElement(x, y, context, rasterSize);
    x -= 1;
    snake.addSnakeElement(x, y, context, rasterSize);
    x -= 1;
    snake.addSnakeElement(x, y, context, rasterSize);
    snake.drawSnake();

}
