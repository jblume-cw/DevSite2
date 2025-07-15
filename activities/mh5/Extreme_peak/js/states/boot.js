var ExtremePeak = {
	voSprite: null,
	sfxSprite: null,
	availableQuestions: null
};

ExtremePeak.boot = function(game){
	this.clickthroughGroup = null;
};

ExtremePeak.boot.prototype = {
	
	init: function(){
		this.stage.backgroundColor = '#ffffff';
		ExtremePeak.availableQuestions = [];

		if(epSettings.autoScale){
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            window.addEventListener("resize", this.onResize.bind(this));
            this.onResize();
		}

		/*var longestQ = 0;
		var longestQInd = 0;
		var longestO = 0;
		var longestOQind = 0;
		var longestOind = 0;
		var longestR = 0;
		var longestRQind = 0;
		var longestRind = 0;
		for (var i = 0; i < epSettings.game.questions.length; i++) {
			if(epSettings.game.questions[i].questionText.length > longestQ){
				longestQ = epSettings.game.questions[i].questionText.length;
				longestQInd = i;
			}
			for (var j = 0; j < epSettings.game.questions[i].optionText.length; j++) {
				if(epSettings.game.questions[i].optionText[j].length > longestO){
					longestO = epSettings.game.questions[i].optionText[j].length;
					longestOQind = i;
					longestOind = j;
				}
			}
			for (j = 0; j < epSettings.game.questions[i].remediationText.length; j++) {
				if(epSettings.game.questions[i].remediationText[j].length > longestR){
					longestR = epSettings.game.questions[i].remediationText[j].length;
					longestRQind = i;
					longestRind = j
				}
			}
		}
		console.log("Longest question: Q" + longestQInd + " (" + longestQ + ") >> " + epSettings.game.questions[longestQInd].questionText);
		console.log("Longest option: Q" + longestOQind + " (" + longestO + ") >> " + epSettings.game.questions[longestOQind].optionText[longestOind]);
		console.log("Longest remediation: Q" + longestRQind + " (" + longestR + ") >> " + epSettings.game.questions[longestRQind].remediationText[longestRind]);*/
	},
	
    /**
     * Scales the gameContainer so that it does not exceed the inner browser width or height
     */
    onResize: function(){
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var windowRatio = windowWidth / windowHeight;
        var gameContainer = document.querySelector("canvas");
        var boxRatio = this.game.world.width / this.game.world.height;
        if(windowRatio < boxRatio){
            gameContainer.style.width = windowWidth + "px";
            gameContainer.style.height = (windowWidth / boxRatio) + "px";
        }else{
            gameContainer.style.width = (windowHeight * boxRatio) + "px";
            gameContainer.style.height = windowHeight + "px";
        }
    },

	preload: function(){
		this.load.image(epSettings.loader.rotator.key, epSettings.loader.rotator.file);
		this.load.image(epSettings.loader.background.key, epSettings.loader.background.file);
	},

	create: function(){
		var canContinue = true;
		if(epSettings.scormEnabled){
			var canContinue = SCORM_API_adapter.lmsInitialize();
		}
		if(canContinue){
			if(this.game.device.iOS){
				this.addClickthrough();
			}else{
				this.moveOn();
			}
		}else{
			alert("Unable to initialize SCORM API. Re-start course to try again.");
		}
		
	},

	addClickthrough: function(){
		this.clickthroughGroup = this.add.group();

		var background = this.add.sprite(epSettings.loader.background.x, epSettings.loader.background.y, epSettings.loader.background.key);

    	var messageStyle = { 
		 	font: epSettings.loader.label.font, 
		 	fill: epSettings.loader.label.fill, 
		 	fontSize: epSettings.loader.label.size,
		 	align: "center"
		};
		var messageText = this.add.text(epSettings.loader.rotator.x, 
									    epSettings.loader.rotator.y, 
			                            epSettings.loader.label.clickthroughText, messageStyle);
		messageText.anchor.x = 0.5;
		messageText.anchor.y = 1;

		this.clickthroughGroup.add(background);
		this.clickthroughGroup.add(messageText);

		this.input.onUp.add(this.handleClickthrough, this);
	},

	handleClickthrough: function(){
		this.clickthroughGroup.destroy();
		this.moveOn();
	},

	moveOn: function(){
		this.state.start('preloader');
	}

};