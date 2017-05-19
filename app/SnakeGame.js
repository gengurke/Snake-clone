var game = (function () {

	var privateContext;
	var privateCanvas;

	/* Game Constants */
	var GAME_WIDTH;
	var GAME_HEIGHT;
    var RASTER_SIZE = 10;  // i.e. size of snake elements and apples

	var snake;
    var apple;
    var counter;
    var playing = false;
    
    /* Variables and constants to control framerate */
    var FPS = 3; /* change this to change framerate in the game */
    var now;
    var then = Date.now();
    var interval = 1000/FPS;
    var delta;



	// Draws the canvas
	function privateDraw() {
        window.requestAnimationFrame(privateDraw);
        
        now = Date.now();
        delta = now - then;
        
        if (delta > interval) {
            then = now - (delta % interval);
            console.log("Tick, now drawing with: " + FPS + "fps!");
            // draw and check collisions here...
            snake.update();
            privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            snake.drawSnake();
            apple.update();
            counter.update();
        }


    }

	// Setzt den Canvas und dessen Context als Variablen
	function privateSetContext(canvas) {
		privateCanvas = canvas;
		privateContext = canvas.getContext("2d");
	}
    

    function privateStartGame() {
        //Brings the canvas to focus for later input
        privateCanvas.setAttribute('tabindex', '0');
        privateCanvas.focus();
        $("canvas").keydown(getInput);




        snake = iniSnake(15, 15, privateContext, RASTER_SIZE);
        apple = iniApple(privateContext, RASTER_SIZE);
        counter = iniCounter(privateContext,RASTER_SIZE);
        window.requestAnimationFrame(privateDraw);
    }

	function publicInit(canvas) {
        GAME_HEIGHT = canvas.height;
        GAME_WIDTH = canvas.width;
        privateSetContext(canvas);
        privateStartGameOnKeypress(32);
	}

	function getInput(pressedKeyEvent) {
        switch (pressedKeyEvent.key) {
            case "w":
            case"ArrowUp":
                if(!(snake.lastDirection === "down"))
                snake.direction = "up";
                break;
            case "d":
            case "ArrowRight":
                if(!(snake.lastDirection === "left"))
                snake.direction = "right";
                break;
            case "s":
            case "ArrowDown":
                if(!(snake.lastDirection === "up"))
                snake.direction = "down";
                break;
            case "a":
            case "ArrowLeft":
                if(!(snake.lastDirection === "right"))
                snake.direction = "left";
                break;
            default:
                break;

        }
    }


    function privateStartGameOnKeypress(keyCode) {
        //Starts game only if spacebar is pressed
        $(document).keydown(function (e) {
            if (e.keyCode === keyCode) {
                playing = true;
                privateStartGame();
            }
        });

        //Prompt before the game
        privateContext.font = "20px Arial";
        privateContext.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        privateContext.fillText("Press Spacebar to begin! ", 4 * RASTER_SIZE, 15 * RASTER_SIZE);
    }


    //Functions to determine random XY positions on the canvas grid
    function publicRandomXCanvasPosition() {
        return Math.floor(Math.random() * (GAME_WIDTH / RASTER_SIZE));
    }
    function publicRandomYCanvasPosition() {
        return Math.floor(Math.random() * (GAME_HEIGHT / RASTER_SIZE));
    }

    function gameApple(){
        return apple;
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
        gameScore: gameScore

    };

})();