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
        }


    }

	// Setzt den Canvas und dessen Context als Variablen
	function privateSetContext(canvas) {
		privateCanvas = canvas;
		privateContext = canvas.getContext("2d");
	}
    
    /* Todo: Call this function only after player has pressed the start key */
    function privateStartGame() {
        /* Todo: initialize objects (counter) here */

        //JQuery Integration
        privateCanvas.setAttribute('tabindex', '0');
        privateCanvas.focus();
        $(document).ready(function(){
            $("canvas").keydown(getInput);
        });

        snake = iniSnake(15, 15, privateContext, RASTER_SIZE);
        apple = iniApple(privateContext, RASTER_SIZE);
        window.requestAnimationFrame(privateDraw);
    }

	function publicInit(canvas) {
		GAME_HEIGHT = canvas.height;
        GAME_WIDTH = canvas.width;



        privateSetContext(canvas);
        privateStartGame();


	}

	function getInput(pressedKeyEvent) {
        switch (pressedKeyEvent.key) {
            case "w":
            case"ArrowUp":
                snake.direction = "up";
                break;
            case "d":
            case "ArrowRight":
                snake.direction = "right";
                break;
            case "s":
            case "ArrowDown":
                snake.direction = "down";
                break;
            case "a":
            case "ArrowLeft":
                snake.direction = "left";
                break;
            default:
                break;

        }
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

    return {
		init: publicInit,
        gameW: publicGameWidth,
        gameH: publicGameHeight,
        rndXPos: publicRandomXCanvasPosition,
        rndYPos: publicRandomYCanvasPosition,
        gameApple: gameApple

    };

})();