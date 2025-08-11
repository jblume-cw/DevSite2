BHM.instructions = function(game){
};

BHM.instructions.prototype = {
	
	init: function(){
		BHM.mealIndex = 0;
		BHM.foodIndex = 0;
		BHM.history = []; // [day][meal][choice]
		for (var d = 0; d < BHMSettings.mealData.days.length; d++) {
			BHM.history.push([]);
			for (var m = 0; m < BHMSettings.mealData.days[d].meals.length; m++) {
				BHM.history[d].push([]);
			}
		}
		BHM.evaluation = [];

		if(BHM.dayIndex == 0){
			// Store day only if it's the first day. Incremental days are stored during day summary.
			BHM.writeSuspendData(BHM.dayIndex);
		}
		
	},

	preload: function(){
	},

	update: function(){
	},

	create: function(){
		for (var i = 0; i < BHMSettings.instructions.backgroundElements.length; i++) {
			BHM.addImage(BHMSettings.instructions.backgroundElements[i], this);
		}
		BHM.addText(BHMSettings.instructions.title, this);
		BHM.addText(BHMSettings.instructions.instructions, this);
		BHM.addButton(BHMSettings.instructions.beginButton, this.handleBegin, this);

		BHM.soundSprite.play(BHMSettings.instructions.voKey);
	},

	handleBegin: function(){
		BHM.sfxSprite.play(BHMSettings.buttonClickKey);
		BHM.soundSprite.stop(BHMSettings.instructions.voKey);
		BHM.markComplete();
		this.state.start('chooser');
	}

}