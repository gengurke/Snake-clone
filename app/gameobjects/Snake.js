/* The snake in the game */

var Snake = function(x, y, context, rasterSize) {
    this.xPos = x;
    this.yPos = y;
    this.context = context;
    this.rasterSize = rasterSize;
    this.direction = "right";



    this.SnakeArray = [];

};


// Snake.prototype.moveRight = function() {
//     this.xPos += 1;
// };
//


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


*/


Snake.prototype.drawSnake = function() {
    var i;

    for (i = 0; i < this.SnakeArray.length; i++) {
        this.SnakeArray[i].drawSnakeElement();
    }

};

Snake.prototype.addSnakeElement = function (x, y, context, rasterSize) {
    this.SnakeArray.unshift(new SnakeElement(x, y, context, rasterSize));
};

function iniSnake(x, y, context, rasterSize) {

    snake = new Snake(x, y, context, rasterSize);

    snake.addSnakeElement(++x, y, context, rasterSize);
    snake.addSnakeElement(++x, y, context, rasterSize);
    snake.addSnakeElement(++x, y, context, rasterSize);

    return snake;
}

Snake.prototype.update = function () {
    this.SnakeArray.pop();
    switch(this.direction){
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



