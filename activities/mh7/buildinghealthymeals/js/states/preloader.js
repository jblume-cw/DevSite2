BHM.preloader = function(game){
	this.rotator = null;
};

BHM.preloader.prototype = {
	
	init: function(){
	},

	preload: function(){
		this.addLoader();

		for (var i = 0; i < BHMSettings.textures.length; i++) {
			this.load.atlas(BHMSettings.textures[i].key, BHMSettings.textures[i].image, BHMSettings.textures[i].data, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		}

		this.load.audiosprite(BHMSettings.voiceOver.key, BHMSettings.voiceOver.urls, null, BHMSettings.voiceOver.data);
		this.load.audiosprite(BHMSettings.sfx.key, BHMSettings.sfx.urls, null, BHMSettings.sfx.data);
	},

	addLoader: function(){
		for (var i = 0; i < BHMSettings.loader.backgroundElements.length; i++) {
			this.add.sprite(BHMSettings.loader.backgroundElements[i].x, BHMSettings.loader.backgroundElements[i].y, BHMSettings.loader.backgroundElements[i].key);
		}

		this.rotator = this.add.sprite(BHMSettings.loader.rotator.x, BHMSettings.loader.rotator.y, BHMSettings.loader.rotator.key);
		this.rotator.anchor.x = this.rotator.anchor.y = 0.5;

		BHM.addText(BHMSettings.loader.loadingText, this);
	},

	loadUpdate: function(){
		if(this.rotator != null){
			this.rotator.angle += BHMSettings.loader.rotator.speed;
		}
	},

	update: function(){
		if(this.rotator != null){
			this.rotator.angle += BHMSettings.loader.rotator.speed;
		}
	},

	create: function(){
		BHM.soundSprite = this.add.audioSprite(BHMSettings.voiceOver.key);
		BHM.sfxSprite = this.add.audioSprite(BHMSettings.sfx.key);
		this.sound.setDecodedCallback([BHMSettings.voiceOver.key, BHMSettings.sfx.key], this.loadedAndDecoded, this);
		//this.loadedAndDecoded();
	},

	loadedAndDecoded: function(){
		this.state.start('instructions');
		//this.state.start('roll', true, false, 0, true, 0);
	},

	shutdown: function(){
		this.rotator.destroy();
	}

};