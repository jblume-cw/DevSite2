(function(){

	window.onload = function() {
		// Scaling must be applied to the canvas before the game is created or the button hotspots don't line up properly.
		// Therefore the canvas must be part of the gameConfig object and a specific render type declared.
	    //if(gSettings.autoScale){
	    	window.focus();
	    	resizeGame();
	    	window.addEventListener("resize", resizeGame);
	    //}
	}

	function resizeGame(){
	    var canvas = document.querySelector("canvas");
	    var windowWidth = window.innerWidth;
	    var windowHeight = window.innerHeight;
	    var windowRatio = windowWidth / windowHeight;
	    //var gameRatio = game.config.width / game.config.height;
	    var gameRatio = 960 / 640;
	    if(windowRatio < gameRatio){
	        canvas.style.width = windowWidth + "px";
	        canvas.style.height = (windowWidth / gameRatio) + "px";
	    }
	    else{
	        canvas.style.width = (windowHeight * gameRatio) + "px";
	        canvas.style.height = windowHeight + "px";
	    }
	}
	
})()