SkeeBall.remediation = function(game){
	this.questionValue = null;
	this.optionIndex = null;
	this.isCorrect = null;
	this.scoreText = null;
	this.newScore = null;
	this.waitingForTally = null;
	this.vo = null;
};

SkeeBall.remediation.prototype = {
	
	init: function(optionIndex, isCorrect, value){
		this.optionIndex = optionIndex;
		this.isCorrect = isCorrect;
		this.questionValue = value;
		this.waitingForTally = false;
	},

	preload: function(){
	},

	update: function(){
		if(this.waitingForTally){
			if(SkeeBall.score == this.newScore){
				this.waitingForTally = false;
				this.moveOn();
			}
		}
	},

	create: function(){
		for (var i = 0; i < SkeeBallSettings.question.backgroundElements.length; i++) {
			SkeeBall.addImage(SkeeBallSettings.question.backgroundElements[i], this);
		}

		var questionTitle = SkeeBall.addText(SkeeBallSettings.commonItems.questionTitle, this);
		questionTitle.text = "QUESTION " + SkeeBall.questionCount;

		SkeeBall.addText(SkeeBallSettings.commonItems.scoreLabel, this);

		var directionText = SkeeBall.addText(SkeeBallSettings.question.directionText, this);
		directionText.text = SkeeBallSettings.question.directionText.valueTextTags[0] + this.questionValue + SkeeBallSettings.question.directionText.valueTextTags[1];
		this.scoreText = SkeeBall.addText(SkeeBallSettings.commonItems.scoreText, this);
		this.scoreText.text = SkeeBall.formatScore(SkeeBall.score);

		var questionText = SkeeBall.addText(SkeeBallSettings.question.questionText, this);
		questionText.text = SkeeBallSettings.questions[SkeeBall.currentQuestion].question;

		var optionY = questionText.y + questionText.height + SkeeBallSettings.question.optionText.padding;
		for (var i = 0; i < SkeeBallSettings.questions[SkeeBall.currentQuestion].options.length; i++) {
			var optionText = SkeeBall.addText(SkeeBallSettings.question.optionText, this);
			optionText.y = optionY;
			optionText.text = SkeeBallSettings.questions[SkeeBall.currentQuestion].options[i];
			optionY += optionText.height + SkeeBallSettings.question.optionText.padding;

			var optionLetterData = {
				x: SkeeBallSettings.question.optionButtons[i].x,
				y: SkeeBallSettings.question.optionButtons[i].y,
				texture: SkeeBallSettings.question.optionButtons[i].texture,
				key: SkeeBallSettings.question.optionButtons[i].upKey
			}

			if(i == this.optionIndex){
				optionText.setStyle(SkeeBall.translateStyle(SkeeBallSettings.question.optionTextOver));
				optionLetterData.key = SkeeBallSettings.question.optionButtons[i].downKey;
			}
			var optionLetter = SkeeBall.addImage(optionLetterData, this);
			optionLetter.y = optionText.y + SkeeBallSettings.question.optionButtons[i].yOffset;
		}

		if(this.isCorrect){
			this.increaseScore();
		}else{
			this.showRemediation();
		}

		/*SkeeBall.addImage(SkeeBallSettings.remediation.box, this);

		var remediationText = null;
		if(this.isCorrect){
			var scoreText = SkeeBall.addText(SkeeBallSettings.remediation.scoreText, this);
			scoreText.text = "+" + this.questionValue;
			remediationText = SkeeBall.addText(SkeeBallSettings.remediation.remediationTextCorrect, this);
			this.newScore = SkeeBall.score + this.questionValue;
			this.increaseScore();
		}else{
			this.newScore = SkeeBall.score;
			remediationText = SkeeBall.addText(SkeeBallSettings.remediation.remediationTextIncorrect, this);
			this.loadVO();
		}
		remediationText.text = SkeeBallSettings.questions[SkeeBall.currentQuestion].remediation[this.optionIndex];

		SkeeBall.addButton(SkeeBallSettings.remediation.continueButton, this.handleContinue, this);*/

		//this.loadVO();
	},

	showRemediation: function(){
		SkeeBall.addImage(SkeeBallSettings.remediation.box, this);
		var remediationText = null;
		if(this.isCorrect){
			var scoreText = SkeeBall.addText(SkeeBallSettings.remediation.scoreText, this);
			scoreText.text = "+" + this.questionValue;
			remediationText = SkeeBall.addText(SkeeBallSettings.remediation.remediationTextCorrect, this);
			this.newScore = SkeeBall.score + this.questionValue;
		}else{
			this.newScore = SkeeBall.score;
			remediationText = SkeeBall.addText(SkeeBallSettings.remediation.remediationTextIncorrect, this);
		}
		remediationText.text = SkeeBallSettings.questions[SkeeBall.currentQuestion].remediation[this.optionIndex];
		SkeeBall.addButton(SkeeBallSettings.remediation.continueButton, this.handleContinue, this);
		this.loadVO();
	},

	increaseScore: function(){
		var increment = 200;
		var tickDelay = 100;
		var count = this.questionValue / increment;
		this.time.events.repeat(tickDelay, count, this.bumpScore, this, increment);
		SkeeBall.soundSprite.play(SkeeBallSettings.remediation.scoreTallySFX.key, SkeeBallSettings.remediation.scoreTallySFX.volume);
		this.time.events.add(count * tickDelay, this.stopScoreSFX, this);
	},

	bumpScore: function(increment){
		SkeeBall.score += increment;
		this.scoreText.text = SkeeBall.formatScore(SkeeBall.score);
	},

	stopScoreSFX: function(){
		SkeeBall.soundSprite.stop(SkeeBallSettings.remediation.scoreTallySFX.key);
		this.showRemediation();
	},

	handleContinue: function(button){
		button.inputEnabled = false;
		this.moveOn();
		/*if(SkeeBall.score == this.newScore){
			this.moveOn();
		}else{
			this.waitingForTally = true;
		}*/
	},

	loadVO: function(){
		var loader = this.load.audio("vo", SkeeBallSettings.questions[SkeeBall.currentQuestion].remediationVO[this.optionIndex]);
		loader.onLoadComplete.addOnce(this.playVO, this, 0, "vo");
		loader.start();
	},

	playVO: function(audioKey){
		this.vo = this.sound.play(audioKey);
	},

	moveOn: function(){
		this.vo.stop();
		if(SkeeBall.questionCount == SkeeBallSettings.questionLimit){
			this.state.start('gameOver');
		}else{
			SkeeBall.questionCount++;
			this.state.start('difficulty');
		}
	}
}