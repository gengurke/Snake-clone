/* An Apple in the game */
var PoisionApple = function (x, y, context, rasterSize) {
    this.xPos = x * rasterSize;
    this.yPos = y * rasterSize;
    this.context = context;
    this.rasterSize = rasterSize;
};

function iniApple2(context, rasterSize) {
    apple = new PoisionApple(game.rndXPos(), game.rndYPos(), context, rasterSize);
    return apple;
}

PoisionApple.prototype.drawApple2 = function () {
    this.context.fillStyle = "red";
    this.context.fillRect(this.xPos, this.yPos, this.rasterSize, this.rasterSize);
};

PoisionApple.prototype.update = function () {
    this.drawApple2();
};

PoisionApple.prototype.positionReset = function () {
    this.xPos = game.rndXPos() * this.rasterSize;
    this.yPos = game.rndYPos() * this.rasterSize;
};
