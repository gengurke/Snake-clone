/* An Apple in the game */
var Apple = function (x, y, context, rasterSize) {
    this.xPos = x * rasterSize;
    this.yPos = y * rasterSize;
    this.context = context;
    this.rasterSize = rasterSize;
};

function iniApple(context, rasterSize) {
    apple = new Apple(game.rndXPos(), game.rndYPos(), context, rasterSize);
    return apple;
}

Apple.prototype.drawApple = function () {
    this.context.fillStyle = "green";
    this.context.fillRect(this.xPos, this.yPos, this.rasterSize, this.rasterSize);
};

Apple.prototype.update = function () {
    this.drawApple();
};

Apple.prototype.positionReset = function () {
    this.xPos = game.rndXPos() * this.rasterSize;
    this.yPos = game.rndYPos() * this.rasterSize;
};
