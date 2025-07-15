RFYH.race = function(game){
	this.playerIndex = null;
	this.levelBuilt = null;
	this.questionPostsHit = [];
	this.questionIndex = 0;
	this.tileMap = null;
	this.surfacesLayer = null;
	this.positives = null;
	this.negatives = null;
	this.questionPosts = null;
	this.finish = null;
	this.player = null;
	this.runners = [];
	this.countdown = null;
	this.countdownStep = null;
	this.questionDisplay = null;
	this.optionButtons = [];
	this.currentQuestionIndex = null;
	this.questionsSeen = null;
	this.finishOrder = [];

	this.questionAudio = null;
	this.runAmbience = null;
};

RFYH.race.prototype = {

	init: function(index){
		this.playerIndex = index;
		this.levelBuilt = false;
		this.questionPostsHit = [];
		this.questionIndex = 0;
		this.questionsSeen = 0;
		this.finishOrder = [];

		if(settings.scormEnabled){
			SCORM_API_adapter.markComplete();
		}
	},

	shutdown: function(){
		this.tileMap.destroy();
		this.surfacesLayer.destroy();
		this.positives.destroy();
		this.negatives.destroy();
		this.questionPosts.destroy();
		this.finish.destroy();
		for (var i = 0; i < this.runners.length; i++) {
			this.runners[i].destroy();
		}
		this.player = null;
		this.countdown = null;
		this.countdownStep = null;
		this.questionDisplay.destroy();
		this.questionDisplay = null;
		//this.questionPool = [];
		this.optionButtons = [];
		this.currentQuestionIndex = null;
		this.questionsSeen = null;
		this.finishOrder = [];
	},

	create: function(){
		this.stage.backgroundColor = settings.race.backgroundColor;
		var background = this.add.sprite(settings.race.background.x, settings.race.background.y, settings.race.background.keys.texture, settings.race.background.keys.image);
		background.fixedToCamera = true;

		this.buildLevel();
		if(RFYH.questionPool.length == 0){
			this.resetQuestionPool();
		}
		this.startCountdown();
	},

	buildLevel: function(){
		if(!this.levelBuilt){
			this.initializeTileMap();
			this.initializePositivesAndNegatives();
			this.initializeQuestionPosts();
			this.initializeFinish();
			this.initializeRunners();
			this.initializeLaneMap();
			this.levelBuilt = true;
		}
	},

	initializeTileMap: function(){
		this.tileMap = this.add.tilemap(settings.tileMap.key);
		this.tileMap.addTilesetImage(settings.tileMap.tileSet, settings.tileMap.tileKey);

		this.surfacesLayer = this.tileMap.createLayer('surfaces');
		this.tileMap.setCollisionBetween(1, 100000, true, 'surfaces');
		this.surfacesLayer.resizeWorld();

		this.backgroundLayer = this.tileMap.createLayer('background');
	},

	initializePositivesAndNegatives: function(){
		if(this.positives != null){
			this.positives.destroy();
		}
		this.positives = this.add.group();
		this.positives.enableBody = true;
		for (var i = 0; i < settings.positives.length; i++) {
			this.tileMap.createFromObjects("positives", settings.positives[i].gid, settings.positives[i].keys.texture, settings.positives[i].keys.image, true, false, this.positives);
		}

		if(this.negatives != null){
			this.negatives.destroy();
		}
		this.negatives = this.add.group();
		this.negatives.enableBody = true;
		for (i = 0; i < settings.negatives.length; i++) {
			this.tileMap.createFromObjects("negatives", settings.negatives[i].gid, settings.negatives[i].keys.texture, settings.negatives[i].keys.image, true, false, this.negatives);
		}
	},

	initializeQuestionPosts: function(){
		if(this.questionPosts != null){
			this.questionPosts.destroy();
		}
		this.questionPosts = this.add.group();
		this.questionPosts.enableBody = true;
		this.tileMap.createFromObjects("questions", settings.race.questionPost.gid, settings.race.questionPost.keys.texture, settings.race.questionPost.keys.image, true, false, this.questionPosts);
	},

	initializeFinish: function(){
		if(this.finish != null){
			this.finish.destroy();
		}
		this.finish = this.add.group();
		this.finish.enableBody = true;
		this.tileMap.createFromObjects("finish", settings.race.finishLine.gid, settings.race.finishLine.keys.texture, settings.race.finishLine.keys.image, true, false, this.finish);
	},

	initializeRunners: function(){
		var opponentSpeeds = [];
		for (var i = 0; i < settings.race.opponentSpeeds.length; i++) {
			opponentSpeeds.push(settings.race.opponentSpeeds[i]);
		}
		opponentSpeeds = this.randomize(opponentSpeeds);
		this.runners = [];
		var ind = 0;
		for (var i = 0; i < settings.runners.length; i++) {
			if(i != this.playerIndex){
				var thisRunner = this.add.sprite(settings.race.runnerStartPositions[ind].x, settings.race.runnerStartPositions[ind].y, settings.runners[i].key);
				thisRunner.data.opponentSpeeds = this.randomize(opponentSpeeds[ind]);
				//thisRunner.data.opponentSpeeds = this.randomize(settings.race.opponentSpeeds[ind]);
				//thisRunner.data.opponentSpeeds = settings.race.opponentSpeeds[ind];
				this.createRunner(thisRunner, settings.runners[i], false);
				thisRunner.data.index = i;
				this.runners.push(thisRunner);
				ind++;
			}
		}

		this.player = this.add.sprite(settings.race.runnerStartPositions[settings.runners.length - 1].x, settings.race.runnerStartPositions[settings.runners.length - 1].y, settings.runners[this.playerIndex].key);
		this.player.data.index = this.playerIndex;
		this.runners.push(this.player);
		this.createRunner(this.player, settings.runners[this.playerIndex], true);
	},

	createRunner: function(thisRunner, data, isPlayer){
		thisRunner.anchor.x = thisRunner.anchor.y = 0.5;
		for (var i = 0; i < data.animations.length; i++) {
			thisRunner.animations.add(data.animations[i].key, 
									  data.animations[i].frames, 
									  data.animations[i].frameRate, 
									  data.animations[i].loop);
		};
		this.physics.arcade.enable(thisRunner);
		thisRunner.body.gravity.y = data.gravity;
		thisRunner.body.setSize(data.bodySize.width, 
			                     data.bodySize.height, 
			                     data.bodySize.xOffset, 
			                     data.bodySize.yOffset);
		thisRunner.data.mode = "start";
		thisRunner.data.finished = false;
		thisRunner.data.readyForPlace = false;
		thisRunner.data.questionPostsPassed = [];
		
		if(isPlayer){
			this.camera.follow(thisRunner);
			thisRunner.data.speed = data.playerStartSpeed;
		}else{
			//thisRunner.data.opponentSpeeds = this.randomize(data.opponentSpeeds);
			thisRunner.data.speed = thisRunner.data.opponentSpeeds[0];
		}
	},

	initializeLaneMap: function(){
		for (var i = 0; i < this.runners.length; i++) {
			var thisIcon = this.add.sprite(settings.race.trackerIconStartPositions[i].x, settings.race.trackerIconStartPositions[i].y, settings.runners[this.runners[i].data.index].trackerIconKeys.texture, settings.runners[this.runners[i].data.index].trackerIconKeys.image);
			thisIcon.fixedToCamera = true;
			this.runners[i].data.icon = thisIcon;
		}
	},

	resetQuestionPool: function(){
		//console.log("resetQuestionPool");
		this.questionPool = [];
		//for (var i = 0; i < 5; i++) {
		for (var i = 0; i < settings.question.length; i++) {
			RFYH.questionPool.push(i);
		}
		if(settings.race.question.randomize){
			RFYH.questionPool = this.randomize(RFYH.questionPool);
		}
		//console.log(RFYH.questionPool);
	},

	startCountdown: function(){
		this.countdown = this.add.group();
		this.countdownStep = 0;

		this.time.events.add(1000, this.showCountdownStep, this);
	},

	showCountdownStep: function(){
		this.countdown.removeChildren();

		if(this.countdownStep == settings.race.countdown.steps.length - 1){
			this.startRunners();
			this.startRunAmbience();
		}else{
			if(this.countdownStep == settings.race.countdown.steps.length){
				this.countdown.destroy();
				return;
			}
		}

		var style = { 
		 	font: settings.race.countdown.font, 
		 	fill: settings.race.countdown.fill, 
		 	fontSize: settings.race.countdown.size,
		 	align: "center"
		};
		var text = this.add.text(settings.race.countdown.x, 
			                     settings.race.countdown.y, 
			                     settings.race.countdown.steps[this.countdownStep].text, 
			                     style,
			                     this.countdown);
		text.anchor.x = 0.5;
		text.anchor.y = 0.5;
		RFYH.voSprite.play(settings.race.countdown.steps[this.countdownStep].voKey);

		this.countdownStep++;
		this.time.events.add(settings.race.countdown.stepDuration, this.showCountdownStep, this);
	},

	startRunAmbience: function(){
		this.runAmbience = RFYH.sfxSprite.play(settings.race.runAmbience.key, settings.race.runAmbience.volume);
	},

	pauseRunAmbience: function(){
		if(this.runAmbience != null){
			this.runAmbience.volume = 0;
		}
	},

	resumeRunAmbience: function(){
		if(this.runAmbience != null){
			this.runAmbience.volume = settings.race.runAmbience.volume;
		}
	},

	startRunners: function(){
		for (var i = 0; i < this.runners.length; i++) {
			this.runners[i].data.mode = "run";
			var speed = 0;
			for (var j = 0; j < settings.runners[this.runners[i].data.index].animations.length; j++) {
				if(settings.runners[this.runners[i].data.index].animations[j].key == "run"){
					speed = settings.runners[this.runners[i].data.index].animations[j].frameRate;
					break;
				}
			}
			this.runners[i].animations.getAnimation("run").speed = speed;
			//console.log(settings.runners[this.runners[i].data.index].key + " speed: " + this.runners[i].data.speed + " (" + this.runners[i].animations.currentAnim.speed + ")");
		}
		this.input.onDown.add(this.onTap, this);
	},

	onTap: function(){
		if(this.player.data.mode == "run"){
			this.jump(this.player);
		}
	},

	jump: function(runner){
		runner.body.velocity.y = settings.runners[runner.data.index].jumpVelocity;
		runner.data.mode = "jump";
		runner.animations.play('jump');
		RFYH.sfxSprite.play(settings.race.jumpSound.key, settings.race.jumpSound.volume);
	},

	update: function(){
		if(this.levelBuilt){
			this.updateTracker();

			var player = this.runners[this.runners.length - 1];

			for (var i = 0; i < this.runners.length; i++) {
				this.physics.arcade.collide(this.runners[i], this.surfacesLayer, this.runnerOnSurface, null, this);
				this.physics.arcade.overlap(this.runners[i], this.finish, this.runnerOnFinish, null, this);
				if(i == this.runners.length - 1){ // last in list is player
					this.physics.arcade.overlap(this.runners[i], this.questionPosts, this.playerOnQuestionPost, null, this);
					this.physics.arcade.overlap(this.runners[i], this.positives, this.playerOnPositive, null, this);
					this.physics.arcade.overlap(this.runners[i], this.negatives, this.playerOnNegative, null, this);
				}else{
					this.physics.arcade.overlap(this.runners[i], this.questionPosts, this.opponentOnQuestionPost, null, this);
				}

				if(this.runners[i].data.mode == "stop"){
					this.runners[i].body.velocity.x = 0;
					if(this.runners[i].data.finished){
						this.runners[i].animations.play('stop');
					}
					this.runners[i].animations.stop();
					if(this.finishOrder.indexOf(this.runners[i]) != -1){
						this.runners[i].animations.play('stop');
					}
					if(i == this.runners.length - 1){
						this.runners[i].animations.play('stop');
						return;
					}
				}

				if(this.runners[i].data.mode == "run" || this.runners[i].data.mode == "jump"){
					this.runners[i].body.velocity.x = this.runners[i].data.speed;
				}

				if(this.runners[i].body.onFloor() && (this.runners[i].data.mode != "stop" && this.runners[i].data.mode != "start")){
					this.runners[i].animations.play('run');
					this.runners[i].data.mode = "run";
				}
			}
		}
	},

	updateTracker: function(){
		var startPos = settings.race.runnerStartPositions[settings.race.runnerStartPositions.length - 1].x;
		for (var i = 0; i < this.runners.length; i++) {
			var thisPct = (this.runners[i].x - startPos) / (settings.race.finishLineX - startPos);
			var trackerDistance = settings.race.trackerFinishX - settings.race.trackerIconStartPositions[this.runners[i].data.index].x;
			var newX = thisPct * (trackerDistance) + settings.race.trackerIconStartPositions[this.runners[i].data.index].x;
			this.runners[i].data.icon.cameraOffset.x = newX;
		}
	},

	runnerOnSurface: function(){

	},

	playerOnQuestionPost: function(player, layer){
		if(this.questionPostsHit.indexOf(layer) == -1){
			this.questionPostsHit.push(layer);
			for (var i = 0; i < this.runners.length; i++) {
				this.runners[i].data.mode = "stop";
			}
			this.input.onDown.remove(this.onTap, this);
			this.time.events.add(1000, this.showQuestion, this);

			this.pauseRunAmbience();
			RFYH.sfxSprite.play(settings.race.questionSound.key, settings.race.questionSound.volume);
		}
	},

	opponentOnQuestionPost: function(runner, layer){
		var postInd = this.questionPosts.getIndex(layer);
		if(runner.data.questionPostsPassed.indexOf(postInd) == -1){
			runner.data.questionPostsPassed.push(postInd);
			runner.data.speed = runner.data.opponentSpeeds[runner.data.questionPostsPassed.length];
		}
	},

	showQuestion: function(){
		if(this.questionDisplay == null){
			this.questionDisplay = this.add.group();
			this.questionDisplay.fixedToCamera = true;
			this.questionDisplay.x = 0;
			this.questionDisplay.y = 0;
		}
		this.add.sprite(settings.race.question.background.x, settings.race.question.background.y, settings.race.question.background.keys.texture, settings.race.question.background.keys.image, this.questionDisplay);
		this.questionDisplay.visible = true;
		var counterStyle = { 
		 	font: settings.race.question.counterText.font, 
		 	fill: settings.race.question.counterText.fill, 
		 	fontSize: settings.race.question.counterText.size,
		 	align: "left"
		};
		var counterText = this.add.text(settings.race.question.counterText.x, 
			                            settings.race.question.counterText.y, 
			                            "QUESTION " + this.questionPostsHit.length + " OF " + settings.race.question.counterText.totalQuestions, 
			                            counterStyle,
			                            this.questionDisplay);

		var thisQuestionIndex = RFYH.questionPool.splice(0, 1)[0]
		var thisQuestionData = settings.question[thisQuestionIndex];
		this.currentQuestionIndex = thisQuestionIndex;
		//console.log(this.currentQuestionIndex + " <- " + RFYH.questionPool);
		if(RFYH.questionPool.length == 0){
			this.resetQuestionPool();
		}
		this.loadQuestionAudio("question", settings.question[this.currentQuestionIndex].questionAudio);
		this.questionsSeen++;

		var questionStyle = { 
		 	font: settings.race.question.questionText.font, 
		 	fill: settings.race.question.questionText.fill, 
		 	fontSize: settings.race.question.questionText.size,
		 	wordWrap: true,
		 	wordWrapWidth: settings.race.question.questionText.wordWrapWidth,
		 	align: "left"
		};
		var questionText = this.add.text(settings.race.question.questionText.x, 
			                             settings.race.question.questionText.y, 
			                            thisQuestionData.questionText, 
			                            questionStyle,
			                            this.questionDisplay);
		questionText.lineSpacing = settings.race.question.questionText.lineSpacing;

		var optionStyle = { 
		 	font: settings.race.question.optionText.font, 
		 	fill: settings.race.question.optionText.fill, 
		 	fontSize: settings.race.question.optionText.size,
		 	wordWrap: true,
		 	wordWrapWidth: settings.race.question.optionText.wordWrapWidth,
		 	align: "left"
		};
		this.optionButtons = [];
		for (var i = 0; i < thisQuestionData.option.length; i++) {
			var optionButton = this.add.button(settings.race.question.optionButtons[i].x, settings.race.question.optionButtons[i].y, settings.race.question.optionButtons[i].texture, this.handleQuestionOption, this, settings.race.question.optionButtons[i].overKey, settings.race.question.optionButtons[i].outKey, settings.race.question.optionButtons[i].downKey, settings.race.question.optionButtons[i].upKey, this.questionDisplay);
			optionButton.data.index = i;
			this.optionButtons.push(optionButton);
			var optionText = this.add.text(optionButton.x + settings.race.question.optionText.buttonOffset.x, 
			                               optionButton.y + settings.race.question.optionText.buttonOffset.y, 
			                               thisQuestionData.option[i], 
			                               optionStyle,
			                               this.questionDisplay);
			optionText.inputEnabled = false;
			optionText.lineSpacing = settings.race.question.optionText.lineSpacing;
		}
	},

	loadQuestionAudio: function(key, data){
		var loader = this.load.audio(key, data);
		loader.onLoadComplete.addOnce(this.playQuestionAudio, this, 0, key);
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

	handleQuestionOption: function(option){
		var optionIndex = option.data.index;
		for (var i = 0; i < this.optionButtons.length; i++) {
			this.optionButtons[i].inputEnabled = false;
		}
		option.setFrames(settings.race.question.optionButtons[optionIndex].downKey, settings.race.question.optionButtons[optionIndex].downKey, settings.race.question.optionButtons[optionIndex].downKey, settings.race.question.optionButtons[optionIndex].downKey);

		this.stopQuestionAudio();
		this.loadQuestionAudio("remediation", settings.question[this.currentQuestionIndex].remediationAudio[optionIndex]);
		
		var remediationStyle = { 
		 	font: settings.race.question.remediationText.font, 
		 	fill: settings.race.question.remediationText.fill, 
		 	fontSize: settings.race.question.remediationText.size,
		 	wordWrap: true,
		 	wordWrapWidth: settings.race.question.remediationText.wordWrapWidth,
		 	align: "left"
		};
		var remediationText = this.add.text(settings.race.question.remediationText.x, 
			                                settings.race.question.remediationText.y, 
			                                settings.question[this.currentQuestionIndex].remediation[optionIndex], 
			                                remediationStyle,
			                                this.questionDisplay);
		remediationText.lineSpacing = settings.race.question.remediationText.lineSpacing;

		var continueButton = this.add.button(settings.race.question.continueButton.x, settings.race.question.continueButton.y, settings.race.question.continueButton.texture, this.handleQuestionContinue, this, settings.race.question.continueButton.overKey, settings.race.question.continueButton.outKey, settings.race.question.continueButton.downKey, settings.race.question.continueButton.upKey, this.questionDisplay);

		if(optionIndex == settings.question[this.currentQuestionIndex].correctIndex){
			continueButton.data.correct = true;
		}else{
			continueButton.data.correct = false;
		}
	},

	handleQuestionContinue: function(continueButton){
		this.destroyQuestion();
		this.stopQuestionAudio();
		if(continueButton.data.correct){
			this.handleCorrectResponse();
		}else{
			this.handleIncorrectResponse();
		}
		//this.adjustOpponentSpeeds();
		this.startRunners();
		this.resumeRunAmbience();
	},

	destroyQuestion: function(){
		for (var i = 0; i < this.optionButtons.length; i++) {
			this.optionButtons[i].destroy();
		}
		this.questionDisplay.removeChildren();
		this.questionDisplay.visible = false;
	},

	handleCorrectResponse: function(){
		this.player.data.speed += settings.race.question.questionSpeedAdjustments.correct;
		//this.player.data.speed = 220;
	},

	handleIncorrectResponse: function(){
		this.player.data.speed += settings.race.question.questionSpeedAdjustments.incorrect;
		//this.player.data.speed = 210;
	},

	adjustOpponentSpeeds: function(){
		/*for (var i = 0; i < this.runners.length - 1; i++) {
			this.runners[i].data.speed = this.runners[i].data.opponentSpeeds[this.questionsSeen];
		}*/
	},

	playerOnPositive: function(player, object){
		object.destroy();
		this.player.data.speed += settings.race.positiveBoost.amount; 
		//this.player.animations.currentAnim.speed += settings.race.positiveBoost.frameRateAdjust;
		this.player.animations.getAnimation("run").speed += settings.race.positiveBoost.frameRateAdjust;
		this.time.events.add(settings.race.positiveBoost.duration, this.endPositiveBoost, this);

		RFYH.sfxSprite.play(settings.race.positiveSound.key, settings.race.positiveSound.volume);
	},

	endPositiveBoost: function(){
		this.player.data.speed -= settings.race.positiveBoost.amount; 
		//this.player.animations.currentAnim.speed -= settings.race.positiveBoost.frameRateAdjust;
		this.player.animations.getAnimation("run").speed -= settings.race.positiveBoost.frameRateAdjust;
	},

	playerOnNegative: function(player, object){
		object.destroy();
		this.player.data.speed += settings.race.negativeBoost.amount; 
		//this.player.animations.currentAnim.speed += settings.race.negativeBoost.frameRateAdjust;
		this.player.animations.getAnimation("run").speed += settings.race.negativeBoost.frameRateAdjust;
		this.time.events.add(settings.race.negativeBoost.duration, this.endNegativeBoost, this);

		RFYH.sfxSprite.play(settings.race.negativeSound.key, settings.race.negativeSound.volume);
	},

	endNegativeBoost: function(){
		this.player.data.speed -= settings.race.negativeBoost.amount; 
		//this.player.animations.currentAnim.speed -= settings.race.negativeBoost.frameRateAdjust;
		this.player.animations.getAnimation("run").speed -= settings.race.negativeBoost.frameRateAdjust;
	},

	runnerOnFinish: function(runner, object){
		if(this.finishOrder.indexOf(runner) == -1){
			this.finishOrder.push(runner);
			this.time.events.add(settings.race.finishStopDelays[this.finishOrder.length - 1], this.finishRunner, this, runner);
			if(runner == this.player){
				this.playFinishlineAudio();
			}
		}
	},

	playFinishlineAudio: function(){
		RFYH.sfxSprite.play(settings.race.finishlineAudio.key, settings.race.finishlineAudio.volume);
	},

	finishRunner: function(runner){
		runner.data.mode = "stop";
		if(this.finishOrder.length == settings.runners.length){
			var order = [];
			for (var i = 0; i < this.finishOrder.length; i++) {
				order.push(this.finishOrder[i].data.index);
			}
			this.time.events.add(666, function(){ 
				RFYH.sfxSprite.stop();
				this.state.start('podium', true, false, order, this.playerIndex); 
			}, this);
		}
	},

	randomize: function(arr){
		var arrCopy = arr.slice(0); // make a copy first
		var newArr = [];
		while(arrCopy.length > 0){
			var rand = Math.floor(Math.random() * arrCopy.length);
			newArr.push(arrCopy.splice(rand, 1)[0]);
		}
		return newArr;
	}

}