(function(){
	var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");

	game.state.add("boot", SugarRapids.boot);
	game.state.add("preloader", SugarRapids.preloader);
	game.state.add("splash", SugarRapids.splash);
	game.state.add("game", SugarRapids.game);
	game.state.start("boot");
	
})()