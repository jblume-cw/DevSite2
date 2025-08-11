(function(){
	var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");

	game.state.add("boot", BHM.boot);
	game.state.add("preloader", BHM.preloader);
	game.state.add("instructions", BHM.instructions);
	game.state.add("chooser", BHM.chooser);
	game.state.add("mealSummary", BHM.mealSummary);
	game.state.add("daySummary", BHM.daySummary);
	game.state.start("boot");
	
})()