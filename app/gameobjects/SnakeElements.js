/* A SnakeElement in the game */

var SnakeElement = function (x, y, context, rasterSize) {
    this.xPos = x * rasterSize;
    this.yPos = y * rasterSize;
    this.context = context;
    this.rasterSize = rasterSize;


};

SnakeElement.prototype.drawSnakeElement = function () {
    this.context.fillStyle = "purple";
    this.context.fillRect(this.xPos, this.yPos, this.rasterSize, this.rasterSize);
};
