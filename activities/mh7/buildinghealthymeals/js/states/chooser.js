BHM.chooser = function(game){
	this.rotator = null;
	this.choiceHeading1 = null;
	this.choiceHeading2 = null;
	this.labelButton1 = null;
	this.labelButton2 = null;
	this.healthyIndex = null;
	this.vo = null;
};

BHM.chooser.prototype = {
	
	init: function(){
		if(BHM.mealIndex == 0 && BHM.foodIndex == 0){ // on first interaction of day preload the spritesheet
			this.rotator = this.add.sprite(BHMSettings.chooser.loadRotator.x, BHMSettings.chooser.loadRotator.y, BHMSettings.chooser.loadRotator.key);
			this.rotator.anchor = { x: 0.5, y: 0.5 };
			//console.log("preload day " + BHM.dayIndex);
		}
	},

	preload: function(){
		if(BHM.mealIndex == 0 && BHM.foodIndex == 0){
			this.load.atlas(BHMSettings.mealData.days[BHM.dayIndex].texture.key, BHMSettings.mealData.days[BHM.dayIndex].texture.image, BHMSettings.mealData.days[BHM.dayIndex].texture.data, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		}
	},

	loadUpdate: function(){
		if(this.rotator != null){
			this.rotator.angle += BHMSettings.loader.rotator.speed;
		}
	},

	update: function(){
	},

	create: function(){
		this.removeRotator();
		for (var i = 0; i < BHMSettings.chooser.backgroundElements.length; i++) {
			BHM.addImage(BHMSettings.chooser.backgroundElements[i], this);
		}

		BHM.addText(BHMSettings.chooser.title, this, BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].id + " | FOOD #" + (BHM.foodIndex + 1));
		//title.text = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].id + " | FOOD #" + (BHM.foodIndex + 1);

		this.choiceHeading1 = BHM.addText(BHMSettings.chooser.choiceHeading1, this);
		this.choiceHeading2 = BHM.addText(BHMSettings.chooser.choiceHeading2, this);

		this.labelButton1 = BHM.addButton(BHMSettings.chooser.labelButton1, this.handleLabelChoice, this);
		this.labelButton2 = BHM.addButton(BHMSettings.chooser.labelButton2, this.handleLabelChoice, this);

		this.addLabels();
		if(BHM.foodIndex == 0){
			this.playMealIntroAudio();
		}
	},

	removeRotator: function(){
		if(this.rotator != null){
			this.rotator.destroy();
			this.rotator = null;
		}
	},

	handleLabelChoice: function(button){
		this.labelButton1.inputEnabled = false;
		this.labelButton2.inputEnabled = false;
		button.setFrames(BHMSettings.chooser.labelButton1.selectedKey, BHMSettings.chooser.labelButton1.selectedKey, BHMSettings.chooser.labelButton1.selectedKey, BHMSettings.chooser.labelButton1.selectedKey);

		var correct = false;
		if(button == this.labelButton1 && this.healthyIndex == 0){
			correct = true;
		}else{
			if(button == this.labelButton2 && this.healthyIndex == 1){
				correct = true;
			}
		}

		BHM.evaluation.push(correct);
		BHM.history[BHM.dayIndex][BHM.mealIndex].push(button.data.foodChoiceIndex);

		this.revealFoods();
		//console.log(BHM.evaluation);
		//console.log(BHM.history);
		
		this.stopVO();
		if(correct){
			BHM.sfxSprite.play(BHMSettings.chooser.correctSFX);
			this.time.events.add(BHMSettings.chooser.correctVODelay, function(){
				this.vo = BHM.soundSprite.play(BHMSettings.chooser.correctChoiceVO);
			}, this);
			
		}else{
			this.vo = BHM.soundSprite.play(BHMSettings.chooser.incorrectChoiceVO);
			
		}
	},

	addLabels: function(){
		var flip = Math.round(Math.random());
		this.healthyIndex = flip;

		var label1Data = {
			x: BHMSettings.chooser.label1Position.x,
			y: BHMSettings.chooser.label1Position.y
		}
		var label2Data = {
			x: BHMSettings.chooser.label2Position.x,
			y: BHMSettings.chooser.label2Position.y
		}

		if(flip){
			label1Data.texture = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.label.texture;
			label1Data.key = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.label.key;
			label2Data.texture = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.label.texture;
			label2Data.key = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.label.key;
			this.labelButton1.data.foodChoiceIndex = 1;
			this.labelButton2.data.foodChoiceIndex = 0;
		}else{
			label1Data.texture = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.label.texture;
			label1Data.key = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.label.key;
			label2Data.texture = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.label.texture;
			label2Data.key = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.label.key;
			this.labelButton1.data.foodChoiceIndex = 0;
			this.labelButton2.data.foodChoiceIndex = 1;
		}

		BHM.addImage(label1Data, this);
		BHM.addImage(label2Data, this);
	},

	revealFoods: function(){
		this.choiceHeading1.destroy();
		this.choiceHeading2.destroy();

		BHM.addImage(BHMSettings.chooser.foodCircle1, this);
		BHM.addImage(BHMSettings.chooser.foodCircle2, this);

		var food1Data = {
			x: BHMSettings.chooser.food1Position.x,
			y: BHMSettings.chooser.food1Position.y
		}
		var food2Data = {
			x: BHMSettings.chooser.food2Position.x,
			y: BHMSettings.chooser.food2Position.y
		}
		var food1Name = BHM.addText(BHMSettings.chooser.food1Name, this);
		var food2Name = BHM.addText(BHMSettings.chooser.food2Name, this);
		if(this.healthyIndex){
			food1Data.texture = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.image.texture;
			food1Data.key = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.image.key;
			food1Data.scale = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.image.scale;
			food2Data.texture = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.image.texture;
			food2Data.key = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.image.key;
			food2Data.scale = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.image.scale;

			food1Name.text = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.name;
			food2Name.text = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.name;
		}else{
			food1Data.texture = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.image.texture;
			food1Data.key = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.image.key;
			food1Data.scale = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.image.scale;
			food2Data.texture = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.image.texture;
			food2Data.key = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.image.key;
			food2Data.scale = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.image.scale;

			food1Name.text = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].healthy.name;
			food2Name.text = BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices[BHM.foodIndex].unhealthy.name;
		}

		BHM.addImage(food1Data, this);
		BHM.addImage(food2Data, this);

		BHM.addImage(BHMSettings.chooser.tallyBackground, this);
		BHM.addText(BHMSettings.chooser.tallyText, this, BHM.getTally());

		BHM.addButton(BHMSettings.chooser.nextButton, this.handleNext, this);
	},

	playMealIntroAudio: function(){
		this.vo = BHM.soundSprite.play(BHMSettings.chooser.mealIntroVO[BHM.mealIndex]);
	},

	stopVO: function(){
		if(this.vo != null){
			this.vo.stop();
		}
	},

	handleNext: function(){
		this.stopVO();
		BHM.sfxSprite.play(BHMSettings.buttonClickKey);
		BHM.foodIndex++;
		if(BHM.foodIndex < BHMSettings.mealData.days[BHM.dayIndex].meals[BHM.mealIndex].choices.length){
			this.state.start('chooser');
		}else{
			// meal complete
			this.state.start('mealSummary');
		}
	},

	shutdown: function(){
		this.labelButton1.destroy();
		this.labelButton2.destroy();
	}

}