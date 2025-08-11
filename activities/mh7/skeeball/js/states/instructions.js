SkeeBall.instructions = function(game){
	this.vo = null;
};

SkeeBall.instructions.prototype = {
	
	init: function(){
	},

	preload: function(){
	},

	update: function(){
	},

	create: function(){
		for (var i = 0; i < SkeeBallSettings.instructions.backgroundElements.length; i++) {
			SkeeBall.addImage(SkeeBallSettings.instructions.backgroundElements[i], this);
		}

		SkeeBall.addText(SkeeBallSettings.instructions.instructionText, this);

		SkeeBall.addButton(SkeeBallSettings.instructions.beginButton, this.handleBegin, this);

		//SkeeBall.soundSprite.play(SkeeBallSettings.instructions.sfxKey);

		this.time.events.add(600, function(){
			SkeeBall.soundSprite.play(SkeeBallSettings.instructions.voKey);
		}, this);
		

		/*var loader = this.load.audio("instructions", SkeeBallSettings.instructions.vo);
		loader.onLoadComplete.addOnce(this.playVO, this, 0, "instructions");
		loader.start();*/
	},

	/*playVO: function(audioKey){
		this.vo = this.sound.play(audioKey);
	},*/

	handleBegin: function(){
		SkeeBall.soundSprite.stop(SkeeBallSettings.instructions.voKey);
		if(SkeeBallSettings.scormEnabled){
			SCORM_API_adapter.markComplete();
		}
		this.state.start('difficulty');
		/*SkeeBall.score = 24000;
		this.state.start("gameOver");*/
	}

}