SugarRapids.splash = function(game){};

SugarRapids.splash.prototype = {
	
	init: function(){
	},

	preload: function(){
	},

	create: function(){
		for (var i = 0; i < settings.splash.backgroundElements.length; i++) {
			settings.splash.backgroundElements[i]
			this.add.sprite(settings.splash.backgroundElements[i].x, settings.splash.backgroundElements[i].y, settings.splash.backgroundElements[i].texture, settings.splash.backgroundElements[i].image);
		}
		this.add.button(settings.splash.beginButton.x, settings.splash.beginButton.y, settings.splash.beginButton.texture, this.beginGame, this, settings.splash.beginButton.overKey, settings.splash.beginButton.outKey, settings.splash.beginButton.downKey, settings.splash.beginButton.upKey);

		this.time.events.add(666, function(){
			SugarRapids.voSprite.play(settings.splash.introVo.key, settings.splash.introVo.volume);
		}, this);

		
	},

	beginGame: function(){
		SugarRapids.voSprite.stop();
		this.state.start('game');
	}

};