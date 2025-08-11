SkeeBall.difficulty = function(game){
	this.scoreText = null;
	this.vo = null;
};

SkeeBall.difficulty.prototype = {
	
	init: function(){
	},

	preload: function(){
	},

	update: function(){
	},

	create: function(){
		for (var i = 0; i < SkeeBallSettings.difficulty.backgroundElements.length; i++) {
			SkeeBall.addImage(SkeeBallSettings.difficulty.backgroundElements[i], this);
		}

		var questionTitle = SkeeBall.addText(SkeeBallSettings.commonItems.questionTitle, this);
		questionTitle.text = "QUESTION " + SkeeBall.questionCount;

		SkeeBall.addText(SkeeBallSettings.commonItems.scoreLabel, this);
		SkeeBall.addText(SkeeBallSettings.difficulty.directionText, this);
		this.scoreText = SkeeBall.addText(SkeeBallSettings.commonItems.scoreText, this);
		this.scoreText.text = SkeeBall.formatScore(SkeeBall.score);
		//this.scoreText.text = "24,000";

		for (var i = 0; i < SkeeBallSettings.difficulty.scoreButtons.length; i++) {
			var scoreButton = SkeeBall.addButton(SkeeBallSettings.difficulty.scoreButtons[i], this.handleDifficultySelection, this);
			scoreButton.data.value = SkeeBallSettings.difficulty.scoreButtons[i].value;
		}

		SkeeBall.soundSprite.play(SkeeBallSettings.difficulty.voKey);

		/*var loader = this.load.audio("vo", SkeeBallSettings.difficulty.vo);
		loader.onLoadComplete.addOnce(this.playVO, this, 0, "vo");
		loader.start();*/
	},

	/*playVO: function(audioKey){
		this.vo = this.sound.play(audioKey);
	},*/

	handleDifficultySelection: function(button){
		SkeeBall.soundSprite.stop(SkeeBallSettings.difficulty.voKey);
		this.state.start('question', true, false, button.data.value);
	}

}