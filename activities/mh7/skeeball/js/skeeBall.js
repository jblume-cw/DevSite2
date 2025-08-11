(function(){
	var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");

	game.state.add("boot", SkeeBall.boot);
	game.state.add("preloader", SkeeBall.preloader);
	game.state.add("instructions", SkeeBall.instructions);
	game.state.add("difficulty", SkeeBall.difficulty);
	game.state.add("question", SkeeBall.question);
	game.state.add("roll", SkeeBall.roll);
	game.state.add("remediation", SkeeBall.remediation);
	game.state.add("gameOver", SkeeBall.gameOver);
	game.state.start("boot");
	
})()