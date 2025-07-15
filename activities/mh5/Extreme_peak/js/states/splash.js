ExtremePeak.splash = function(game){};

ExtremePeak.splash.prototype = {

	init: function(){
	},

	preload: function(){
	},

	create: function(){
		this.add.sprite(epSettings.splash.background.x, epSettings.splash.background.y, epSettings.splash.background.key);
		for (var i = 0; i < epSettings.splash.decorations.length; i++) {
			var thisSprite = this.add.sprite(epSettings.splash.decorations[i].x, epSettings.splash.decorations[i].y, epSettings.splash.decorations[i].texture, epSettings.splash.decorations[i].key);
			thisSprite.scale.x = epSettings.splash.decorations[i].scale[0];
			thisSprite.scale.y = epSettings.splash.decorations[i].scale[1];
		}
		for (i = 0; i < epSettings.splash.texts.length; i++) {
			var textStyle = { 
			 	font: epSettings.splash.texts[i].font, 
			 	fill: epSettings.splash.texts[i].fill, 
			 	fontSize: epSettings.splash.texts[i].size,
			 	fontWeight: epSettings.splash.texts[i].weight,
			 	align: epSettings.splash.texts[i].align
			};
			if(epSettings.splash.texts[i].wordWrap){
				textStyle.wordWrap = true;
				textStyle.wordWrapWidth = epSettings.splash.texts[i].wordWrapWidth;
			}
			var textItem = this.add.text(epSettings.splash.texts[i].x, 
										 epSettings.splash.texts[i].y, 
				                         epSettings.splash.texts[i].message, 
				                         textStyle);
			if(epSettings.splash.texts[i].align == "center"){
				textItem.anchor.x = 0.5;
			}
			textItem.lineSpacing = epSettings.splash.texts[i].lineSpacing;
		}
		this.add.button(epSettings.splash.continueButton.x, epSettings.splash.continueButton.y, epSettings.splash.continueButton.texture, this.beginGame, this, epSettings.splash.continueButton.overKey, epSettings.splash.continueButton.outKey, epSettings.splash.continueButton.downKey, epSettings.splash.continueButton.upKey);

		ExtremePeak.sfxSprite.play(epSettings.splash.musicKey, epSettings.splash.musicVolume);
		ExtremePeak.voSprite.play(epSettings.splash.voKey);
	},

	beginGame: function(){
		ExtremePeak.sfxSprite.stop();
		ExtremePeak.voSprite.stop();
		this.state.start('characterSelect');
	}

}