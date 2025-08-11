BHM.mealSummary = function(game){
	this.vo = null;
};

BHM.mealSummary.prototype = {
	
	init: function(){
	},

	preload: function(){
	},

	update: function(){
	},

	create: function(){
		for (var i = 0; i < BHMSettings.mealSummary.backgroundElements.length; i++) {
			BHM.addImage(BHMSettings.mealSummary.backgroundElements[i], this);
		}
		BHM.addText(BHMSettings.mealSummary.title, this, BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].id);

		BHM.addImage(BHMSettings.mealSummary.tallyBackground, this);
		BHM.addText(BHMSettings.mealSummary.tallyText, this, BHM.getTally());

		this.showSummary();

		switch(BHM.mealIndex){
			case 0:
				BHM.addButton(BHMSettings.mealSummary.lunchButton, this.goToNextMeal, this);
				break;
			case 1:
				BHM.addButton(BHMSettings.mealSummary.dinnerButton, this.goToNextMeal, this);
				break;
			case 2:
				BHM.addButton(BHMSettings.mealSummary.continueButton, this.goToNextMeal, this);
				break;
		}

		
	},

	showSummary: function(){
		var currY = BHMSettings.mealSummary.circleYPositions[BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices.length - 1];
		var correct = 0;
		var incorrect = 0;
		for (var i = 0; i < BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices.length; i++) {
			var circle = BHM.addImage(BHMSettings.mealSummary.circle, this);
			circle.y = currY;
			currY += BHMSettings.mealSummary.circleYInterval;

			var foodData = {
				x: circle.x + BHMSettings.mealSummary.foodPositionOffset.x,
				y: circle.y + BHMSettings.mealSummary.foodPositionOffset.y
			}
			var foodText = null;
			var mark = null;
			if(BHM.history[BHM.dayIndex][BHM.mealIndex][i]){
				foodData.texture = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[i].unhealthy.image.texture;
				foodData.key = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[i].unhealthy.image.key;
				BHM.addImage(foodData, this);
				foodText = BHM.addText(BHMSettings.mealSummary.foodLabel, this, BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[i].unhealthy.name);
				mark = BHM.addImage(BHMSettings.mealSummary.incorrectMark, this);
				mark.x += circle.x + BHMSettings.mealSummary.incorrectMark.offset.x;
				mark.y += circle.y + BHMSettings.mealSummary.incorrectMark.offset.y;
				incorrect++;
			}else{
				foodData.texture = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[i].healthy.image.texture;
				foodData.key = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[i].healthy.image.key;
				BHM.addImage(foodData, this);
				foodText = BHM.addText(BHMSettings.mealSummary.foodLabel, this, BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[i].healthy.name);
				mark = BHM.addImage(BHMSettings.mealSummary.correctMark, this);
				mark.x += circle.x + BHMSettings.mealSummary.correctMark.offset.x;
				mark.y += circle.y + BHMSettings.mealSummary.correctMark.offset.y;
				correct++;
			}
			foodText.x = circle.x + BHMSettings.mealSummary.labelPositionOffset.x;
			foodText.y = circle.y + BHMSettings.mealSummary.labelPositionOffset.y;

		}
		this.playEvaluationVO(correct, incorrect);
	},

	playEvaluationVO: function(correct, incorrect){
		/*var percentCorrect = correct / (correct + incorrect);
		if(percentCorrect < .75){
			this.vo = BHM.soundSprite.play(BHMSettings.mealSummary.badMealSummaryVO[BHM.mealIndex]);
		}else{
			this.vo = BHM.soundSprite.play(BHMSettings.mealSummary.goodMealSummaryVO[BHM.mealIndex]);
		}*/
		switch(incorrect){
			case 0:
				this.vo = BHM.soundSprite.play(BHMSettings.mealSummary.mealSummaryPerfectVO[BHM.mealIndex]);
				break;
			case 1:
				this.vo = BHM.soundSprite.play(BHMSettings.mealSummary.mealSummaryOneWrongVO[BHM.mealIndex]);
				break;
			default:
				this.vo = BHM.soundSprite.play(BHMSettings.mealSummary.mealSummaryTwoWrongVO[BHM.mealIndex]);
				break;
		}
	},

	goToNextMeal: function(){
		this.vo.stop();
		BHM.sfxSprite.play(BHMSettings.buttonClickKey);
		BHM.mealIndex++;
		if(BHM.mealIndex < BHMSettings.mealData.days[BHM.dayIndex].meals.length){
			BHM.foodIndex = 0;
			this.state.start('chooser');
		}else{
			this.state.start('daySummary');
		}
	}

}