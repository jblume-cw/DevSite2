ExtremePeak.preloader = function(game){
	this.rotator = null;
};

ExtremePeak.preloader.prototype = {
	
	init: function(){
	},

	preload: function(){
		this.addLoader();

		this.load.atlas(epSettings.textureKey, 'images/spritesheet.png', 'images/spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		this.load.audiosprite(epSettings.voiceover.key, epSettings.voiceover.urls, null, epSettings.voiceover.data);
		this.load.audiosprite(epSettings.sfx.key, epSettings.sfx.urls, null, epSettings.sfx.data);
	},

	addLoader: function(){
		this.add.sprite(epSettings.loader.background.x, epSettings.loader.background.y, epSettings.loader.background.key);

		this.rotator = this.add.sprite(epSettings.loader.rotator.x, epSettings.loader.rotator.y, epSettings.loader.rotator.key);
		this.rotator.anchor.x = this.rotator.anchor.y = 0.5;

		var loaderStyle = { 
		 	font: epSettings.loader.label.font, 
		 	fill: epSettings.loader.label.fill, 
		 	fontSize: epSettings.loader.label.size,
		 	align: "center"
		};
		var loaderText = this.add.text(this.rotator.x, 
			                      	   this.rotator.y - (this.rotator.height/2) - epSettings.loader.label.padding, 
			                           epSettings.loader.label.loadingText, loaderStyle);
		loaderText.anchor.x = 0.5;
		loaderText.anchor.y = 1;
	},

	loadUpdate: function(){
		if(this.rotator != null){
			this.rotator.angle += epSettings.loader.rotator.speed;
		}
	},

	update: function(){
		if(this.rotator != null){
			this.rotator.angle += epSettings.loader.rotator.speed;
		}
	},

	create: function(){
		console.log("assets loaded");
		ExtremePeak.voSprite = this.add.audioSprite(epSettings.voiceover.key);
		ExtremePeak.sfxSprite = this.add.audioSprite(epSettings.sfx.key);
		this.sound.setDecodedCallback([epSettings.voiceover.key, epSettings.sfx.key], this.loadedAndDecoded, this);
	},

	loadedAndDecoded: function(){
		console.log("audio decoded");
		this.state.start('splash');
	},

	shutdown: function(){
		this.rotator.destroy();
	}

};