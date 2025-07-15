SugarRapids.game = function(game){
	this.hintTarget = null;
	this.orderTargets = [];
	this.hintsMeterText = null;
	this.hintsLeft = null;
	this.drinks = [];
	this.hints = null;
	this.orderLabel = null;
	this.checkOrderButton = null;
	this.hint = null;
	this.hintedDrink = null;
};

SugarRapids.game.prototype = {
	
	init: function(){
		this.orderTargets = [];
		this.hintsLeft = settings.game.hintsGranted;
		this.drinks = [];

		if(settings.scormEnabled){
			SCORM_API_adapter.markComplete();
		}
	},

	preload: function(){
	},

	create: function(){
		for (var i = 0; i < settings.game.backgroundElements.length; i++) {
			this.add.sprite(settings.game.backgroundElements[i].x, settings.game.backgroundElements[i].y, settings.game.backgroundElements[i].texture, settings.game.backgroundElements[i].image);
		}
		this.checkOrderButton = this.add.button(settings.game.checkOrderButton.x, settings.game.checkOrderButton.y, settings.game.checkOrderButton.texture, this.checkOrder, this, settings.game.checkOrderButton.overKey, settings.game.checkOrderButton.outKey, settings.game.checkOrderButton.downKey, settings.game.checkOrderButton.upKey);

		this.setupHints();
		this.setupOrder();
		this.setupDrinks();

		this.time.events.add(666, function(){
			SugarRapids.voSprite.play(settings.game.introVo.key, settings.game.introVo.volume);
		}, this);
	},

	setupHints: function(){
		this.hints = this.add.group();
		this.hintTarget = this.add.sprite(settings.game.hintTarget.x, settings.game.hintTarget.y, settings.game.hintTarget.keys.texture, settings.game.hintTarget.keys.image, this.hints);

		var meterStyle = { 
		 	font: settings.game.hintMeterText.font, 
		 	fill: settings.game.hintMeterText.fill, 
		 	fontSize: settings.game.hintMeterText.size,
		 	fontWeight: settings.game.hintMeterText.fontWeight,
		 	align: settings.game.hintMeterText.align
		};
		this.hintsMeterText = this.add.text(settings.game.hintMeterText.x, 
			                     			settings.game.hintMeterText.y, 
			                                "Hints left: " + this.hintsLeft, 
			                     			meterStyle, this.hints);

		var labelStyle = { 
		 	font: settings.game.hintLabelText.font, 
		 	fill: settings.game.hintLabelText.fill, 
		 	fontSize: settings.game.hintLabelText.size,
		 	fontWeight: settings.game.hintLabelText.fontWeight,
		 	align: settings.game.hintLabelText.align
		};
		var labelText = this.add.text(settings.game.hintLabelText.x, 
			                     	  settings.game.hintLabelText.y, 
			                          "HINTS", 
			                     	  labelStyle, this.hints);
	},

	setupOrder: function(){
		for (var i = 0; i < settings.game.orderTargets.locations.length; i++) {
			settings.game.orderTargets.locations[i]
			var thisTarget = this.add.sprite(settings.game.orderTargets.locations[i].x, settings.game.orderTargets.locations[i].y, settings.game.orderTargets.keys.texture, settings.game.orderTargets.keys.image);
			//thisTarget.data.occupant = null;
			thisTarget.data.index = i;
			thisTarget.data.locked = false;
			this.orderTargets.push(thisTarget);
		}
		this.orderLabel = this.add.sprite(settings.game.orderTargets.labelKeys.x, settings.game.orderTargets.labelKeys.y, settings.game.orderTargets.labelKeys.texture, settings.game.orderTargets.labelKeys.image);
	},

	setupDrinks: function(){
		for (var i = 0; i < settings.game.drinks.length; i++) {
			settings.game.drinks[i]
			var thisDrink = this.add.sprite(settings.game.drinks[i].startPosition.x, settings.game.drinks[i].startPosition.y, settings.game.drinks[i].keys.texture, settings.game.drinks[i].keys.image);
			thisDrink.scale.x = thisDrink.scale.y = settings.game.drinks[i].dragScale;
			thisDrink.inputEnabled = true;
			thisDrink.input.enableDrag(true);
			thisDrink.events.onDragStart.add(this.handleDrag, this);
			thisDrink.events.onDragStop.add(this.handleDrop, this);
			thisDrink.data.index = i;
			thisDrink.data.occupying = null;
			thisDrink.data.sugars = settings.game.drinks[i].sugars;
			this.drinks.push(thisDrink);
		}
	},

	handleDrag: function(drink){
		drink.bringToTop();
	},

	handleDrop: function(drink){
		if(!this.checkHintDrop(drink)){
			this.checkOrderDrop(drink);
		}

		/*console.log("order check");
		for (i = 0; i < this.drinks.length; i++) {
			if(this.drinks[i].data.occupying != null){
				console.log(settings.game.drinks[this.drinks[i].data.index].name + " @ " + this.drinks[i].data.occupying.data.index);
			}
		}*/
	},

	checkHintDrop: function(drink){
		if(drink.overlap(this.hintTarget) && this.hintsLeft > 0){
			drink.x = this.hintTarget.x + (this.hintTarget.width / 2) - (drink.width / 2);
			drink.y = this.hintTarget.y + (this.hintTarget.height / 2) - (drink.height / 2);

			if(this.hint == null){
				this.hint = this.add.group();
				for (var i = 0; i < settings.game.hint.backgroundElements.length; i++) {
					var element = this.add.sprite(settings.game.hint.backgroundElements[i].x, settings.game.hint.backgroundElements[i].y, settings.game.hint.backgroundElements[i].texture, settings.game.hint.backgroundElements[i].image, this.hint);
					element.inputEnabled = true;
				}
				this.add.button(settings.game.hint.closeButton.x, settings.game.hint.closeButton.y, settings.game.hint.closeButton.texture, this.closeHint, this, settings.game.hint.closeButton.overKey, settings.game.hint.closeButton.outKey, settings.game.hint.closeButton.downKey, settings.game.hint.closeButton.upKey, this.hint);

				var servingLabelStyle = { 
				 	font: settings.game.hint.servingLabel.font, 
				 	fill: settings.game.hint.servingLabel.fill, 
				 	fontSize: settings.game.hint.servingLabel.size,
				 	fontWeight: settings.game.hint.servingLabel.fontWeight,
				 	align: settings.game.hint.servingLabel.align
				};
				this.add.text(settings.game.hint.servingLabel.x, 
					                     	  settings.game.hint.servingLabel.y, 
					                          "Serving Size:", 
					                     	  servingLabelStyle, this.hint);
				var servingStyle = { 
				 	font: settings.game.hint.servingAmount.font, 
				 	fill: settings.game.hint.servingAmount.fill, 
				 	fontSize: settings.game.hint.servingAmount.size,
				 	fontWeight: settings.game.hint.servingAmount.fontWeight,
				 	align: settings.game.hint.servingAmount.align
				};
				var servingText = this.add.text(settings.game.hint.servingAmount.x, 
					                     	  settings.game.hint.servingAmount.y, 
					                          "", 
					                     	  servingStyle, this.hint);
				servingText.name = "serving-text";

				var sugarsLabelStyle = { 
				 	font: settings.game.hint.sugarsLabel.font, 
				 	fill: settings.game.hint.sugarsLabel.fill, 
				 	fontSize: settings.game.hint.sugarsLabel.size,
				 	fontWeight: settings.game.hint.sugarsLabel.fontWeight,
				 	align: settings.game.hint.sugarsLabel.align
				};
				this.add.text(settings.game.hint.sugarsLabel.x, 
					                     	  settings.game.hint.sugarsLabel.y, 
					                          "Sugars:", 
					                     	  sugarsLabelStyle, this.hint);
				var sugarsStyle = { 
				 	font: settings.game.hint.sugarsAmount.font, 
				 	fill: settings.game.hint.sugarsAmount.fill, 
				 	fontSize: settings.game.hint.sugarsAmount.size,
				 	fontWeight: settings.game.hint.sugarsAmount.fontWeight,
				 	align: settings.game.hint.sugarsAmount.align
				};
				var sugarsText = this.add.text(settings.game.hint.sugarsAmount.x, 
					                     	  settings.game.hint.sugarsAmount.y, 
					                          "", 
					                     	  sugarsStyle, this.hint);
				sugarsText.name = "sugars-text";

				var nameStyle = { 
				 	font: settings.game.hint.nameText.font, 
				 	fill: settings.game.hint.nameText.fill, 
				 	fontSize: settings.game.hint.nameText.size,
				 	fontWeight: settings.game.hint.nameText.fontWeight,
				 	align: settings.game.hint.nameText.align
				};
				var nameText = this.add.text(settings.game.hint.nameText.x, 
					                     	  settings.game.hint.nameText.y, 
					                          "", 
					                     	  nameStyle, this.hint);
				nameText.name = "name-text";
			}else{
				this.hint.visible = true;
				this.world.bringToTop(this.hint);
			}

			var drinkData = settings.game.drinks[drink.data.index];
			var drinkDisplay = this.add.sprite(settings.game.hint.drinkDisplayCenterPosition.x - (drink.width / 2), settings.game.hint.drinkDisplayCenterPosition.y - (drink.height / 2), drinkData.keys.texture, drinkData.keys.image, this.hint);
			drinkDisplay.scale.x = drinkDisplay.scale.y = drinkData.hintScale;
			drinkDisplay.name = "drink-display";

			this.hint.getByName("serving-text").text = drinkData.servingSize;
			this.hint.getByName("sugars-text").text = drinkData.sugars + "g";
			this.hint.getByName("name-text").text = drinkData.name;

			this.hintedDrink = drink;
			this.hintsLeft--;
			this.hintsMeterText.text = this.hintsLeft + " Hints left";
			SugarRapids.sfxSprite.play(settings.game.hintSfx.key, settings.game.hintSfx.volume);
			return true;
		}else{
			return false;
		}
	},

	closeHint: function(){
		this.hint.visible = false;
		this.moveDrinkHome(this.hintedDrink);
		var drinkDisplay = this.hint.getByName("drink-display");
		drinkDisplay.destroy();
	},

	checkOrderDrop: function(drink){
		var targetHit = false;
		for (var i = 0; i < this.orderTargets.length; i++) {
			if(drink.overlap(this.orderTargets[i]) && !this.orderTargets[i].data.locked){
				targetHit = true;
				var dropTarget = this.orderTargets[i];
				for (var j = 0; j < this.drinks.length; j++) {
					if(this.drinks[j] != drink && this.drinks[j].data.occupying == dropTarget){
						this.moveDrinkHome(this.drinks[j]);
					}
				}
				drink.x = dropTarget.x + (dropTarget.width / 2) - (drink.width / 2);
				drink.y = dropTarget.y + (dropTarget.height / 2) - (drink.height / 2);
				drink.data.occupying = dropTarget;
				break;
			}
		}
		if(!targetHit){
			this.moveDrinkHome(drink);
		}
	},

	moveDrinkHome: function(drink){
		drink.x = settings.game.drinks[drink.data.index].startPosition.x;
		drink.y = settings.game.drinks[drink.data.index].startPosition.y;
		drink.data.occupying = null;
	},

	checkOrder: function(){
		var correctCount = 0;
		var newCorrects = false;
		for (var i = 0; i < this.drinks.length; i++) {
			if(this.drinks[i].data.occupying != null){
				if(settings.game.drinks[this.drinks[i].data.index].correctIndex.indexOf(this.drinks[i].data.occupying.data.index) != -1){
					if(!this.drinks[i].data.occupying.data.locked){
						this.markCorrect(this.drinks[i]);
						newCorrects = true;
					}
					correctCount++;
				}
			}
		}
		if(newCorrects){
			SugarRapids.sfxSprite.play(settings.game.correctSfx.key, settings.game.correctSfx.volume);
		}
		if(correctCount == this.drinks.length){
			this.time.events.add(800, this.handleWin, this);
		}
	},

	markCorrect: function(drink){
		var orderIndex = drink.data.occupying.data.index;
		this.add.sprite(settings.game.checkMarkLocations[orderIndex].x, settings.game.checkMarkLocations[orderIndex].y, settings.game.checkMarkKeys.texture, settings.game.checkMarkKeys.image);
		drink.inputEnabled = false;
		drink.data.occupying.visible = false;
		drink.data.occupying.data.locked = true;
	},

	handleWin: function(){
		for (var i = 0; i < settings.game.win.addGraphics.length; i++) {
			this.add.sprite(settings.game.win.addGraphics[i].x, settings.game.win.addGraphics[i].y, settings.game.win.addGraphics[i].texture, settings.game.win.addGraphics[i].image);
		}
		this.orderLabel.destroy();

		var style = { 
		 	font: settings.game.win.sugarAmountText.font, 
		 	fill: settings.game.win.sugarAmountText.fill, 
		 	fontSize: settings.game.win.sugarAmountText.size,
		 	fontWeight: settings.game.win.sugarAmountText.fontWeight,
		 	align: settings.game.win.sugarAmountText.align
		};

		for (var i = 0; i < this.drinks.length; i++) {
			var position = this.drinks[i].data.occupying.data.index;
			var sugars = this.drinks[i].data.sugars + "g";
			this.add.text(settings.game.win.sugarAmountText.locations[position].x, 
			                     			settings.game.win.sugarAmountText.locations[position].y, 
			                                sugars, 
			                     			style);
		}
		this.checkOrderButton.destroy();
		SugarRapids.sfxSprite.play(settings.game.win.sfx.key, settings.game.win.sfx.volume);
		this.time.events.add(1200, function(){
			SugarRapids.voSprite.play(settings.game.win.vo.key, settings.game.win.vo.volume);
		}, this);
	}

}