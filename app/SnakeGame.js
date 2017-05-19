var game = (function () {

    var privateContext;
    var privateCanvas;

    /* Game Constants */
    var GAME_WIDTH;
    var GAME_HEIGHT;
    var RASTER_SIZE = 10;  // i.e. size of snake elements and apples

    var snake;
    var apple;
    var poisonapple;
    var counter;
    var playing = false;

    /* Variables and constants to control framerate */
    var FPS = 10;
    /* change this to change framerate in the game */
    var now;
    var then = Date.now();
    var interval = 1000 / FPS;
    var delta;


    // Draws the canvas
    function privateDraw() {
        window.requestAnimationFrame(privateDraw);

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);
            //Checks if the player lost
            if (playing === true) {
                console.log("Tick, now drawing with: " + FPS + "fps!");
                // draw and check collisions here...
                privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                snake.update();
                apple.update();
                poisonapple.update();
                counter.update();
            } else {
                publicReplayScreen();
            }
        }
    }

    // Setzt den Canvas und dessen Context als Variablen
    function privateSetContext(canvas) {
        privateCanvas = canvas;
        privateContext = canvas.getContext("2d");
    }

    function privateStartGame() {
        document.removeEventListener("keydown", privateStartGameOnKeypressHandler);
        //Brings the canvas to focus for later input
        privateCanvas.setAttribute('tabindex', '0');
        privateCanvas.focus();
        $("canvas").keydown(getInput);


        snake = iniSnake(15, 15, privateContext, RASTER_SIZE);
        apple = iniApple(privateContext, RASTER_SIZE);
        poisonapple = iniApple2(privateContext, RASTER_SIZE);
        counter = iniCounter(privateContext, RASTER_SIZE);
        var sound = document.getElementById("main");
        sound.play();
        window.requestAnimationFrame(privateDraw);
    }

    function publicInit(canvas) {
        GAME_HEIGHT = canvas.height;
        GAME_WIDTH = canvas.width;
        privateSetContext(canvas);
        privateStartGameOnKeypress();
    }

    function getInput(pressedKeyEvent) {
        switch (pressedKeyEvent.key) {
            case "w":
            case"ArrowUp":
                if (!(snake.lastDirection === "down"))
                    snake.direction = "up";
                break;
            case "d":
            case "ArrowRight":
                if (!(snake.lastDirection === "left"))
                    snake.direction = "right";
                break;
            case "s":
            case "ArrowDown":
                if (!(snake.lastDirection === "up"))
                    snake.direction = "down";
                break;
            case "a":
            case "ArrowLeft":
                if (!(snake.lastDirection === "right"))
                    snake.direction = "left";
                break;
            default:
                break;

        }
    }

    function privateStartGameOnKeypress() {
        //Prompt before the game
        privateContext.font = "20px Arial";
        privateContext.fillStyle = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        privateContext.fillText("Press Spacebar to begin! ", 4 * RASTER_SIZE, 15 * RASTER_SIZE);

        //Starts game only if spacebar is pressed
        document.addEventListener("keydown", privateStartGameOnKeypressHandler);
    }

    //Handles the Key pressevent when starting the game
    function privateStartGameOnKeypressHandler(event) {
        if (event.keyCode === 32) {
            playing = true;
            privateStartGame();
        }
    }

    //Prompts the user to play again and shows the score
    function publicReplayScreen() {
        playing = false;
        privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        privateContext.font = "40px Arial";
        privateContext.fillStyle = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        privateContext.fillText("Game Over!!", 4 * RASTER_SIZE, 7 * RASTER_SIZE);
        privateContext.font = "20px Arial";
        privateContext.fillText("Your Score was: " + counter.getCounter(), 7 * RASTER_SIZE, 15 * RASTER_SIZE)
        privateContext.fillText("Press Spacebar to play again!", 2 * RASTER_SIZE, 24 * RASTER_SIZE);
        document.addEventListener("keydown", privateStartGameOnKeypressHandler);


    }

    //Functions to determine random XY positions on the canvas grid
    function publicRandomXCanvasPosition() {
        return Math.floor(Math.random() * (GAME_WIDTH / RASTER_SIZE));
    }

    function publicRandomYCanvasPosition() {
        return Math.floor(Math.random() * (GAME_HEIGHT / RASTER_SIZE));
    }

    function gameApple() {
        return apple;
    }

    function gameApple2() {
        return poisonapple;
    }

    function publicGameWidth() {
        return GAME_WIDTH;
    }

    function publicGameHeight() {
        return GAME_HEIGHT;
    }

    function gameScore() {
        return counter;
    }

    return {
        init: publicInit,
        gameW: publicGameWidth,
        gameH: publicGameHeight,
        rndXPos: publicRandomXCanvasPosition,
        rndYPos: publicRandomYCanvasPosition,
        gameApple: gameApple,
        gameApple2: gameApple2,
        gameScore: gameScore,
        replay: publicReplayScreen


    };

})();