BHM.daySummary = function(game){
	this.lastY = null;
	this.snackChooserGroup = null;
	this.snackButton1 = null;
	this.snackButton2 = null;
	this.tallyText = null;
	this.vo = null;
};

BHM.daySummary.prototype = {
	
	init: function(){
	},

	preload: function(){
	},

	update: function(){
	},

	create: function(){
		for (var i = 0; i < BHMSettings.daySummary.backgroundElements.length; i++) {
			BHM.addImage(BHMSettings.daySummary.backgroundElements[i], this);
		}

		BHM.addImage(BHMSettings.daySummary.tallyBackground, this);
		this.tallyText = BHM.addText(BHMSettings.daySummary.tallyText, this, BHM.getTally());

		BHM.addText(BHMSettings.daySummary.foodGroupsTitle, this);

		for (i = 0; i < BHMSettings.daySummary.foodGroups.length; i++) {
			var label = BHM.addText(BHMSettings.daySummary.foodGroupLabels, this, BHMSettings.daySummary.foodGroups[i]);
			label.x += BHMSettings.daySummary.foodGroupLabels.xInterval * i;
		}

		var currY = BHMSettings.daySummary.foodStartY;
		var foodInterval = BHMSettings.daySummary.foodInterval;
		for (m = 0; m < BHMSettings.mealData.days[BHM.dayIndex].meals.length; m++) {
			var meal = BHM.addText(BHMSettings.daySummary.mealLabels, this, BHMSettings.mealData.days[BHM.dayIndex].meals[m].id);
			meal.y = currY;
			var foodGroups = null;
			for (c = 0; c < BHMSettings.mealData.days[BHM.dayIndex].meals[m].choices.length; c++) {
				currY += foodInterval;
				var healthy = BHM.history[BHM.dayIndex][m][c];
				if(healthy){
					var choice = BHM.addText(BHMSettings.daySummary.choiceLabels, this, BHMSettings.mealData.days[BHM.dayIndex].meals[m].choices[c].unhealthy.name);
					var mark = BHM.addImage(BHMSettings.daySummary.incorrectMark, this);
					foodGroups = BHMSettings.mealData.days[BHM.dayIndex].meals[m].choices[c].unhealthy.foodGroups;
				}else{
					var choice = BHM.addText(BHMSettings.daySummary.choiceLabels, this, BHMSettings.mealData.days[BHM.dayIndex].meals[m].choices[c].healthy.name);
					var mark = BHM.addImage(BHMSettings.daySummary.correctMark, this);
					foodGroups = BHMSettings.mealData.days[BHM.dayIndex].meals[m].choices[c].healthy.foodGroups;
				}
				choice.y = currY;
				mark.y = currY;

				this.addGrid(BHMSettings.daySummary.grid.x, currY + BHMSettings.daySummary.grid.yOffset, foodGroups);
			}
			currY += foodInterval;
		}
		this.lastY = currY;

		this.addSnackChooser();
		this.vo = BHM.soundSprite.play(BHMSettings.daySummary.introVO);
	},

	addGrid: function(anchorX, anchorY, foodGroups){
		var gridAnchor = { x: anchorX, y: anchorY };
		var cellWidth = BHMSettings.daySummary.grid.cellWidth;
		var cellHeight = BHMSettings.daySummary.grid.cellHeight;
		var graphics = this.add.graphics(gridAnchor.x, gridAnchor.y);
		graphics.lineStyle(BHMSettings.daySummary.grid.stroke, BHMSettings.daySummary.grid.color, 1);
		for (var i = 0; i < BHMSettings.daySummary.groupCheck.groupMap.length; i++) {
			graphics.drawRect((i * cellWidth), 0, cellWidth, cellHeight);
			if(foodGroups.indexOf(BHMSettings.daySummary.groupCheck.groupMap[i]) != -1){
				var groupMark = BHM.addImage(BHMSettings.daySummary.groupCheck, this);
				groupMark.x = gridAnchor.x + (cellWidth / 2) + (i * cellWidth);
				groupMark.y = gridAnchor.y + (cellHeight / 2);
			}
		}
	},

	addSnackChooser: function(){
		this.snackChooserGroup = this.add.group();
		BHM.addImage(BHMSettings.daySummary.snackChooserBackground, this, this.snackChooserGroup);
		BHM.addText(BHMSettings.daySummary.chooseASnackTitle, this, null, this.snackChooserGroup);
		BHM.addImage(BHMSettings.daySummary.arrow, this, this.snackChooserGroup);
		this.snackButton1 = BHM.addButton(BHMSettings.daySummary.snackButton1, this.handleSnackChoice, this, this.snackChooserGroup);
		this.snackButton2 = BHM.addButton(BHMSettings.daySummary.snackButton2, this.handleSnackChoice, this, this.snackChooserGroup);

		var flip = Math.round(Math.random());
		//console.log("flip = " + flip);
		if(flip){
			var image1 = this.add.image(BHMSettings.daySummary.snackButton1.x + BHMSettings.daySummary.snackButton1.imageOffset.x, BHMSettings.daySummary.snackButton1.y + BHMSettings.daySummary.snackButton1.imageOffset.y, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.incorrect.image.texture, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.incorrect.image.key, this.snackChooserGroup);
			var image2 = this.add.image(BHMSettings.daySummary.snackButton2.x + BHMSettings.daySummary.snackButton2.imageOffset.x, BHMSettings.daySummary.snackButton2.y + BHMSettings.daySummary.snackButton2.imageOffset.y, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.correct.image.texture, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.correct.image.key, this.snackChooserGroup);

			BHM.addText(BHMSettings.daySummary.snack1Name, this, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.incorrect.name, this.snackChooserGroup);
			BHM.addText(BHMSettings.daySummary.snack2Name, this, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.correct.name, this.snackChooserGroup);

			this.snackButton1.data.correct = false;
			this.snackButton2.data.correct = true;
		}else{
			var image1 = this.add.image(BHMSettings.daySummary.snackButton1.x + BHMSettings.daySummary.snackButton1.imageOffset.x, BHMSettings.daySummary.snackButton1.y + BHMSettings.daySummary.snackButton1.imageOffset.y, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.correct.image.texture, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.correct.image.key, this.snackChooserGroup);
			var image2 = this.add.image(BHMSettings.daySummary.snackButton2.x + BHMSettings.daySummary.snackButton2.imageOffset.x, BHMSettings.daySummary.snackButton2.y + BHMSettings.daySummary.snackButton2.imageOffset.y, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.incorrect.image.texture, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.incorrect.image.key, this.snackChooserGroup);

			BHM.addText(BHMSettings.daySummary.snack1Name, this, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.correct.name, this.snackChooserGroup);
			BHM.addText(BHMSettings.daySummary.snack2Name, this, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.incorrect.name, this.snackChooserGroup);

			this.snackButton1.data.correct = true;
			this.snackButton2.data.correct = false;
		}
		image1.anchor = BHMSettings.daySummary.snackButton1.imageAnchor;
		image2.anchor = BHMSettings.daySummary.snackButton1.imageAnchor;
	},

	handleSnackChoice: function(button){
		this.snackButton1.inputEnabled = false;
		this.snackButton2.inputEnabled = false;
		button.setFrames(BHMSettings.daySummary.snackButton1.selectedKey, BHMSettings.daySummary.snackButton1.selectedKey, BHMSettings.daySummary.snackButton1.selectedKey, BHMSettings.daySummary.snackButton1.selectedKey);

		BHM.evaluation.push(button.data.correct);
		this.tallyText.text = BHM.getTally();

		this.addSnackToGrid(button.data.correct);

		BHM.addButton(BHMSettings.daySummary.continueButton, this.handleSnackChoiceContinue, this, this.snackChooserGroup);
	},

	addSnackToGrid: function(isCorrect){
		var currY = this.lastY;
		var snack = BHM.addText(BHMSettings.daySummary.mealLabels, this, "SNACK");
		snack.y = currY;
		currY += BHMSettings.daySummary.foodInterval;
		var foodGroups = null;
		if(isCorrect){
			var choice = BHM.addText(BHMSettings.daySummary.choiceLabels, this, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.correct.name);
			var mark = BHM.addImage(BHMSettings.daySummary.correctMark, this);
			foodGroups = BHMSettings.mealData.days[BHM.dayIndex].snackChoices.correct.foodGroups;
		}else{
			var choice = BHM.addText(BHMSettings.daySummary.choiceLabels, this, BHMSettings.mealData.days[BHM.dayIndex].snackChoices.incorrect.name);
			var mark = BHM.addImage(BHMSettings.daySummary.incorrectMark, this);
			foodGroups = BHMSettings.mealData.days[BHM.dayIndex].snackChoices.incorrect.foodGroups;
		}
		choice.y = currY;
		mark.y = currY;

		this.addGrid(BHMSettings.daySummary.grid.x, currY + BHMSettings.daySummary.grid.yOffset, foodGroups);

		this.vo.stop();
		var voIndex = 0;
		if(isCorrect){
			voIndex = 1;
			BHM.sfxSprite.play(BHMSettings.chooser.correctSFX);
		}
		var voKey = "";
		switch(foodGroups[0]){
			case "Grains":
				voKey = BHMSettings.daySummary.grainsSnackVO[voIndex];
				break;
			case "Vegetables":
				voKey = BHMSettings.daySummary.vegetablesSnackVO[voIndex];
				break;
			case "Fruits":
				voKey = BHMSettings.daySummary.fruitsSnackVO[voIndex];
				break;
			case "Dairy":
				voKey = BHMSettings.daySummary.dairySnackVO[voIndex];
				break;
			case "Protein":
				voKey = BHMSettings.daySummary.proteinSnackVO[voIndex];
				break;
		}
		this.time.events.add(BHMSettings.chooser.correctVODelay, function(){
			this.vo = BHM.soundSprite.play(voKey);
		}, this);
		
	},

	handleSnackChoiceContinue: function(button){
		this.snackChooserGroup.destroy();

		BHM.addButton(BHMSettings.daySummary.playAgainButton, this.handlePlayAgain, this);

		this.vo.stop();
		BHM.sfxSprite.play(BHMSettings.buttonClickKey);
		var correct = 0;
		for (var i = 0; i < BHM.evaluation.length; i++) {
			if(BHM.evaluation[i]){
				correct++;
			}
		}
		var pct = correct / BHM.evaluation.length;
		//console.log(correct + " / " + BHM.evaluation.length + " : " + pct);
		if(pct < .75){
			this.vo = BHM.soundSprite.play(BHMSettings.daySummary.summaryOKVO);
		}else{
			this.vo = BHM.soundSprite.play(BHMSettings.daySummary.summaryGoodVO);
		}
		BHM.storeHighScore(BHM.dayIndex, correct, BHM.evaluation.length);

		this.incrememtDay();
	},

	incrememtDay: function(){
		BHM.dayIndex++;
		if(BHM.dayIndex >= BHMSettings.mealData.days.length){
			BHM.dayIndex = 0;
		}
		BHM.writeSuspendData(BHM.dayIndex);
	},

	handlePlayAgain: function(){
		this.vo.stop();
		BHM.sfxSprite.play(BHMSettings.buttonClickKey);
		
		this.state.start('instructions');
	},

	shutdown: function(){
		this.snackButton1.destroy();
		this.snackButton2.destroy();
		this.tallyText.destroy();
	}
}