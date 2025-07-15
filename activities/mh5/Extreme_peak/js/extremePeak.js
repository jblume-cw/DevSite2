(function(){
	var game = new Phaser.Game(640, 480, Phaser.AUTO, "game");

	game.state.add("boot", ExtremePeak.boot);
	game.state.add("preloader", ExtremePeak.preloader);
	game.state.add("splash", ExtremePeak.splash);
	game.state.add("characterSelect", ExtremePeak.characterSelect);
	game.state.add("game", ExtremePeak.game);
	game.state.start("boot");
	
})()