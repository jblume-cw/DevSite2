var BHM = {
	soundSprite: null,
	sfxSprite: null,
	clickthroughGroup: null,
	dayIndex: null,
	mealIndex: null,
	foodIndex: null,
	history: null,
	evaluation: null,
	highScores: null,

	addText: function(data, context, overrideText, group){
		var style = { 
		 	font: data.font, 
		 	fill: data.fill, 
		 	fontSize: data.size,
		 	fontWeight: data.weight,
		 	align: data.align
		};

		if(data.wordWrapWidth > 0){
			style.wordWrap = true;
			style.wordWrapWidth = data.wordWrapWidth;
		};

		var text = context.add.text(data.x, data.y, data.text, style);
		text.anchor = data.anchor;
		text.lineSpacing = data.lineSpacing;

		if(overrideText != null){
			text.text = overrideText;
		}
		if(group != null){
			group.add(text);
		}
		
		return text;
	},

	addImage: function(data, context, group){
		var image = context.add.image(data.x, data.y, data.texture, data.key);
		if(data.anchor){
			image.anchor = data.anchor;
		}
		if(data.hitArea){
			image.hitArea = new Phaser.Rectangle(data.hitArea.x, data.hitArea.y, data.hitArea.width, data.hitArea.height);
		}
		if(data.scale){
			image.scale = data.scale;
		}
		if(group != null){
			group.add(image);
		}

		return image;
	},

	addSprite: function(data, context){
		var sprite = context.add.sprite(data.x, data.y, data.texture, data.key);
		if(data.anchor){
			sprite.anchor = data.anchor;
		}
		if(data.hitArea){
			sprite.hitArea = new Phaser.Rectangle(data.hitArea.x, data.hitArea.y, data.hitArea.width, data.hitArea.height);
		}

		return sprite;
	},

	addButton: function(data, callback, context, group){
		var button = context.add.button(data.x, data.y, data.texture, callback, context, data.overKey, data.outKey, data.downKey, data.upKey);
		if(button.anchor){
			button.anchor = data.anchor;
		}
		if(data.hitArea){
			switch(data.hitArea.type){
				case "ellipse":
					button.hitArea = new Phaser.Ellipse(data.hitArea.data.x, data.hitArea.data.y, data.hitArea.data.width, data.hitArea.data.height);
					break;
				case "polygon":
					button.hitArea = new Phaser.Polygon(data.hitArea.data.points);
					break;
				case "circle":
					button.hitArea = new Phaser.Circle(data.hitArea.data.x, data.hitArea.data.y, data.hitArea.data.diameter);
					break;
				case "rectangle":
					button.hitArea = new Phaser.Rectangle(data.hitArea.data.x, data.hitArea.data.y, data.hitArea.data.width, data.hitArea.data.height);
					break;
			}
		}

		if(group != null){
			group.add(button);
		}

		return button;
	},

	translateStyle: function(data){
		var style = { 
		 	font: data.font, 
		 	fill: data.fill, 
		 	fontSize: data.size,
		 	fontWeight: data.weight,
		 	align: data.align
		};

		if(data.wordWrapWidth > 0){
			style.wordWrap = true;
			style.wordWrapWidth = data.wordWrapWidth;
		};

		return style;
	},

	getTally: function(){
		var correctTally = 0;
		for (var i = 0; i < BHM.evaluation.length; i++) {
			if(BHM.evaluation[i]){
				correctTally++;
			}
		}
		return correctTally + "/" + BHM.evaluation.length;
	},

	markComplete: function(){
		if(BHMSettings.scormEnabled){
			SCORM_API_adapter.markComplete();
		}
	},

	writeSuspendData: function(data){
		if(BHMSettings.scormEnabled){
			SCORM_API_adapter.setSuspendData(String(data));
		}
	},

	getSuspendData: function(){
		if(BHMSettings.scormEnabled){
			var data = SCORM_API_adapter.getSuspendData();
			if(data != null && data != ""){
				BHM.dayIndex = Number(data);
			}
		}
	},

	initializeHighScores: function(){
		BHM.highScores = [];
		for (var i = 0; i < BHMSettings.mealData.days.length; i++) {
			this.highScores.push(0);
		}
		if(BHMSettings.scormEnabled){
			var objectiveCount = SCORM_API_adapter.getObjectiveCount();
			if(objectiveCount == 0){
				for (var i = 0; i < BHMSettings.mealData.days.length; i++) {
					SCORM_API_adapter.createObjective(i, "day" + (i + 1), "not attempted");
					SCORM_API_adapter.setObjectiveRawScore(i, 0);
				}
			}else{
				for (var i = 0; i < objectiveCount; i++) {
					var thisScore = SCORM_API_adapter.getObjectiveRawScore(i);
					this.highScores[i] = Number(thisScore);
				}
			}
		}
		//console.log("init high scores: " + this.highScores);
	},

	storeHighScore: function(day, score, max){
		if(score > this.highScores[day]){
			this.highScores[day] = score;
			if(BHMSettings.scormEnabled){
				SCORM_API_adapter.setObjectiveRawScore(day, score);
				SCORM_API_adapter.setObjectiveMaxScore(day, max);
				SCORM_API_adapter.setObjectiveStatus(day, "completed");
			}
		}
		//console.log("update high scores: " + this.highScores);
	}
};

BHM.boot = function(game){
	this.clickthroughGroup = null;
};

BHM.boot.prototype = {
	
	init: function(){
		this.stage.backgroundColor = BHMSettings.backgroundColor;
		BHM.dayIndex = 0;

		if(BHMSettings.autoScale){
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	        window.addEventListener("resize", this.onResize.bind(this));
	        this.onResize();
		}
	},

	preload: function(){
		this.load.image(BHMSettings.loader.rotator.key, BHMSettings.loader.rotator.file);
		for (var i = 0; i < BHMSettings.loader.backgroundElements.length; i++) {
			this.load.image(BHMSettings.loader.backgroundElements[i].key, BHMSettings.loader.backgroundElements[i].file);
		}
	},

	create: function(){
		var canContinue = true;
		if(BHMSettings.scormEnabled){
			canContinue = SCORM_API_adapter.lmsInitialize();
		}
		if(canContinue){
			this.addClickthrough();
			BHM.getSuspendData();
			BHM.initializeHighScores();
		}else{
			alert("Unable to initialize SCORM API. Re-start course to try again.");
		}
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

	addClickthrough: function(){
		this.clickthroughGroup = this.add.group();

		for (var i = 0; i < BHMSettings.loader.backgroundElements.length; i++) {
			this.clickthroughGroup.add(this.add.sprite(BHMSettings.loader.backgroundElements[i].x, BHMSettings.loader.backgroundElements[i].y, BHMSettings.loader.backgroundElements[i].key));
		}

		var clickthroughText = BHM.addText(BHMSettings.loader.clickthroughText, this);
		this.clickthroughGroup.add(clickthroughText);

		this.input.onTap.add(this.handleClickthrough, this);
	},

	handleClickthrough: function(){
		this.clickthroughGroup.destroy();
		this.moveOn();
	},

	moveOn: function(){
		this.state.start('preloader');
	}

};