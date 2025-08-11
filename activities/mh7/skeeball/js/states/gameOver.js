SkeeBall.gameOver = function(game){
	this.scoreText = null;
	this.rawScore = null;
	this.tallySound = null;
};

SkeeBall.gameOver.prototype = {
	
	init: function(){
	},

	preload: function(){
	},

	update: function(){
	},

	create: function(){
		for (var i = 0; i < SkeeBallSettings.gameOver.backgroundElements.length; i++) {
			SkeeBall.addImage(SkeeBallSettings.gameOver.backgroundElements[i], this);
		}
		SkeeBall.addText(SkeeBallSettings.gameOver.headingText, this);
		this.scoreText = SkeeBall.addText(SkeeBallSettings.gameOver.scoreText, this, "0");
		//scoreText.text = SkeeBall.formatScore(SkeeBall.score);
		SkeeBall.addText(SkeeBallSettings.gameOver.directionText, this);
		

		this.countUpScore();
	},

	countUpScore: function(){
		var increment = 500;
		var tickDelay = 100;
		var count = SkeeBall.score / increment;
		this.rawScore = 0;
		this.time.events.repeat(tickDelay, count, this.bumpScore, this, increment);
		this.tallySound = SkeeBall.soundSprite.play(SkeeBallSettings.gameOver.scoreTallySFX);
		this.tallySound.loop = true;
		this.time.events.add(count * tickDelay, this.stopScoreSFX, this);
	},

	bumpScore: function(increment){
		this.rawScore += increment;
		this.scoreText.text = SkeeBall.formatScore(this.rawScore);
	},

	stopScoreSFX: function(){
		this.tallySound.loop = false;
		this.tallySound.stop();
		//SkeeBall.soundSprite.stop(SkeeBallSettings.remediation.scoreTallySFX);
		SkeeBall.soundSprite.play(SkeeBallSettings.gameOver.scoreTallyEchoSFX);
		SkeeBall.addButton(SkeeBallSettings.gameOver.playAgainButton, this.handlePlayAgain, this);
		
		this.storeHighScore();
	},

	storeHighScore: function(){
		if(SkeeBallSettings.scormEnabled){
			var sd = SCORM_API_adapter.getSuspendData();
			if(sd == "" || sd == null){
				SCORM_API_adapter.setSuspendData(SkeeBall.score);
			}else{
				var storedScore = Number(sd);
				if(SkeeBall.score > storedScore){
					SCORM_API_adapter.setSuspendData(SkeeBall.score);
				}
			}
		}
	},

	handlePlayAgain: function(){
		SkeeBall.currentQuestion = 0;
		SkeeBall.questionCount = 1;
		SkeeBall.score = 0;
		this.state.start('instructions');
	}
}