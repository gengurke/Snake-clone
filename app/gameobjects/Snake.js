/* The snake in the game */

var Snake = function(x, y, context, rasterSize) {
    this.xPos = x;
    this.yPos = y;
    this.context = context;
    this.rasterSize = rasterSize;
    this.direction = "right";

    this.SnakeArray = [];
};



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
    this.positionUpdate();
    this.selfCollsisonUpdate();
    //If Apple is eaten last Snake Element is not poped
    if(!this.isAppleEaten()) {
        this.SnakeArray.pop();
    }
};


Snake.prototype.positionUpdate = function () {
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


Snake.prototype.selfCollsisonUpdate = function () {
    var i;
    for(i = 1; i < this.SnakeArray.length; i++) {
        if(this.SnakeArray[0].xPos === this.SnakeArray[i].xPos && this.SnakeArray[0].yPos === this.SnakeArray[i].yPos) {
            this.xPos = 1;
            this.yPos = 1;
        }
    }
};

Snake.prototype.isAppleEaten = function () {
        if(this.SnakeArray[0].xPos === game.gameApple().xPos && this.SnakeArray[0].yPos === game.gameApple().yPos) {
            game.gameApple().positionReset();
            return true;
        }
};





