ExtremePeak.game = function(game){
	this.characterIndex = null;
	this.horizon = null;
	this.mountainSegments = [];
	this.levelDialog = null;
	this.level = null;
	this.character = null;
	this.balloons = null;
	this.balloonCount = null;
	this.question = null;
	this.gameState = null; // "playing" "won" or "lost"
	this.questionText = null;
	this.optionText = [];
	this.remediationText = null;
	this.optionButtons = [];
	this.currentQuestion = null;
	this.questionContinueButton = null;
	this.questionVo = null;
};

ExtremePeak.game.prototype = {

	init: function(characterInd){
		this.characterIndex = characterInd;
		this.level = 0;
		this.gameState = "playing";

		if(ExtremePeak.availableQuestions.length == 0){
			this.initializeQuestionPool();
		}

		if(epSettings.scormEnabled){
			SCORM_API_adapter.markComplete();
		}
	},

	preload: function(){
	},

	create: function(){
		this.add.sprite(epSettings.game.background.x, epSettings.game.background.y, epSettings.game.background.key);

		for (var i = 0; i < epSettings.game.decorations.length; i++) {
			var thisSprite = this.add.sprite(epSettings.game.decorations[i].x, epSettings.game.decorations[i].y, epSettings.game.decorations[i].texture, epSettings.game.decorations[i].key);
			thisSprite.scale.x = epSettings.game.decorations[i].scale[0];
			thisSprite.scale.y = epSettings.game.decorations[i].scale[1];
		}

		this.horizon = this.add.sprite(epSettings.game.horizon.x, epSettings.game.horizon.y, epSettings.game.horizon.texture, epSettings.game.horizon.key);
		this.mountainSegments = [];
		for (var i = 0; i < epSettings.game.mountainEdge.segmentsNeeded; i++) {
			this.mountainSegments.push(this.add.sprite(epSettings.game.mountainEdge.startX - (i * epSettings.game.mountainEdge.travelX), epSettings.game.mountainEdge.startY - (i * epSettings.game.mountainEdge.travelY), epSettings.game.mountainEdge.texture, epSettings.game.mountainEdge.key));
			this.mountainSegments[i].data.segmentIndex = i;
		}
		this.mountainSegments[0].frameName = epSettings.game.mountainEdge.levelSegments[0].key;

		this.showCharacter();

		this.showLevelDialog();
	},

	initializeQuestionPool: function(){
		console.log("initialize question pool");
		ExtremePeak.availableQuestions = [];
		for (var i = 0; i < epSettings.game.questions.length; i++) {
			ExtremePeak.availableQuestions.push(i);
		}
	},

	showCharacter: function(){
		if(this.character == null){
			this.character = this.add.sprite(epSettings.game.character.options[this.characterIndex].x, epSettings.game.character.options[this.characterIndex].y, epSettings.game.character.texture, epSettings.game.character.options[this.characterIndex].still);
			this.character.data.hoverTween = null;
		}
	},

	showLevelDialog: function(){
		if(this.levelDialog == null){
			this.levelDialog = this.add.group();
			this.levelDialog.x = epSettings.game.levelDialog.x;
			this.levelDialog.y = epSettings.game.levelDialog.y;
			this.add.sprite(0, 0, epSettings.game.levelDialog.texture, epSettings.game.levelDialog.backgroundKey, this.levelDialog);

			var textData = {};
			switch(this.gameState){
				case "playing":
					textData = epSettings.game.levelDialog.levelTexts[this.level];
					this.add.button(epSettings.game.levelDialog.continueButton.x, epSettings.game.levelDialog.continueButton.y, epSettings.game.levelDialog.continueButton.texture, this.closeLevelDialog, this, epSettings.game.levelDialog.continueButton.overKey, epSettings.game.levelDialog.continueButton.outKey, epSettings.game.levelDialog.continueButton.downKey, epSettings.game.levelDialog.continueButton.upKey, this.levelDialog);
					break;
				case "won":
					textData = epSettings.game.levelDialog.winText;
					this.add.button(epSettings.game.levelDialog.playAgainButton.x, epSettings.game.levelDialog.playAgainButton.y, epSettings.game.levelDialog.playAgainButton.texture, this.playAgain, this, epSettings.game.levelDialog.playAgainButton.overKey, epSettings.game.levelDialog.playAgainButton.outKey, epSettings.game.levelDialog.playAgainButton.downKey, epSettings.game.levelDialog.playAgainButton.upKey, this.levelDialog);
					ExtremePeak.sfxSprite.play(epSettings.splash.musicKey, epSettings.splash.musicVolume);
					break;
				case "lost":
					textData = epSettings.game.levelDialog.loseText;
					this.add.button(epSettings.game.levelDialog.playAgainButton.x, epSettings.game.levelDialog.playAgainButton.y, epSettings.game.levelDialog.playAgainButton.texture, this.playAgain, this, epSettings.game.levelDialog.playAgainButton.overKey, epSettings.game.levelDialog.playAgainButton.outKey, epSettings.game.levelDialog.playAgainButton.downKey, epSettings.game.levelDialog.playAgainButton.upKey, this.levelDialog);
					break;
			}
			ExtremePeak.voSprite.play(textData.voKey);

			var topStyle = { 
			 	font: epSettings.game.levelDialog.topText.font, 
			 	fill: epSettings.game.levelDialog.topText.fill, 
			 	fontSize: epSettings.game.levelDialog.topText.size,
			 	fontWeight: epSettings.game.levelDialog.topText.weight,
			 	align: epSettings.game.levelDialog.topText.align
			};
			if(epSettings.game.levelDialog.topText.wordWrap){
				topStyle.wordWrap = true;
				topStyle.wordWrapWidth = epSettings.game.levelDialog.topText.wordWrapWidth;
			}

			var topText = this.add.text(epSettings.game.levelDialog.topText.x, 
										 epSettings.game.levelDialog.topText.y, 
				                         textData.top, 
				                         topStyle, this.levelDialog);
			if(epSettings.game.levelDialog.topText.align == "center"){
				topText.anchor.x = 0.5;
			}

			var bottomStyle = { 
			 	font: epSettings.game.levelDialog.bottomText.font, 
			 	fill: epSettings.game.levelDialog.bottomText.fill, 
			 	fontSize: epSettings.game.levelDialog.bottomText.size,
			 	fontWeight: epSettings.game.levelDialog.bottomText.weight,
			 	align: epSettings.game.levelDialog.bottomText.align
			};
			if(epSettings.game.levelDialog.bottomText.wordWrap){
				bottomStyle.wordWrap = true;
				bottomStyle.wordWrapWidth = epSettings.game.levelDialog.bottomText.wordWrapWidth;
			}
			var bottomText = this.add.text(epSettings.game.levelDialog.bottomText.x, 
										 epSettings.game.levelDialog.bottomText.y, 
				                         textData.bottom, 
				                         bottomStyle, this.levelDialog);
			if(epSettings.game.levelDialog.bottomText.align == "center"){
				bottomText.anchor.x = 0.5;
			}
			
		}

	},

	closeLevelDialog: function(){
		ExtremePeak.voSprite.stop();
		this.levelDialog.destroy();
		this.levelDialog = null;
		this.beginLevel();
	},

	playAgain: function(){
		ExtremePeak.voSprite.stop();
		ExtremePeak.sfxSprite.stop();
		this.levelDialog.destroy();
		this.levelDialog = null;
		this.state.start('characterSelect');
	},

	beginLevel: function(){
		this.startBalloons(epSettings.game.levelSettings[this.level].balloonsAtStart);
	},

	startBalloons: function(balloonCount){
		this.balloonCount = 0;
		this.time.events.repeat(epSettings.game.balloons.addDelay, epSettings.game.levelSettings[this.level].balloonsAtStart, this.addBalloon, this);
		this.time.events.add(epSettings.game.balloons.addDelay, this.floatToQuestion, this, epSettings.game.levelSettings[this.level].balloonsAtStart, false);
		this.time.events.add(epSettings.game.balloons.addDelay, this.liftCharacter, this);
	},

	addBalloon: function(){
		this.balloonCount++;
		ExtremePeak.sfxSprite.play(epSettings.game.balloons.addSoundKey);
		this.character.frameName = epSettings.game.character.options[this.characterIndex].floating;
		if(this.balloons == null){
			this.balloons = this.add.sprite(epSettings.game.character.options[this.characterIndex].balloonX, epSettings.game.character.options[this.characterIndex].balloonY, epSettings.game.balloons.texture, epSettings.game.balloons.frames[6].activeFrame);
			this.balloons.frameName = epSettings.game.balloons.frames[this.balloonCount].activeFrame;
			this.balloons.data.hoverTween = null;
		}else{
			this.balloons.frameName = epSettings.game.balloons.frames[this.balloonCount].activeFrame;
			if(this.balloons.y == -this.balloons.height){
				this.balloons.x = epSettings.game.character.options[this.characterIndex].balloonX;
				this.balloons.y = epSettings.game.character.options[this.characterIndex].balloonY;
			}
		}

		if(this.balloonCount == 6 && this.level == 2){
			this.gameState = "won";
			this.liftCharacterToFinalPosition();
		}
	},

	floatToQuestion: function(stepsToFloat, crash){

		var direction = 0;
		if(stepsToFloat > 0){
			direction = 1;
		}else{
			direction = -1;
		}

		this.arrangeEdges(direction);

		var totalXDistance = stepsToFloat * epSettings.game.float.xStep;
		var totalYDistance = stepsToFloat * epSettings.game.float.yStep;

		var easing = "Cubic.easeInOut";
		var duration = Math.abs(stepsToFloat) * epSettings.game.float.stepDuration;
		if(crash){
			easing = "Cubic.easeIn";
			duration = Math.abs(stepsToFloat) * epSettings.game.float.fallDuration;
		}

		for (var i = 0; i < this.mountainSegments.length; i++) {
			var segmentTween = this.add.tween(this.mountainSegments[i]).to( { x: this.mountainSegments[i].x + totalXDistance, y: this.mountainSegments[i].y + totalYDistance }, duration, easing );
			segmentTween.start();
		}

		var horizonTween = this.add.tween(this.horizon).to( { y: this.horizon.y + (epSettings.game.horizon.yStep * stepsToFloat) }, duration, easing );
		horizonTween.start();

		if(!crash){
			this.time.events.add(duration * 1.1, this.endFloat, this, direction);
		}
		
	},

	arrangeEdges: function(direction){
		for (var i = 0; i < this.mountainSegments.length; i++) {
			if(direction > 0 && this.mountainSegments[i].y >= 480 || direction < 0 && this.mountainSegments[i].y <= -480){
				this.mountainSegments[i].x -= (epSettings.game.mountainEdge.segmentsNeeded * epSettings.game.mountainEdge.travelX) * direction;
				this.mountainSegments[i].y -= (epSettings.game.mountainEdge.segmentsNeeded * epSettings.game.mountainEdge.travelY) * direction;
				var newSegmentInd = this.mountainSegments[i].data.segmentIndex + (epSettings.game.mountainEdge.segmentsNeeded * direction);
				this.mountainSegments[i].data.segmentIndex = newSegmentInd;
				this.swapLevelSegment(this.mountainSegments[i]);
			}
		}
	},

	swapLevelSegment: function(segment){
		for (var i = 0; i < epSettings.game.mountainEdge.levelSegments.length; i++) {
			//console.log(epSettings.game.mountainEdge.levelSegments[i].segment + " <> " + segment.data.segmentIndex);
			if(epSettings.game.mountainEdge.levelSegments[i].segment == segment.data.segmentIndex){
				segment.frameName = epSettings.game.mountainEdge.levelSegments[i].key;
				//console.log("change " + segment.data.segmentIndex + " to " + segment.frameName);
			}else{
				//segment.frameName = epSettings.game.mountainEdge.key;
			}
		}
	},

	liftCharacter: function(){
		var charTween = this.add.tween(this.character).to( { y: epSettings.game.character.options[this.characterIndex].y - epSettings.game.character.floatLift }, 1000);
		charTween.start();
		var balloonTween = this.add.tween(this.balloons).to( { y: epSettings.game.character.options[this.characterIndex].balloonY - epSettings.game.character.floatLift }, 1000);
		balloonTween.onComplete.addOnce(this.startHover, this);
		balloonTween.start();
	},

	startHover: function(){
		//if(this.character.data.hoverTween == null){
			this.character.data.hoverTween = this.add.tween(this.character).to({ y: this.character.y + epSettings.game.character.hoverDistance }, epSettings.game.character.hoverDuration, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
			this.balloons.data.hoverTween = this.add.tween(this.balloons).to({ y: this.balloons.y + epSettings.game.character.hoverDistance }, epSettings.game.character.hoverDuration, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
		//}
		this.character.data.hoverTween.start();
		this.balloons.data.hoverTween.start();
	},

	stopHover: function(){
		if(this.character.data.hoverTween != null){
			this.character.data.hoverTween.stop();
			this.balloons.data.hoverTween.stop();
		}
	},

	liftCharacterToFinalPosition: function(){
		this.stopHover();
		var charTween = this.add.tween(this.character).to( { x: epSettings.game.character.options[this.characterIndex].endGameX, y: epSettings.game.character.options[this.characterIndex].endGameY - epSettings.game.character.floatLift }, 2900, "Cubic.easeInOut");
		charTween.start();
		var balloonX = epSettings.game.character.options[this.characterIndex].endGameX + (epSettings.game.character.options[this.characterIndex].balloonX - epSettings.game.character.options[this.characterIndex].x);
		var balloonY = epSettings.game.character.options[this.characterIndex].endGameY + (epSettings.game.character.options[this.characterIndex].balloonY - epSettings.game.character.options[this.characterIndex].y) - epSettings.game.character.floatLift;
		var balloonTween = this.add.tween(this.balloons).to( { x: balloonX, y: balloonY }, 2900, "Cubic.easeInOut");
		balloonTween.start();
	},

	endFloat: function(direction){
		if(this.balloonCount == 6){
			this.level++;
			this.dropPlayerToLevelStop();
		}else{
			this.showQuestion();
		}
	},

	showQuestion: function(){
		if(this.question == null){
			this.question = this.add.group();
			this.add.sprite(epSettings.game.questionDialog.x, epSettings.game.questionDialog.y, epSettings.game.questionDialog.texture, epSettings.game.questionDialog.backgroundKey, this.question);

			var questionStyle = { 
			 	font: epSettings.game.questionDialog.questionStyle.font, 
			 	fill: epSettings.game.questionDialog.questionStyle.fill, 
			 	fontSize: epSettings.game.questionDialog.questionStyle.size,
			 	fontWeight: epSettings.game.questionDialog.questionStyle.weight,
			 	align: epSettings.game.questionDialog.questionStyle.align
			};
			if(epSettings.game.questionDialog.questionStyle.wordWrap){
				questionStyle.wordWrap = true;
				questionStyle.wordWrapWidth = epSettings.game.questionDialog.questionStyle.wordWrapWidth;
			}
			this.questionText = this.add.text(epSettings.game.questionDialog.questionStyle.x, 
										 		epSettings.game.questionDialog.questionStyle.y, 
				                         		"", 
				                         		questionStyle, this.question);
			this.questionText.lineSpacing = epSettings.game.questionDialog.questionStyle.lineSpacing;

			var optionStyle = { 
			 	font: epSettings.game.questionDialog.optionStyle.font, 
			 	fill: epSettings.game.questionDialog.optionStyle.fill, 
			 	fontSize: epSettings.game.questionDialog.optionStyle.size,
			 	fontWeight: epSettings.game.questionDialog.optionStyle.weight,
			 	align: epSettings.game.questionDialog.optionStyle.align
			};
			if(epSettings.game.questionDialog.optionStyle.wordWrap){
				optionStyle.wordWrap = true;
				optionStyle.wordWrapWidth = epSettings.game.questionDialog.optionStyle.wordWrapWidth;
			}
			this.optionText = [];
			this.optionButtons = [];
			for (var i = 0; i < 4; i++) {
				this.optionText.push(this.add.text(epSettings.game.questionDialog.optionStyle.x, 
										 		epSettings.game.questionDialog.optionStyle.y + (i * epSettings.game.questionDialog.optionStyle.yInterval), 
				                         		"", 
				                         		optionStyle, this.question));
				this.optionText[i].lineSpacing = epSettings.game.questionDialog.optionStyle.lineSpacing;
				this.optionButtons.push(this.add.button(epSettings.game.questionDialog.optionButtons[i].x, epSettings.game.questionDialog.optionButtons[i].y, epSettings.game.questionDialog.texture, this.handleOptionClick, this, epSettings.game.questionDialog.optionButtons[i].overKey, epSettings.game.questionDialog.optionButtons[i].outKey, epSettings.game.questionDialog.optionButtons[i].downKey, epSettings.game.questionDialog.optionButtons[i].upKey, this.question));
				this.optionButtons[i].visible = false;
			}

			var remediationStyle = { 
			 	font: epSettings.game.questionDialog.remediationStyle.font, 
			 	fill: epSettings.game.questionDialog.remediationStyle.fill, 
			 	fontSize: epSettings.game.questionDialog.remediationStyle.size,
			 	fontWeight: epSettings.game.questionDialog.remediationStyle.weight,
			 	align: epSettings.game.questionDialog.remediationStyle.align
			};
			if(epSettings.game.questionDialog.remediationStyle.wordWrap){
				remediationStyle.wordWrap = true;
				remediationStyle.wordWrapWidth = epSettings.game.questionDialog.remediationStyle.wordWrapWidth;
			}
			this.remediationText = this.add.text(epSettings.game.questionDialog.remediationStyle.x, 
										 		epSettings.game.questionDialog.remediationStyle.y, 
				                         		"", 
				                         		remediationStyle, this.question);
			this.remediationText.lineSpacing = epSettings.game.questionDialog.remediationStyle.lineSpacing;

			this.questionContinueButton = this.add.button(epSettings.game.questionDialog.continueButton.x, epSettings.game.questionDialog.continueButton.y, epSettings.game.questionDialog.texture, null, this, epSettings.game.questionDialog.continueButton.overKey, epSettings.game.questionDialog.continueButton.outKey, epSettings.game.questionDialog.continueButton.downKey, epSettings.game.questionDialog.continueButton.upKey, this.question);
			this.questionContinueButton.visible = false;
		}else{
			this.questionText.text = "";
			for (i = 0; i < epSettings.game.questions[this.currentQuestion].optionText.length; i++) {
				this.optionText[i].text = "";
				this.optionButtons[i].visible = false;
				this.optionText[i].addColor(epSettings.game.questionDialog.optionStyle.fill, 0);
			}
			for (i = 0; i < this.optionButtons.length; i++) {
				this.optionButtons[i].inputEnabled = true;
			}
			this.remediationText.text = "";
			this.questionContinueButton.onInputUp.removeAll();
			this.questionContinueButton.visible = false;

			this.question.visible = true;
		}

		if(ExtremePeak.availableQuestions.length == 0){
			this.initializeQuestionPool();
		}

		var qIndex = 0;
		if(epSettings.game.questionDialog.drawQuestionsRandomly){
			qIndex = Math.floor(Math.random() * ExtremePeak.availableQuestions.length);
		}
		
		this.currentQuestion = ExtremePeak.availableQuestions.splice(qIndex, 1)[0];

		console.log("chosen: " + this.currentQuestion);
		console.log("available: " + ExtremePeak.availableQuestions);

		this.questionText.text = epSettings.game.questions[this.currentQuestion].questionText;

		for (i = 0; i < epSettings.game.questions[this.currentQuestion].optionText.length; i++) {
			this.optionText[i].text = epSettings.game.questions[this.currentQuestion].optionText[i];
			this.optionButtons[i].visible = true;
		}

		this.loadQuestionAudio(epSettings.game.questions[this.currentQuestion].questionAudio);

	},

	loadQuestionAudio: function(data){
		var loader = this.load.audio("question", data);
		loader.onLoadComplete.addOnce(this.playQuestionAudio, this, 0, "question");
		loader.start();
	},

	playQuestionAudio: function(key){
		this.stopQuestionAudio();
		this.questionAudio = this.sound.play(key);
	},

	stopQuestionAudio: function(){
		if(this.questionAudio != null){
			this.questionAudio.stop();
		}
	},

	handleOptionClick: function(option){
		var index = this.optionButtons.indexOf(option);
		for (var i = 0; i < this.optionButtons.length; i++) {
			this.optionButtons[i].inputEnabled = false;
		}
		this.optionText[index].addColor(epSettings.game.questionDialog.optionStyle.highlightColor, 0);

		this.remediationText.text = epSettings.game.questions[this.currentQuestion].remediationText[index];

		if(index == epSettings.game.questions[this.currentQuestion].correctIndex){
			this.questionContinueButton.onInputUp.add(this.handleQuestionCorrect, this);
		}else{
			this.questionContinueButton.onInputUp.add(this.handleQuestionIncorrect, this);
		}
		this.questionContinueButton.visible = true;

		this.loadQuestionAudio(epSettings.game.questions[this.currentQuestion].remediationAudio[index]);
	},

	handleQuestionCorrect: function(){
		this.stopQuestionAudio();
		this.question.visible = false;
		this.time.events.add(epSettings.game.balloons.addDelay, this.addBalloon, this);
		this.time.events.add(epSettings.game.balloons.addDelay, this.floatToQuestion, this, 1, false);
	},

	handleQuestionIncorrect: function(){
		this.stopQuestionAudio();
		this.question.visible = false;
		this.removeBalloon();
	},

	removeBalloon: function(){
		ExtremePeak.sfxSprite.play(epSettings.game.balloons.removeSoundKey);
		this.balloons.frameName = epSettings.game.balloons.frames[this.balloonCount].popFrame;
		this.balloonCount--;

		if(this.balloonCount == 0){
			this.time.events.add(250, function() { 
				this.balloons.y = -this.balloons.height;
			}, this);
			this.fallToLevelStop();
		}else{
			this.time.events.add(250, function() { 
				this.balloons.frameName = epSettings.game.balloons.frames[this.balloonCount].activeFrame;
			}, this);
			this.floatToQuestion(-1, false);
		}
	},

	dropPlayerToLevelStop: function(){
		this.stopHover();
		this.character.frameName = epSettings.game.character.options[this.characterIndex].dropping;
		var charTween = null;
		if(this.gameState == "won"){
			charTween = this.add.tween(this.character).to( { y: epSettings.game.character.options[this.characterIndex].endGameY }, 500);
		}else{
			charTween = this.add.tween(this.character).to( { y: epSettings.game.character.options[this.characterIndex].y + epSettings.game.character.floatLift }, 500);
		}
		charTween.onComplete.add(this.landPlayerOnLevel, this);
		charTween.start();

		var balloonTween = this.add.tween(this.balloons).to( { y: -this.balloons.height }, 1000);
		//balloonTween.onComplete.add(this.resetBalloons, this);
		balloonTween.start();
	},

	landPlayerOnLevel: function(){
		this.character.frameName = epSettings.game.character.options[this.characterIndex].still;
		if(this.gameState == "won"){
			ExtremePeak.sfxSprite.play(epSettings.game.winSoundKey);
			this.time.events.add(3500, this.showLevelDialog, this);
		}else{
			this.showLevelDialog();
		}	
	},

	fallToLevelStop: function(){
		this.stopHover();
		this.gameState = "lost";
		this.character.frameName = epSettings.game.character.options[this.characterIndex].falling;
		var charTween = this.add.tween(this.character).to( { y: epSettings.game.character.options[this.characterIndex].y }, epSettings.game.float.fallDuration);
		charTween.onComplete.add(function() {
			this.character.frameName = epSettings.game.character.options[this.characterIndex].crash;
			ExtremePeak.sfxSprite.play(epSettings.game.crashSoundKey);
			this.time.events.add(1000, this.showLevelDialog, this);
		}, this);
		charTween.start();
		this.floatToQuestion(-1, true);
	},

	shutdown: function(){
		this.horizon.destroy();
		this.horizon = null;
		for (var i = 0; i < this.mountainSegments.length; i++) {
			this.mountainSegments[i].destroy;
			this.mountainSegments[i] = null;
		}
		this.character.destroy();
		this.character = null;
		this.balloons.destroy();
		this.balloons = null;
		this.question.destroy();
		this.question = null;

		this.questionText = null;
		this.optionText = [];
		this.remediationText = null;
		this.optionButtons = [];
		this.questionContinueButton = null;
		this.questionVo = null;
	}

}