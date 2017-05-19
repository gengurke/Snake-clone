/* The Counter in the game */

var Counter = function (context, rasterSize) {
    this.xPos = 10 * rasterSize;
    this.yPos = 5 * rasterSize;
    this.context = context;
    this.rasterSize = rasterSize;
    this.counter = 0;
};

function iniCounter(context, rasterSize) {
    counter = new Counter(context, rasterSize);
    return counter;
}

Counter.prototype.draw = function () {
    this.context.font = "25px Arial";
    this.context.fillStyle = "rgba(255, 255, 255, 0.7)";
    this.context.fillText("Score: " + this.counter, this.xPos, this.yPos);
};

Counter.prototype.update = function () {
    this.draw();
};

Counter.prototype.addPoints = function (addpoints) {
    this.counter += addpoints;
};

Counter.prototype.getCounter = function () {
    return this.counter;
}

Counter.prototype.cntReset = function () {
    this.counter = 0;
};