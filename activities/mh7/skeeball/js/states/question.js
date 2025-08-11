SkeeBall.question = function(game){
	this.questionValue = null;
	this.vo = null;
};

SkeeBall.question.prototype = {
	
	init: function(valueChosen){
		this.questionValue = valueChosen;
	},

	preload: function(){
	},

	update: function(){
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

		this.showQuestion();
	},

	showQuestion: function(){

		var difficultyIndex = SkeeBall.questionPoolKey.indexOf(this.questionValue);
		if(SkeeBall.questionPool[difficultyIndex].length == 0){
			this.resetQuestionPool(difficultyIndex);
		}

		this.chooseQuestion(difficultyIndex);

		var questionText = SkeeBall.addText(SkeeBallSettings.question.questionText, this);
		questionText.text = SkeeBallSettings.questions[SkeeBall.currentQuestion].question;

		var optionY = questionText.y + questionText.height + SkeeBallSettings.question.optionText.padding;
		for (var i = 0; i < SkeeBallSettings.questions[SkeeBall.currentQuestion].options.length; i++) {
			var optionText = SkeeBall.addText(SkeeBallSettings.question.optionText, this);
			optionText.y = optionY;
			optionText.text = SkeeBallSettings.questions[SkeeBall.currentQuestion].options[i];
			optionY += optionText.height + SkeeBallSettings.question.optionText.padding;

			var optionButton = SkeeBall.addButton(SkeeBallSettings.question.optionButtons[i], this.handleOptionClick, this);
			optionButton.y = optionText.y + SkeeBallSettings.question.optionButtons[i].yOffset;
			optionButton.hitArea = new Phaser.Rectangle(0, 0, (optionText.x + optionText.width) - optionButton.x, (optionText.y + optionText.height) - optionButton.y);
			optionButton.data.text = optionText;
			optionButton.data.index = i;
			optionButton.onInputOver.add(this.handleOptionOver, this);
			optionButton.onInputOut.add(this.handleOptionOut, this);
		}

		//this.loadPreVO(difficultyIndex);
		this.playPreVO(difficultyIndex);
	},

	resetQuestionPool: function(difficultyIndex){
		for (var i = 0; i < SkeeBallSettings.questions.length; i++) {
			if(SkeeBallSettings.questions[i].value == SkeeBall.questionPoolKey[difficultyIndex]){
				SkeeBall.questionPool[difficultyIndex].push(i);
			}
		}
		//console.log("reset " + difficultyIndex + " to " + SkeeBall.questionPool[difficultyIndex]);
	},

	chooseQuestion: function(difficultyIndex){
		var rand = Math.floor(Math.random() * SkeeBall.questionPool[difficultyIndex].length);
		//var rand = 0;
		SkeeBall.currentQuestion = SkeeBall.questionPool[difficultyIndex].splice(rand, 1)[0];
	},

	handleOptionOver: function(option){
		option.data.text.setStyle(SkeeBall.translateStyle(SkeeBallSettings.question.optionTextOver));
	},

	handleOptionOut: function(option){
		option.data.text.setStyle(SkeeBall.translateStyle(SkeeBallSettings.question.optionText));
	},

	handleOptionClick: function(option){
		this.vo.stop();
		var isCorrect = false;
		if(option.data.index == SkeeBallSettings.questions[SkeeBall.currentQuestion].correctIndex){
			isCorrect = true;
		}
		this.state.start('roll', true, false, option.data.index, isCorrect, this.questionValue);
	},

	/*loadPreVO: function(difficultyIndex){
		var loader = this.load.audio("preVO", SkeeBallSettings.question.preVO[difficultyIndex]);
		loader.onLoadComplete.addOnce(this.playPreVO, this, 0, "preVO");
		loader.start();
	},*/

	playPreVO: function(difficultyIndex){
		this.vo = SkeeBall.soundSprite.play(SkeeBallSettings.question.preVoKeys[difficultyIndex]);
		this.time.events.add(this.vo.durationMS + SkeeBallSettings.question.audioPauseGap, this.loadQuestionVO, this);
		/*this.vo = this.sound.play(audioKey);
		//this.time.events.add(this.vo.durationMS + SkeeBallSettings.question.audioPauseGap, this.loadQuestionVO, this);
		this.time.events.add(2500, this.loadQuestionVO, this);*/
	},

	loadQuestionVO: function(){
		var loader = this.load.audio("questionVO", SkeeBallSettings.questions[SkeeBall.currentQuestion].questionVO);
		loader.onLoadComplete.addOnce(this.playQuestionVO, this, 0, "questionVO");
		loader.start();
	},

	playQuestionVO: function(audioKey){
		this.vo = this.sound.play(audioKey);
	}

}