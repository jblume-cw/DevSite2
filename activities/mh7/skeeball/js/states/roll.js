SkeeBall.roll = function(game){
	this.questionValue = null;
	this.optionIndex = null;
	this.isCorrect = null;
	this.ball = null;
	this.highRingFore = null;
	this.medRingFore = null;
	this.lowRingFore = null;
	this.missRingFore = null;
};

SkeeBall.roll.prototype = {
	
	init: function(optionIndex, isCorrect, value){
		this.optionIndex = optionIndex;
		this.isCorrect = isCorrect;
		this.questionValue = value;
	},

	preload: function(){
	},

	update: function(){
	},

	create: function(){
		for (var i = 0; i < SkeeBallSettings.roll.backgroundElements.length; i++) {
			SkeeBall.addImage(SkeeBallSettings.roll.backgroundElements[i], this);
		}

		this.missRingFore = SkeeBall.addImage(SkeeBallSettings.roll.ring0, this);
		SkeeBall.addImage(SkeeBallSettings.roll.highRing.back, this);
		this.highRingFore = SkeeBall.addImage(SkeeBallSettings.roll.highRing.fore, this);
		//SkeeBall.addImage(SkeeBallSettings.roll.highRing2.back, this);
		//this.highRing2Fore = SkeeBall.addImage(SkeeBallSettings.roll.highRing2.fore, this);
		SkeeBall.addImage(SkeeBallSettings.roll.lowRing.back, this);
		SkeeBall.addImage(SkeeBallSettings.roll.mediumRing.back, this);
		this.medRingFore = SkeeBall.addImage(SkeeBallSettings.roll.mediumRing.fore, this);
		this.lowRingFore = SkeeBall.addImage(SkeeBallSettings.roll.lowRing.fore, this);

		//this.ball = SkeeBall.addImage(SkeeBallSettings.roll.ball, this);
		this.ball = this.add.sprite(-100, -100, SkeeBallSettings.roll.ballAnimation.texture, SkeeBallSettings.roll.ballAnimation.frames[0]);
		this.ball.animations.add("spin", SkeeBallSettings.roll.ballAnimation.frames, 12, true, false);
		this.ball.anchor = { x: 0.5, y: 0.5 };

		var animationIndex = this.chooseAnimation();
		//var animationIndex = 11;
		this.startRollSfx();
		this.time.events.add(1000, function(){
			this.startRoll(animationIndex);
		}, this);
	},

	chooseAnimation: function(){
		var matches = [];
		for (var i = 0; i < SkeeBallSettings.roll.ballAnimations.length; i++) {
			if(SkeeBallSettings.roll.ballAnimations[i].targetValue == this.questionValue && SkeeBallSettings.roll.ballAnimations[i].success == this.isCorrect){
				matches.push(i);
			}
		}
		return matches[Math.floor(Math.random() * matches.length)];
	},

	startRollSfx: function(){
		SkeeBall.soundSprite.play(SkeeBallSettings.roll.rollSfx);
	},

	startRoll: function(animIndex){
		var animData = SkeeBallSettings.roll.ballAnimations[animIndex];
		this.ball.x = animData.start.x;
		this.ball.y = animData.start.y;
		this.ball.animations.play("spin");
		var xTweens = [];
		var yTweens = [];
		var scaleTweens = [];
		for (var i = 0; i < animData.sequence.length; i++) {
			var xTween = this.add.tween(this.ball).to({ x: animData.sequence[i].x }, animData.sequence[i].duration, animData.sequence[i].xEase, false);
			var yTween = this.add.tween(this.ball).to({ y: animData.sequence[i].y }, animData.sequence[i].duration, animData.sequence[i].yEase, false);
			var scaleTween = this.add.tween(this.ball.scale).to({ x: animData.sequence[i].scale, y: animData.sequence[i].scale }, animData.sequence[i].duration, animData.sequence[i].scaleEase, false);
			xTweens.push(xTween);
			yTweens.push(yTween);
			scaleTweens.push(scaleTween);

			if(animData.sequence[i].peak){
				xTween.onComplete.add(this.moveRingFore, this);
			}
			if(i == animData.sequence.length - 1){
				scaleTween.onComplete.add(this.endRoll, this);
			}
			if(i == 0){
				xTween.onComplete.add(this.stopRollSfx, this);
			}
			if(animData.sequence[i].endSFX){
				xTween.onComplete.add(this.playEndSFX, this, 0, animData.sequence[i].endSFX);
			}
		}
		for (i = xTweens.length - 2; i >= 0; i--) {
			xTweens[i].chain(xTweens[i + 1]);
			yTweens[i].chain(yTweens[i + 1]);
			scaleTweens[i].chain(scaleTweens[i + 1]);
		}
		xTweens[0].start();
		yTweens[0].start();
		scaleTweens[0].start();

		
	},

	stopRollSfx: function(){
		SkeeBall.soundSprite.stop(SkeeBallSettings.roll.rollSfx);
	},

	playEndSFX: function(ball, tween, sfxKey){
		SkeeBall.soundSprite.play(sfxKey);
	},

	moveRingFore: function(){
		if(this.isCorrect){
			switch(this.questionValue){
				case 1000:
					this.world.setChildIndex(this.lowRingFore, this.world.length-1);
					break;
				case 2000:
					this.world.setChildIndex(this.medRingFore, this.world.length-1);
					break;
				case 3000:
					this.world.setChildIndex(this.highRingFore, this.world.length-1);
					break;
			}
		}else{
			this.world.setChildIndex(this.missRingFore, this.world.length-1);
		}
		
	},

	endRoll: function(){
		this.ball.visible = false;
		this.time.events.add(2000, function(){
			this.state.start('remediation', true, false, this.optionIndex, this.isCorrect, this.questionValue);
		}, this);
		
	}
}