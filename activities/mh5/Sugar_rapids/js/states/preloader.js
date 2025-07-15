SugarRapids.preloader = function(game){
	this.rotator = null;
};

SugarRapids.preloader.prototype = {
	
	init: function(){
	},

	preload: function(){
		this.addLoader();

		for (var i = 0; i < settings.textures.length; i++) {
			this.load.atlas(settings.textures[i].key, settings.textures[i].image, settings.textures[i].data, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		}

		this.load.audiosprite(settings.voiceover.key, settings.voiceover.urls, null, settings.voiceover.data);
		this.load.audiosprite(settings.sfx.key, settings.sfx.urls, null, settings.sfx.data);
	},

	addLoader: function(){
		this.add.sprite(settings.loader.background.x, settings.loader.background.y, settings.loader.background.key);

		this.rotator = this.add.sprite(settings.loader.rotator.x, settings.loader.rotator.y, settings.loader.rotator.key);
		this.rotator.anchor.x = this.rotator.anchor.y = 0.5;

		var loaderStyle = { 
		 	font: settings.loader.label.font, 
		 	fill: settings.loader.label.fill, 
		 	fontSize: settings.loader.label.size,
		 	align: "center"
		};
		var loaderText = this.add.text(this.rotator.x, 
			                      	   this.rotator.y - (this.rotator.height/2) - settings.loader.label.padding, 
			                           settings.loader.label.loadingText, loaderStyle);
		loaderText.anchor.x = 0.5;
		loaderText.anchor.y = 1;
	},

	loadUpdate: function(){
		if(this.rotator != null){
			this.rotator.angle += settings.loader.rotator.speed;
		}
	},

	update: function(){
		if(this.rotator != null){
			this.rotator.angle += settings.loader.rotator.speed;
		}
	},

	create: function(){
		SugarRapids.voSprite = this.add.audioSprite(settings.voiceover.key);
		SugarRapids.sfxSprite = this.add.audioSprite(settings.sfx.key);
		this.sound.setDecodedCallback([settings.voiceover.key, settings.sfx.key], this.loadedAndDecoded, this);
	},

	loadedAndDecoded: function(){
		this.state.start('splash');
	},

	shutdown: function(){
		this.rotator.destroy();
	}

};