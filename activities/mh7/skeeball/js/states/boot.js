var SkeeBall = {
	soundSprite: null,
	clickthroughGroup: null,
	currentQuestion: null,
	score: null,
	questionPool: null,
	questionPoolKey: null,
	questionCount: null,

	addText: function(data, context){
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

		return text;
	},

	addImage: function(data, context){
		var image = context.add.image(data.x, data.y, data.texture, data.key);
		if(data.anchor){
			image.anchor = data.anchor;
		}
		if(data.hitArea){
			image.hitArea = new Phaser.Rectangle(data.hitArea.x, data.hitArea.y, data.hitArea.width, data.hitArea.height);
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

	addButton: function(data, callback, context){
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

	formatScore: function(score){
		return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
};

SkeeBall.boot = function(game){
	this.clickthroughGroup = null;
};

SkeeBall.boot.prototype = {
	
	init: function(){
		this.stage.backgroundColor = SkeeBallSettings.backgroundColor;

		SkeeBall.currentQuestion = 0;
		SkeeBall.questionCount = 1;
		SkeeBall.score = 0;
		SkeeBall.questionPool = [];

		if(SkeeBallSettings.autoScale){
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	        window.addEventListener("resize", this.onResize.bind(this));
	        this.onResize();
		}
		
		this.initializeQuestionPool();

		/*var str = "";
		var prefixes = ["a", "b", "c", "d"];
		for (var i = 0; i < SkeeBallSettings.questions.length; i++) {
			var tag = "Question" + (i) + "-" + SkeeBallSettings.questions[i].value;
			str += tag + "\n";
			str += SkeeBallSettings.questions[i].question + "\n";
			for (var j = 0; j < SkeeBallSettings.questions[i].options.length; j++) {
				str += prefixes[j] + ". " + SkeeBallSettings.questions[i].options[j] + "\n";
			}
			str += "\n";
			for (j = 0; j < SkeeBallSettings.questions[i].remediation.length; j++) {
				str += tag + "-remediation-" + prefixes[j] + "\n";
				str += SkeeBallSettings.questions[i].remediation[j] + "\n\n";
			}
		}
		console.log(str);*/
	},

	initializeQuestionPool: function(){
		SkeeBall.questionPoolKey = [];
		for (var i = 0; i < SkeeBallSettings.questions.length; i++) {
			if(SkeeBall.questionPoolKey.indexOf(SkeeBallSettings.questions[i].value) == -1){
				SkeeBall.questionPoolKey.push(SkeeBallSettings.questions[i].value);
				SkeeBall.questionPool.push([]);
			}
		}
		//console.log(SkeeBall.questionPoolKey);
	},

	preload: function(){
		this.load.image(SkeeBallSettings.loader.rotator.key, SkeeBallSettings.loader.rotator.file);
		for (var i = 0; i < SkeeBallSettings.loader.backgroundElements.length; i++) {
			this.load.image(SkeeBallSettings.loader.backgroundElements[i].key, SkeeBallSettings.loader.backgroundElements[i].file);
		}
	},

	create: function(){
		var canContinue = true;
		if(SkeeBallSettings.scormEnabled){
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

		for (var i = 0; i < SkeeBallSettings.loader.backgroundElements.length; i++) {
			this.clickthroughGroup.add(this.add.sprite(SkeeBallSettings.loader.backgroundElements[i].x, SkeeBallSettings.loader.backgroundElements[i].y, SkeeBallSettings.loader.backgroundElements[i].key));
		}

    	var messageStyle = { 
		 	font: SkeeBallSettings.loader.label.font, 
		 	fill: SkeeBallSettings.loader.label.fill, 
		 	fontSize: SkeeBallSettings.loader.label.size,
		 	align: "center"
		};
		var messageText = this.add.text(SkeeBallSettings.loader.label.x, 
									    SkeeBallSettings.loader.label.y, 
			                            SkeeBallSettings.loader.label.clickthroughText, messageStyle);
		messageText.anchor.x = 0.5;
		messageText.anchor.y = 0;

		this.clickthroughGroup.add(messageText);

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