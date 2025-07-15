ExtremePeak.characterSelect = function(game){};

ExtremePeak.characterSelect.prototype = {

	init: function(){
	},

	preload: function(){
	},

	create: function(){
		this.add.sprite(epSettings.characterSelect.background.x, epSettings.characterSelect.background.y, epSettings.characterSelect.background.key);

		for (var i = 0; i < epSettings.characterSelect.decorations.length; i++) {
			var thisSprite = this.add.sprite(epSettings.characterSelect.decorations[i].x, epSettings.characterSelect.decorations[i].y, epSettings.characterSelect.decorations[i].texture, epSettings.characterSelect.decorations[i].key);
			thisSprite.scale.x = epSettings.characterSelect.decorations[i].scale[0];
			thisSprite.scale.y = epSettings.characterSelect.decorations[i].scale[1];
		}

		for (i = 0; i < epSettings.characterSelect.texts.length; i++) {
			var textStyle = { 
			 	font: epSettings.characterSelect.texts[i].font, 
			 	fill: epSettings.characterSelect.texts[i].fill, 
			 	fontSize: epSettings.characterSelect.texts[i].size,
			 	fontWeight: epSettings.characterSelect.texts[i].weight,
			 	align: epSettings.characterSelect.texts[i].align
			};
			if(epSettings.characterSelect.texts[i].wordWrap){
				textStyle.wordWrap = true;
				textStyle.wordWrapWidth = epSettings.characterSelect.texts[i].wordWrapWidth;
			}
			var textItem = this.add.text(epSettings.characterSelect.texts[i].x, 
										 epSettings.characterSelect.texts[i].y, 
				                         epSettings.characterSelect.texts[i].message, 
				                         textStyle);
			if(epSettings.characterSelect.texts[i].align == "center"){
				textItem.anchor.x = 0.5;
			}
			textItem.lineSpacing = epSettings.characterSelect.texts[i].lineSpacing;
		}

		this.add.button(epSettings.characterSelect.characterOneButton.x, epSettings.characterSelect.characterOneButton.y, epSettings.characterSelect.characterOneButton.texture, this.choosePlayerOne, this, epSettings.characterSelect.characterOneButton.overKey, epSettings.characterSelect.characterOneButton.outKey, epSettings.characterSelect.characterOneButton.downKey, epSettings.characterSelect.characterOneButton.upKey);
		this.add.button(epSettings.characterSelect.characterTwoButton.x, epSettings.characterSelect.characterTwoButton.y, epSettings.characterSelect.characterTwoButton.texture, this.choosePlayerTwo, this, epSettings.characterSelect.characterTwoButton.overKey, epSettings.characterSelect.characterTwoButton.outKey, epSettings.characterSelect.characterTwoButton.downKey, epSettings.characterSelect.characterTwoButton.upKey);

		ExtremePeak.voSprite.play(epSettings.characterSelect.voKey);
	},

	choosePlayerOne: function(){
		ExtremePeak.voSprite.stop();
		this.state.start('game', true, false, 0);
	},

	choosePlayerTwo: function(){
		ExtremePeak.voSprite.stop();
		this.state.start('game', true, false, 1);
	}

}