SkeeBall.preloader = function(game){
	this.rotator = null;
};

SkeeBall.preloader.prototype = {
	
	init: function(){
	},

	preload: function(){
		this.addLoader();

		for (var i = 0; i < SkeeBallSettings.textures.length; i++) {
			this.load.atlas(SkeeBallSettings.textures[i].key, SkeeBallSettings.textures[i].image, SkeeBallSettings.textures[i].data, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		}

		this.load.audiosprite(SkeeBallSettings.audio.key, SkeeBallSettings.audio.urls, null, SkeeBallSettings.audio.data);
	},

	addLoader: function(){
		for (var i = 0; i < SkeeBallSettings.loader.backgroundElements.length; i++) {
			this.add.sprite(SkeeBallSettings.loader.backgroundElements[i].x, SkeeBallSettings.loader.backgroundElements[i].y, SkeeBallSettings.loader.backgroundElements[i].key);
		}

		this.rotator = this.add.sprite(SkeeBallSettings.loader.rotator.x, SkeeBallSettings.loader.rotator.y, SkeeBallSettings.loader.rotator.key);
		this.rotator.anchor.x = this.rotator.anchor.y = 0.5;

		var loaderStyle = { 
		 	font: SkeeBallSettings.loader.label.font, 
		 	fill: SkeeBallSettings.loader.label.fill, 
		 	fontSize: SkeeBallSettings.loader.label.size,
		 	align: "center"
		};
		var loaderText = this.add.text(SkeeBallSettings.loader.label.x, 
			                      	   SkeeBallSettings.loader.label.y, 
			                           SkeeBallSettings.loader.label.loadingText, loaderStyle);
		loaderText.anchor.x = 0.5;
		loaderText.anchor.y = 0;
	},

	loadUpdate: function(){
		if(this.rotator != null){
			this.rotator.angle += SkeeBallSettings.loader.rotator.speed;
		}
	},

	update: function(){
		if(this.rotator != null){
			this.rotator.angle += SkeeBallSettings.loader.rotator.speed;
		}
	},

	create: function(){
		SkeeBall.soundSprite = this.add.audioSprite(SkeeBallSettings.audio.key);
		this.sound.setDecodedCallback([SkeeBallSettings.audio.key], this.loadedAndDecoded, this);
		//this.loadedAndDecoded();
	},

	loadedAndDecoded: function(){
		this.state.start('instructions');
		//SkeeBall.score = 12000;
		//this.state.start("gameOver");
		//this.state.start('roll', true, false, 0, true, 0);
	},

	shutdown: function(){
		this.rotator.destroy();
	}

};