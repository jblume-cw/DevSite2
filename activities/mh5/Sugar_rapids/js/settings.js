settings = {

	scormEnabled: sugarRapidsScormEnabled,

	autoScale: true,

	loader: {

		rotator: {
			key: "rotator",
			file: "images/load-rotator.png",
			x: 400,
			y: 250,
			speed: 7
		},

		background: {
			key: "grass-bg",
			file: "images/plain-bg.png",
			x: 0,
			y: 0
		},

		label: {
			loadingText: "Loading",
			clickthroughText: "Tap here to continue.",
			font: "Arial, Helvetica, sans",
			fill: "#ffffff",
			size: 22,
			padding: 10
		}

	},

	textures: [
		{ key: "spritesheet", image: "images/spritesheet.png", data: "images/spritesheet.json" }
	],

	splash: {
		backgroundElements: [
			{ x: 0, y: 0, texture: "spritesheet", image: "splash-bg.png" }
		],
		introVo: { key: "Intro 1", volume: 1 },
		beginButton: {
			x: 308,
			y: 504,
			texture: "spritesheet",
			overKey: "begin-down.png",
			outKey: "begin-up.png",
			downKey: "begin-down.png",
			upKey: "begin-up.png"
		}
	},

	game: {
		backgroundElements: [
			{ x: 0, y: 0, texture: "spritesheet", image: "game-bg.png" },
			{ x: 615, y: 118, texture: "spritesheet", image: "hints-back.png" },
			{ x: 46, y: 377, texture: "spritesheet", image: "order-back.png" }
		],
		introVo: { key: "Intro 2", volume: 1 },
		correctSfx: { key: "service_bell_01", volume: 1 },
		hintSfx: { key: "nice_nav_42", volume: 1 },
		checkOrderButton: {
			x: 263,
			y: 522,
			texture: "spritesheet",
			overKey: "checkorder-down.png",
			outKey: "checkorder-up.png",
			downKey: "checkorder-down.png",
			upKey: "checkorder-up.png"
		},
		hintsGranted: 8,
		hintTarget: {
			x: 660,
			y: 141,
			keys: { texture: "spritesheet", image: "hints-box.png" }
		},
		hintMeterText: {
			font: "Roboto Slab, sans",
			fill: "#352F31",
			size: 13,
			fontWeight: "bold",
			align: "left",
			x: 667,
			y: 126
		},
		hintLabelText: {
			font: "Roboto Slab, sans",
			fill: "#352F31",
			size: 16,
			fontWeight: "bold",
			align: "left",
			x: 681,
			y: 234
		},
		orderTargets: {
			keys: { texture: "spritesheet", image: "order-box.png" },
			locations: [
				{ x: 83, y: 388 },
				{ x: 164, y: 388 },
				{ x: 245, y: 388 },
				{ x: 326, y: 388 },
				{ x: 407, y: 388 },
				{ x: 488, y: 388 },
				{ x: 569, y: 388 },
				{ x: 650, y: 388 }
			],
			labelKeys: { x: 82, y: 478, texture: "spritesheet", image: "least-to-most.png" }
		},
		drinks: [
			{
				keys: { texture: "spritesheet", image: "energy-drink.png" },
				name: "Energy Drink",
				startPosition: { x: 372, y: 297 },
				correctIndex: [ 4 ],
				servingSize: "1 Can (8.4 fl. oz.)",
				sugars: 27,
				hintScale: 1,
				dragScale: 0.6
			},
			{
				keys: { texture: "spritesheet", image: "coffee-drink.png" },
				name: "Coffee Drink",
				startPosition: { x: 423, y: 297 },
				correctIndex: [ 7 ],
				servingSize: "1 Bottle (12 fl. oz.)",
				sugars: 46,
				hintScale: 1,
				dragScale: 0.6
			},
			{
				keys: { texture: "spritesheet", image: "sparkling-water.png" },
				name: "Sparkling Water",
				startPosition: { x: 469, y: 299 },
				correctIndex: [ 0, 1, 2 ],
				servingSize: "1 Can (12 fl. oz.)",
				sugars: 0,
				hintScale: 1,
				dragScale: 0.6
			},
			{
				keys: { texture: "spritesheet", image: "cola.png" },
				name: "Cola",
				startPosition: { x: 515, y: 308 },
				correctIndex: [ 6 ],
				servingSize: "1 Can (12 fl. oz.)",
				sugars: 39,
				hintScale: 1,
				dragScale: 0.6
			},
			{
				keys: { texture: "spritesheet", image: "flavored-water.png" },
				name: "Flavored Water",
				startPosition: { x: 556, y: 295 },
				correctIndex: [ 0, 1, 2 ],
				servingSize: "1 Bottle (16 fl. oz.)",
				sugars: 0,
				hintScale: 1,
				dragScale: 0.6
			},
			{
				keys: { texture: "spritesheet", image: "choco-milk.png" },
				name: "Chocolate Milk",
				startPosition: { x: 597, y: 306 },
				correctIndex: [ 3 ],
				servingSize: "1 Cup (8 fl. oz.)",
				sugars: 22,
				hintScale: 1,
				dragScale: 0.6
			},
			{
				keys: { texture: "spritesheet", image: "sports-drink.png" },
				name: "Sports Drink",
				startPosition: { x: 646, y: 295 },
				correctIndex: [ 5 ],
				servingSize: "1 Bottle (20 fl. oz.)",
				sugars: 34,
				hintScale: 1,
				dragScale: 0.6
			},
			{
				keys: { texture: "spritesheet", image: "water.png" },
				name: "Water",
				startPosition: { x: 691, y: 295 },
				correctIndex: [ 0, 1, 2 ],
				servingSize: "1 Bottle (16 fl. oz.)",
				sugars: 0,
				hintScale: 1,
				dragScale: 0.6
			}
		],
		hint: {
			backgroundElements: [
				{ x: 0, y: 0, texture: "spritesheet", image: "label-overlay.png" },
				{ x: 62, y: 73, texture: "spritesheet", image: "label-display.png" }
			],
			drinkDisplayCenterPosition: { x: 251, y: 228 },
			closeButton: {
				x: 580,
				y: 134,
				texture: "spritesheet",
				overKey: "x-down.png",
				outKey: "x-up.png",
				downKey: "x-down.png",
				upKey: "x-up.png"
			},
			nameText: {
				font: "Roboto Slab, sans",
				fill: "#352F31",
				size: 18,
				fontWeight: "bold",
				align: "left",
				x: 323,
				y: 180
			},
			servingLabel: {
				font: "Roboto Slab, sans",
				fill: "#352F31",
				size: 18,
				fontWeight: "bold",
				align: "left",
				x: 323,
				y: 220
			},
			sugarsLabel: {
				font: "Roboto Slab, sans",
				fill: "#352F31",
				size: 18,
				fontWeight: "bold",
				align: "left",
				x: 323,
				y: 252
			},
			servingAmount: {
				font: "Roboto Slab, sans",
				fill: "#352F31",
				size: 18,
				fontWeight: "normal",
				align: "left",
				x: 437,
				y: 220
			},
			sugarsAmount: {
				font: "Roboto Slab, sans",
				fill: "#352F31",
				size: 18,
				fontWeight: "normal",
				align: "left",
				x: 391,
				y: 252
			}
		},
		checkMarkKeys: { texture: "spritesheet", image: "checkmark.png" },
		checkMarkLocations: [
			{ x: 118, y: 433 },
			{ x: 199, y: 433 },
			{ x: 280, y: 433 },
			{ x: 361, y: 433 },
			{ x: 442, y: 433 },
			{ x: 523, y: 433 },
			{ x: 604, y: 433 },
			{ x: 685, y: 433 }
		],
		win: {
			addGraphics: [
				{ x: 231, y: 25, texture: "spritesheet", image: "group.png" },
				{ x: 499, y: 211, texture: "spritesheet", image: "cooler.png" }
			],
			sugarAmountText: {
				font: "Roboto Slab, sans",
				fill: "#352F31",
				size: 18,
				fontWeight: "bold",
				align: "left",
				locations: [
					{ x: 108, y: 473 },
					{ x: 189, y: 473 },
					{ x: 270, y: 473 },
					{ x: 351, y: 473 },
					{ x: 432, y: 473 },
					{ x: 513, y: 473 },
					{ x: 594, y: 473 },
					{ x: 675, y: 473 }
				]
			},
			vo: { key: "End", volume: 1 },
			sfx: { key: "success01", volume: 1 }
		}
	},

	voiceover: {
		key: "vo",
		urls: ["audio/sugarrapidsvo.ogg", "audio/sugarrapidsvo.m4a"],
		data: {
			spritemap: {
				"End": {
			        "start": 0,
			        "end": 6.274399092970522,
			        "loop": false
			      },
			      "Intro 1": {
			        "start": 8,
			        "end": 19.708049886621318,
			        "loop": false
			      },
			      "Intro 2": {
			        "start": 21,
			        "end": 42.78950113378685,
			        "loop": false
			      }
			}
		}
	},

	sfx: {
		key: "sfx",
		urls: ["audio/sugarrapidssfx.ogg", "audio/sugarrapidssfx.m4a"],
		data: {
			spritemap: {
				"nice_nav_42": {
			        "start": 0,
			        "end": 1.2335600907029478,
			        "loop": false
			      },
			      "service_bell_01": {
			        "start": 3,
			        "end": 6.297233560090703,
			        "loop": false
			      },
			      "success01": {
			        "start": 8,
			        "end": 9.515102040816327,
			        "loop": false
			      }
			}
		}
	}

	/*scormEnabled: rfyhScormEnabled,

	textures: [
		{ key: "general", image: "images/spritesheet-general.png", data: "images/spritesheet-general.json" },
		{ key: "tiles", image: "images/spritesheet-tiles.png", data: "images/spritesheet-tiles.json" },
		{ key: "ian", image: "images/spritesheet-ian.png", data: "images/spritesheet-ian.json" },
		{ key: "carly", image: "images/spritesheet-carly.png", data: "images/spritesheet-carly.json" },
		{ key: "jack", image: "images/spritesheet-jack.png", data: "images/spritesheet-jack.json" },
		{ key: "sofia", image: "images/spritesheet-sofia.png", data: "images/spritesheet-sofia.json" }
	],
		
	tileMap: {
		key: "tileMap",
		file: "images/tiles.json",
		type: Phaser.Tilemap.TILED_JSON,
		tileSet: "spritesheet-tiles",
		tileKey: "tiles"
	},

	loader: {

		rotator: {
			key: "rotator",
			file: "images/load-rotator.png",
			x: 400,
			y: 333,
			speed: 7
		},

		background: {
			key: "grass-bg",
			file: "images/grass-bg.png",
			x: 0,
			y: 0
		},

		label: {
			loadingText: "Loading",
			clickthroughText: "Tap here to continue.",
			font: "Arial, Helvetica, sans",
			fill: "#ffffff",
			size: 22,
			padding: 10
		}

	},

	splash: {
		backgroundKeys: { texture: "general", image: "splash-bg.png" },
		introAudio: { key: "righton", volume: 1 },
		beginButton: {
			x: 288,
			y: 345,
			texture: "general",
			overKey: "begin-down.png",
			outKey: "begin-up.png",
			downKey: "begin-down.png",
			upKey: "begin-up.png"
		}
	},

	instructions: {
		backgroundKeys: { texture: "general", image: "instructions-bg.png" },
		voKey: "Instructions",
		text: {
			font: "Cantarell, Arial, Helvetica",
			fill: "#ffffff",
			size: 18,
			align: "left",
			x: 50,
			y: 125,
			wordWrap: true,
			wordWrapWidth: 700,
			lineSpacing: -3,
			copy: "Welcome to Run for your Health. During this race you will be asked questions about what you’ve learned during this course. The more questions you answer correctly, the faster you will run. As you run, you will see some healthy and unhealthy foods on the track. Catch the healthy foods for a short burst of speed. Jump or tap the screen to jump over the unhealthy foods, or they will slow you down. Good luck and see you at the finish line!"
		},
		unhealthyFoods: {
			keys: { texture: "general", image: "unhealthy-foods.png" },
			x: 465,
			y: 396
		},
		healthyFoods: {
			keys: { texture: "general", image: "healthy-foods.png" },
			x: 45,
			y: 396
		},
		chooseButton: {
			x: 149,
			y: 511,
			texture: "general",
			overKey: "choose-down.png",
			outKey: "choose-up.png",
			downKey: "choose-down.png",
			upKey: "choose-up.png"
		}
	},

	chooseCharacter: {
		backgroundKeys: { texture: "general", image: "choose-character-bg.png" },
		options: [
			{
				x: 20,
				y: 194,
				texture: "general",
				overKey: "carly-down.png",
				outKey: "carly-up.png",
				downKey: "carly-down.png",
				upKey: "carly-up.png"
			},
			{
				x: 210,
				y: 194,
				texture: "general",
				overKey: "jack-down.png",
				outKey: "jack-up.png",
				downKey: "jack-down.png",
				upKey: "jack-up.png"
			},
			{
				x: 400,
				y: 194,
				texture: "general",
				overKey: "sofia-down.png",
				outKey: "sofia-up.png",
				downKey: "sofia-down.png",
				upKey: "sofia-up.png"
			},
			{
				x: 590,
				y: 194,
				texture: "general",
				overKey: "ian-down.png",
				outKey: "ian-up.png",
				downKey: "ian-down.png",
				upKey: "ian-up.png"
			}
		]
	},

	race: {
		backgroundColor: "#ffffff",
		background: {
			keys: { texture: "general", image: "track-bg.png" },
			x: 0,
			y: 0
		},
		runAmbience: { key: "crowd_quiet01-short", volume: .25 },
		finishlineAudio: { key: "applause2", volume: 1 },
		jumpSound: { key: "boing03", volume: 1 },
		negativeSound: { key: "dufter01", volume: 1 },
		positiveSound: { key: "congrats", volume: 1 },
		questionSound: { key: "nice_nav_42", volume: 1 },
		playerStartPosition:{
			x: 100,
			y: 481
		},
		questionPost: {
			gid: 21,
			keys: { texture: "general", image: "question-post.png" }
		},
		finishLine: {
			gid: 13,
			keys: { texture: "general", image: "finish-post.png" }
		},
		positiveBoost: { amount: 10, frameRateAdjust: 3, duration: 2000 },
		negativeBoost: { amount: -10, frameRateAdjust: -3, duration: 2000 },
		runnerStartPositions: [
			{ x: 130, y: 450 },
			{ x: 120, y: 450 },
			{ x: 110, y: 450 },
			{ x: 100, y: 450 }
		],
		opponentSpeeds: [
			[ 188, 193, 198, 203, 208, 213, 218, 223, 228 ],
			[ 196, 201, 206, 211, 216, 221, 226, 231, 236 ],
			[ 184, 189, 194, 199, 204, 209, 214, 219, 224 ]
		],
		trackerIconStartPositions: [
			{ x: 33, y: 17 },
			{ x: 33, y: 43 },
			{ x: 33, y: 69 },
			{ x: 33, y: 95 }
		],
		finishLineX: 18898,
		trackerFinishX: 713,
		countdown: {
			font: "Allerta Stencil",
			fill: "#353535",
			size: 90,
			steps: [
				{ text: "READY", voKey: "Ready" },
				{ text: "SET", voKey: "Set" },
				{ text: "GO", voKey: "Go" }
			],
			x: 400,
			y: 300,
			stepDuration: 1500
		},
		question: {
			background: {
				keys: { texture: "general", image: "question-background.png" },
				x: 0,
				y: 0
			},
			counterText: {
				font: "Allerta Stencil",
				fill: "#ffffff",
				size: 22,
				x: 309,
				y: 24,
				totalQuestions: 8
			},
			randomize: true,
			questionText: {
				font: "Cantarell",
				fill: "#ffffff",
				size: 22,
				lineSpacing: -5,
				wordWrapWidth: 720,
				x: 40,
				y: 70
			},
			optionText: {
				font: "Cantarell",
				fill: "#ffffff",
				size: 20,
				lineSpacing: -4,
				wordWrapWidth: 670,
				buttonOffset: { x: 50, y: 0 }
			},
			optionButtons: [
				{
					x: 40,
					y: 180,
					texture: "general",
					overKey: "a-down.png",
					outKey: "a-up.png",
					downKey: "a-down.png",
					upKey: "a-up.png"
				},
				{
					x: 40,
					y: 240,
					texture: "general",
					overKey: "b-down.png",
					outKey: "b-up.png",
					downKey: "b-down.png",
					upKey: "b-up.png"
				},
				{
					x: 40,
					y: 300,
					texture: "general",
					overKey: "c-down.png",
					outKey: "c-up.png",
					downKey: "c-down.png",
					upKey: "c-up.png"
				},
				{
					x: 40,
					y: 360,
					texture: "general",
					overKey: "d-down.png",
					outKey: "d-up.png",
					downKey: "d-down.png",
					upKey: "d-up.png"
				}
			],
			remediationText: {
				font: "Cantarell",
				fill: "#62A152",
				size: 22,
				lineSpacing: -4,
				wordWrapWidth: 720,
				x: 40,
				y: 430
			},
			continueButton: {
				x: 295,
				y: 525,
				texture: "general",
				overKey: "continue-down.png",
				outKey: "continue-up.png",
				downKey: "continue-down.png",
				upKey: "continue-up.png"
			},
			questionSpeedAdjustments: { correct: 5, incorrect: 0 }
		},
		finishStopDelays: [1250, 1000, 750, 500],

	},

	podium: {
		background: {
			keys: { texture: "general", image: "end-background.png" },
			x: 0,
			y: 0
		},
		finishPositions: [
			{ x: 400, y: 413 },
			{ x: 230, y: 447 },
			{ x: 570, y: 447 }
		],
		finishText: {
			font: "Allerta Stencil",
			fill: "#ffffff",
			size: 36,
			x: 400,
			y: 50
		},
		playAgainButton: {
			x: 286,
			y: 533,
			texture: "general",
			overKey: "playAgain-down.png",
			outKey: "playAgain-up.png",
			downKey: "playAgain-down.png",
			upKey: "playAgain-up.png"
		},
		applauseAudio: { key: "applause3-short", volume: 1 }
	},

	positives: [
		{
			gid: 4,
			keys: { texture: "tiles", image: "apple.png" }
		},
		{
			gid: 5,
			keys: { texture: "tiles", image: "avocado.png" }
		},
		{
			gid: 6,
			keys: { texture: "tiles", image: "broccoli.png" }
		},
		{
			gid: 9,
			keys: { texture: "tiles", image: "carrots.png" }
		},
		{
			gid: 14,
			keys: { texture: "tiles", image: "grapes.png" }
		},
		{
			gid: 18,
			keys: { texture: "tiles", image: "milk.png" }
		},
		{
			gid: 19,
			keys: { texture: "tiles", image: "orange.png" }
		},
		{
			gid: 22,
			keys: { texture: "tiles", image: "salad.png" }
		}
	],

	negatives: [
		{
			gid: 7,
			keys: { texture: "tiles", image: "cake.png" }
		},
		{
			gid: 8,
			keys: { texture: "tiles", image: "candy bar.png" }
		},
		{
			gid: 10,
			keys: { texture: "tiles", image: "cookies.png" }
		},
		{
			gid: 11,
			keys: { texture: "tiles", image: "donut.png" }
		},
		{
			gid: 12,
			keys: { texture: "tiles", image: "energy-drink.png" }
		},
		{
			gid: 15,
			keys: { texture: "tiles", image: "hotdog.png" }
		},
		{
			gid: 16,
			keys: { texture: "tiles", image: "ice-cream-sandwich.png" }
		},
		{
			gid: 17,
			keys: { texture: "tiles", image: "ice-cream.png" }
		}
	],

	runners: [
		{
			key: "carly",
			playerStartSpeed: 200,
			gravity: 1000,
			jumpVelocity: -600,
			bodySize: {
				width: 86,
				height: 125,
				xOffset: 0,
				yOffset: 0
			},
			trackerIconKeys: { texture: "general", image: "dot-blue.png" },
			podiumKeys: { texture: "general", image: "carly-podium.png" },
			animations: [
				{
					key: "start",
					frames: [0],
					frameRate: 12,
					loop: false
				},
				{
					key: "run",
					frames: [ 1, 2, 3, 4, 5, 6, 7 ],
					frameRate: 12,
					loop: true
				},
				{
					key: "jump",
					frames: [ 7, 1 ],
					frameRate: 12,
					loop: false
				},
				{
					key: "stop",
					frames: [ 8 ],
					frameRate: 12,
					loop: false
				}
			]
		},
		{
			key: "jack",
			playerStartSpeed: 200,
			gravity: 1000,
			jumpVelocity: -550,
			bodySize: {
				width: 86,
				height: 125,
				xOffset: 0,
				yOffset: 0
			},
			trackerIconKeys: { texture: "general", image: "dot-white.png" },
			podiumKeys: { texture: "general", image: "jack-podium.png" },
			animations: [
				{
					key: "start",
					frames: [0],
					frameRate: 12,
					loop: false
				},
				{
					key: "run",
					frames: [ 1, 2, 3, 4, 5, 6, 7 ],
					frameRate: 12,
					loop: true
				},
				{
					key: "jump",
					frames: [ 7, 1 ],
					frameRate: 12,
					loop: false
				},
				{
					key: "stop",
					frames: [ 8 ],
					frameRate: 12,
					loop: false
				}
			]
		},
		{
			key: "sofia",
			playerStartSpeed: 200,
			gravity: 1000,
			jumpVelocity: -550,
			bodySize: {
				width: 86,
				height: 125,
				xOffset: 0,
				yOffset: 0
			},
			trackerIconKeys: { texture: "general", image: "dot-orange.png" },
			podiumKeys: { texture: "general", image: "sofia-podium.png" },
			animations: [
				{
					key: "start",
					frames: [0],
					frameRate: 12,
					loop: false
				},
				{
					key: "run",
					frames: [ 1, 2, 3, 4, 5, 6, 7 ],
					frameRate: 12,
					loop: true
				},
				{
					key: "jump",
					frames: [ 7, 1 ],
					frameRate: 12,
					loop: false
				},
				{
					key: "stop",
					frames: [ 8 ],
					frameRate: 12,
					loop: false
				}
			]
		},
		{
			key: "ian",
			playerStartSpeed: 200,
			gravity: 1000,
			jumpVelocity: -550,
			bodySize: {
				width: 86,
				height: 125,
				xOffset: 0,
				yOffset: 0
			},
			trackerIconKeys: { texture: "general", image: "dot-red.png" },
			podiumKeys: { texture: "general", image: "ian-podium.png" },
			animations: [
				{
					key: "start",
					frames: [0],
					frameRate: 12,
					loop: false
				},
				{
					key: "run",
					frames: [ 1, 2, 3, 4, 5, 6, 7 ],
					frameRate: 12,
					loop: true
				},
				{
					key: "jump",
					frames: [ 7, 1 ],
					frameRate: 12,
					loop: false
				},
				{
					key: "stop",
					frames: [ 8 ],
					frameRate: 12,
					loop: false
				}
			]
		}
	],

	question: [
		{
			questionText: "About how many hours of sleep does the average fourth grader need per night?",
			option: [
				"7",
				"8",
				"10"
			],
			remediation: [
				"Not quite. Fourth graders generally need around 10 hours of sleep each night.",
				"Not quite. Fourth graders generally need around 10 hours of sleep each night.",
				"Correct!"
			],
			questionAudio: [ "audio/Question 01.m4a", "audio/Question 01.ogg" ],
			remediationAudio: [
				[ "audio/Question 01 remediation a.m4a", "audio/Question 01 remediation a.ogg" ],
				[ "audio/Question 01 remediation b.m4a", "audio/Question 01 remediation b.ogg" ],
				[ "audio/Correct.m4a", "audio/Correct.ogg" ]
			],
			correctIndex: 2
		},
		{
			questionText: "How much physical activity should you try to get each day?",
			option: [
				"30 minutes",
				"45 minutes",
				"60 minutes"
			],
			remediation: [
				"Not quite. You should try to get 60 minutes of physical activity each day.",
				"Not quite. You should try to get 60 minutes of physical activity each day.",
				"You are correct!"
			],
			questionAudio: [ "audio/Question 02.m4a", "audio/Question 02.ogg" ],
			remediationAudio: [
				[ "audio/Question 02 remediation a.m4a", "audio/Question 02 remediation a.ogg" ],
				[ "audio/Question 02 remediation b.m4a", "audio/Question 02 remediation b.ogg" ],
				[ "audio/You are correct.m4a", "audio/You are correct.ogg" ]
			],
			correctIndex: 2
		},
		{
			questionText: "Which of these is a physical activity?",
			option: [
				"Eating",
				"Swimming",
				"Reading"
			],
			remediation: [
				"Sorry. Swimming is a physical activity, but eating and reading are not.",
				"You got it!",
				"Sorry. Swimming is a physical activity, but eating and reading are not."
			],
			questionAudio: [ "audio/Question 03.m4a", "audio/Question 03.ogg" ],
			remediationAudio: [
				[ "audio/Question 03 remediation a.m4a", "audio/Question 03 remediation a.ogg" ],
				[ "audio/You got it.m4a", "audio/You got it.ogg" ],
				[ "audio/Question 03 remediation c.m4a", "audio/Question 03 remediation c.ogg" ]
			],
			correctIndex: 1
		},
		{
			questionText: "Which of the following is a valid source of information that can help you figure out what types of foods you should be eating every day?",
			option: [
				"MyFoods",
				"MyMeals",
				"MyPlate"
			],
			remediation: [
				"That’s incorrect. MyPlate is the tool that can help you figure out what types of foods you should eat every day.",
				"That’s incorrect. MyPlate is the tool that can help you figure out what types of foods you should eat every day.",
				"You're right!"
			],
			questionAudio: [ "audio/Question 04.m4a", "audio/Question 04.ogg" ],
			remediationAudio: [
				[ "audio/Question 04 remediation a-b.m4a", "audio/Question 04 remediation a-b.ogg" ],
				[ "audio/Question 04 remediation a-b.m4a", "audio/Question 04 remediation a-b.ogg" ],
				[ "audio/You're right.m4a", "audio/You're right.ogg" ]
			],
			correctIndex: 2
		},
		{
			questionText: "What is the maximum amount of time you should spend on inactive, or sedentary, activities, per day, outside of school?",
			option: [
				"2 hours",
				"3 hours",
				"4 hours"
			],
			remediation: [
				"Great job!",
				"Sorry, but three hours would be too much. You should aim for 2 hours or less of inactivity each day.",
				"Sorry, but four hours is too much. You should aim for 2 hours or less of inactivity each day."
			],
			questionAudio: [ "audio/Question 05.m4a", "audio/Question 05.ogg" ],
			remediationAudio: [
				[ "audio/Great job.m4a", "audio/Great job.ogg" ],
				[ "audio/Question 05 remediation b.m4a", "audio/Question 05 remediation b.ogg" ],
				[ "audio/Question 05 remediation c.m4a", "audio/Question 05 remediation c.ogg" ]
			],
			correctIndex: 0
		},
		{
			questionText: "Which of the following would be a good source of nutrition information?",
			option: [
				"TV commercial",
				"Friends",
				"Nutrition Facts Labels"
			],
			remediation: [
				"That’s incorrect. A TV commercial is trying to sell you a specific product, which means it is not a valid source of information.",
				"That’s incorrect. Friends can be helpful at times, but they’re not necessarily a valid source of nutrition information.",
				"That's right!"
			],
			questionAudio: [ "audio/Question 06.m4a", "audio/Question 06.ogg" ],
			remediationAudio: [
				[ "audio/Question 06 remediation a.m4a", "audio/Question 06 remediation a.ogg" ],
				[ "audio/Question 06 remediation b.m4a", "audio/Question 06 remediation b.ogg" ],
				[ "audio/That's right.m4a", "audio/That's right.ogg" ]
			],
			correctIndex: 2
		},
		{
			questionText: "Which of these is a reason why people eat?",
			option: [
				"They’re hungry.",
				"The food smells good.",
				"They’re bored.",
				"All of the above"
			],
			remediation: [
				"Almost. Actually, all of these are reasons why people eat.",
				"Almost. Actually, all of these are reasons why people eat.",
				"Almost. Actually, all of these are reasons why people eat.",
				"Good job!"
			],
			questionAudio: [ "audio/Question 07.m4a", "audio/Question 07.ogg" ],
			remediationAudio: [
				[ "audio/Question 07 remediation a-b-c.m4a", "audio/Question 07 remediation a-b-c.ogg" ],
				[ "audio/Question 07 remediation a-b-c.m4a", "audio/Question 07 remediation a-b-c.ogg" ],
				[ "audio/Question 07 remediation a-b-c.m4a", "audio/Question 07 remediation a-b-c.ogg" ],
				[ "audio/Good job.m4a", "audio/Good job.ogg" ]
			],
			correctIndex: 3
		},
		{
			questionText: "About how long does it take for the nerves in the stomach to send a message to the brain saying you’ve eaten enough?",
			option: [
				"5 minutes",
				"20 minutes",
				"45 minutes"
			],
			remediation: [
				"Nope. It actually takes about 20 minutes for that signal to reach the brain.",
				"Correct!",
				"Nope. It actually takes about 20 minutes for that signal to reach the brain."
			],
			questionAudio: [ "audio/Question 08.m4a", "audio/Question 08.ogg" ],
			remediationAudio: [
				[ "audio/Question 08 remediation a-c.m4a", "audio/Question 08 remediation a-c.ogg" ],
				[ "audio/Correct.m4a", "audio/Correct.ogg" ],
				[ "audio/Question 08 remediation a-c.m4a", "audio/Question 08 remediation a-c.ogg" ]
			],
			correctIndex: 1
		},
		{
			questionText: "What are the three main types of physical activity?",
			option: [
				"Aerobic, strength, and stretching",
				"Weight management, jumping, and swimming",
				"Aerobic, stretching, and sedentary"
			],
			remediation: [
				"You are correct!",
				"That’s incorrect. The three main types of physical activity are aerobic, strength, and stretching.",
				"That’s incorrect. The three main types of physical activity are aerobic, strength, and stretching."
			],
			questionAudio: [ "audio/Question 09.m4a", "audio/Question 09.ogg" ],
			remediationAudio: [
				[ "audio/You are correct.m4a", "audio/You are correct.ogg" ],
				[ "audio/Question 09 remediation b-c.m4a", "audio/Question 09 remediation b-c.ogg" ],
				[ "audio/Question 09 remediation b-c.m4a", "audio/Question 09 remediation b-c.ogg" ]
			],
			correctIndex: 0
		},
		{
			questionText: "Which type of physical activity gets your whole body moving and your heart rate up?",
			option: [
				"Aerobic",
				"Strength",
				"Stretching"
			],
			remediation: [
				"You got it!",
				"Nope. Strength training is good for you, but aerobic activity gets your whole body moving and your heart rate up.",
				"Nope. Stretching is good for you, but aerobic activity gets your whole body moving and your heart rate up."
			],
			questionAudio: [ "audio/Question 10.m4a", "audio/Question 10.ogg" ],
			remediationAudio: [
				[ "audio/You got it.m4a", "audio/You got it.ogg" ],
				[ "audio/Question 10 remediation b.m4a", "audio/Question 10 remediation b.ogg" ],
				[ "audio/Question 10 remediation c.m4a", "audio/Question 10 remediation c.ogg" ]
			],
			correctIndex: 0
		},
		{
			questionText: "Sit-ups and push-ups are examples of what type of physical activity?",
			option: [
				"Aerobic",
				"Strength",
				"Stretching"
			],
			remediation: [
				"Nope. These are examples of strength training.",
				"You're right!",
				"Nope. These are examples of strength training."
			],
			questionAudio: [ "audio/Question 11.m4a", "audio/Question 11.ogg" ],
			remediationAudio: [
				[ "audio/Question 11 remediation a.m4a", "audio/Question 11 remediation a.ogg" ],
				[ "audio/You're right.m4a", "audio/You're right.ogg" ],
				[ "audio/Question 11 remediation a.m4a", "audio/Question 11 remediation a.ogg" ]
			],
			correctIndex: 1
		},
		{
			questionText: "Sedentary activities include:",
			option: [
				"Gardening",
				"Walking",
				"Watching TV"
			],
			remediation: [
				"Not quite. Watching TV is considered a sedentary activity.",
				"Not quite. Watching TV is considered a sedentary activity.",
				"Great job!"
			],
			questionAudio: [ "audio/Question 12.m4a", "audio/Question 12.ogg" ],
			remediationAudio: [
				[ "audio/Question 12 remediation a-b.m4a", "audio/Question 12 remediation a-b.ogg" ],
				[ "audio/Question 12 remediation a-b.m4a", "audio/Question 12 remediation a-b.ogg" ],
				[ "audio/Great job.m4a", "audio/Great job.ogg" ]
			],
			correctIndex: 2
		},
		{
			questionText: "Having more energy, being able to focus better, and sleeping better at night are all benefits of what?",
			option: [
				"Sedentary activity",
				"Physical activity",
				"Playing video games"
			],
			remediation: [
				"That’s incorrect. These are all benefits of physical activity.",
				"That's right!",
				"That’s incorrect. These are all benefits of physical activity."
			],
			questionAudio: [ "audio/Question 13.m4a", "audio/Question 13.ogg" ],
			remediationAudio: [
				[ "audio/Question 13 remediation a-c.m4a", "audio/Question 13 remediation a-c.ogg" ],
				[ "audio/That's right.m4a", "audio/That's right.ogg" ],
				[ "audio/Question 13 remediation a-c.m4a", "audio/Question 13 remediation a-c.ogg" ]
			],
			correctIndex: 1
		},
		{
			questionText: "What does being mindful mean?",
			option: [
				"Following the decision making process",
				"Noticing your thoughts, what your body feels like, what you are hearing, and anything around you at that moment",
				"Explaining your feelings"
			],
			remediation: [
				"Actually, being mindful means noticing your thoughts, what your body feels like, what you are hearing, and anything around you at that moment.",
				"Good job!",
				"Actually, being mindful means noticing your thoughts, what your body feels like, what you are hearing, and anything around you at that moment."
			],
			questionAudio: [ "audio/Question 14.m4a", "audio/Question 14.ogg" ],
			remediationAudio: [
				[ "audio/Question 14 remediation a.m4a", "audio/Question 14 remediation a.ogg" ],
				[ "audio/Good job.m4a", "audio/Good job.ogg" ],
				[ "audio/Question 14 remediation a.m4a", "audio/Question 14 remediation a.ogg" ]
			],
			correctIndex: 1
		},
		{
			questionText: "All electronics should be turned off at least how many minutes before bedtime?",
			option: [
				"10 minutes",
				"15 minutes",
				"30 minutes"
			],
			remediation: [
				"Not quite. Electronics should be turned off at least 30 minutes before bedtime.",
				"Not quite. Electronics should be turned off at least 30 minutes before bedtime.",
				"Correct!"
			],
			questionAudio: [ "audio/Question 15.m4a", "audio/Question 15.ogg" ],
			remediationAudio: [
				[ "audio/Question 15 remediation a.m4a", "audio/Question 15 remediation a.ogg" ],
				[ "audio/Question 15 remediation a.m4a", "audio/Question 15 remediation a.ogg" ],
				[ "audio/Correct.m4a", "audio/Correct.ogg" ]
			],
			correctIndex: 2
		},
		{
			questionText: "What are three healthy behaviors that can be done each day?",
			option: [
				"Running a marathon, sleeping 7 hours a night, and drinking soda for energy",
				"Sleeping 10 hours a night, getting an hour of physical activity, and eating healthy foods",
				"Sleeping 12 hours a night, playing video games, and drinking sports drinks for energy"
			],
			remediation: [
				"Well, you can’t run a marathon every day, you need more than 7 hours sleep each night, and drinking soda is not a good way to give your body energy.",
				"You are correct!",
				"Well, most kids your age need around 10 hours of sleep, playing video games each day probably isn’t very healthy, and sports drinks aren’t needed for energy. Food gives us energy."
			],
			questionAudio: [ "audio/Question 16.m4a", "audio/Question 16.ogg" ],
			remediationAudio: [
				[ "audio/Question 16 remediation a.m4a", "audio/Question 16 remediation a.ogg" ],
				[ "audio/You are correct.m4a", "audio/You are correct.ogg" ],
				[ "audio/Question 16 remediation c.m4a", "audio/Question 16 remediation c.ogg" ]
			],
			correctIndex: 1
		},
		{
			questionText: "What are three sources of valid health information?",
			option: [
				"Friends, websites, and food packages",
				"Nurses, nutrition labels, and choosemyplate.gov",
				"Websites, TV commercials, and older siblings"
			],
			remediation: [
				"Remember, friends don’t know everything, not all websites are valid, and food packages are mainly to sell you the product.",
				"You got it!",
				"Remember, not all websites are valid, TV commercials are trying to sell you the product, and older siblings don’t always know everything."
			],
			questionAudio: [ "audio/Question 17.m4a", "audio/Question 17.ogg" ],
			remediationAudio: [
				[ "audio/Question 17 remediation a.m4a", "audio/Question 17 remediation a.ogg" ],
				[ "audio/You got it.m4a", "audio/You got it.ogg" ],
				[ "audio/Question 17 remediation c.m4a", "audio/Question 17 remediation c.ogg" ]
			],
			correctIndex: 1
		},
		{
			questionText: "Which of the following will help you get a good night’s sleep?",
			option: [
				"Keep the room you sleep in warm.",
				"Only use your bed for sleeping and reading.",
				"Falling asleep with the TV on"
			],
			remediation: [
				"Sorry, but actually the opposite is true. Try to keep your room cool for sleeping.",
				"You're right!",
				"Nope. Watching TV, or using any electronic device, is likely to keep you awake longer."
			],
			questionAudio: [ "audio/Question 18.m4a", "audio/Question 18.ogg" ],
			remediationAudio: [
				[ "audio/Question 18 remediation a.m4a", "audio/Question 18 remediation a.ogg" ],
				[ "audio/You're right.m4a", "audio/You're right.ogg" ],
				[ "audio/Question 18 remediation c.m4a", "audio/Question 18 remediation c.ogg" ]
			],
			correctIndex: 1
		},
		{
			questionText: "Why is it important to eat a variety of foods each day?",
			option: [
				"It helps us get all of the nutrients our bodies need.",
				"It helps us stay up later.",
				"It helps use up the groceries at home."
			],
			remediation: [
				"Great job!",
				"Sorry, but it’s important that we eat a variety of foods each day so that we get all of the nutrients our bodies need.",
				"Sorry, but it’s important to eat a variety of foods each day so that we get all the nutrients our bodies need."
			],
			questionAudio: [ "audio/Question 19.m4a", "audio/Question 19.ogg" ],
			remediationAudio: [
				[ "audio/Great job.m4a", "audio/Great job.ogg" ],
				[ "audio/Question 19 remediation b-c.m4a", "audio/Question 19 remediation b-c.ogg" ],
				[ "audio/Question 19 remediation b-c.m4a", "audio/Question 19 remediation b-c.ogg" ]
			],
			correctIndex: 0
		},
		{
			questionText: "What are two external factors that can influence your nutrition or physical activity habits?",
			option: [
				"Your emotions and your beliefs",
				"Your friends and the environment you’re in",
				"The environment and your personal beliefs"
			],
			remediation: [
				"Not quite. Those are actually internal factors.",
				"That's right!",
				"Not quite. One of those is an internal factor, not an external factor."
			],
			questionAudio: [ "audio/Question 20.m4a", "audio/Question 20.ogg" ],
			remediationAudio: [
				[ "audio/Question 20 remediation a.m4a", "audio/Question 20 remediation a.ogg" ],
				[ "audio/That's right.m4a", "audio/That's right.ogg" ],
				[ "audio/Question 20 remediation c.m4a", "audio/Question 20 remediation c.ogg" ]
			],
			correctIndex: 1
		},
		{
			questionText: "What are two internal factors that can influence your nutrition or physical activity habits?",
			option: [
				"Your family and TV commercials",
				"The media and your friends",
				"Your emotions and your personal values"
			],
			remediation: [
				"Sorry, but those are actually external factors.",
				"Sorry, but those are actually external factors.",
				"Good job!"
			],
			questionAudio: [ "audio/Question 21.m4a", "audio/Question 21.ogg" ],
			remediationAudio: [
				[ "audio/Question 21 remediation a.m4a", "audio/Question 21 remediation a.ogg" ],
				[ "audio/Question 21 remediation a.m4a", "audio/Question 21 remediation a.ogg" ],
				[ "audio/Good job.m4a", "audio/Good job.ogg" ]
			],
			correctIndex: 2
		},
		{
			questionText: "What is a calorie?",
			option: [
				"A nutrient",
				"A unit of money",
				"A unit of energy"
			],
			remediation: [
				"Nope, a calorie is a unit of energy.",
				"Nope, a calorie is a unit of energy.",
				"Correct!"
			],
			questionAudio: [ "audio/Question 22.m4a", "audio/Question 22.ogg" ],
			remediationAudio: [
				[ "audio/Question 22 remediation a.m4a", "audio/Question 22 remediation a.ogg" ],
				[ "audio/Question 22 remediation a.m4a", "audio/Question 22 remediation a.ogg" ],
				[ "audio/Correct.m4a", "audio/Correct.ogg" ]
			],
			correctIndex: 2
		},
		{
			questionText: "Which of the following is an example of a flexibility activity?",
			option: [
				"Yoga",
				"Lifting weights",
				"Soccer"
			],
			remediation: [
				"You are correct!",
				"Lifting weights can be good for you, but it is not a flexibility activity.",
				"Soccer is a great exercise, but it is not a flexibility exercise."
			],
			questionAudio: [ "audio/Question 23.m4a", "audio/Question 23.ogg" ],
			remediationAudio: [
				[ "audio/You are correct.m4a", "audio/You are correct.ogg" ],
				[ "audio/Question 23 remediation b.m4a", "audio/Question 23 remediation b.ogg" ],
				[ "audio/Question 23 remediation c.m4a", "audio/Question 23 remediation c.ogg" ]
			],
			correctIndex: 0
		},
		{
			questionText: "What are sedentary activities?",
			option: [
				"Activities you do outside",
				"Activities that don’t involve moving your body",
				"Activities that stretch your muscles"
			],
			remediation: [
				"Sorry, but sedentary activities are activities where you are sitting still and not moving your body.",
				"You got it!",
				"Sorry, but sedentary activities are activities where you are sitting still and not moving your body."
			],
			questionAudio: [ "audio/Question 24.m4a", "audio/Question 24.ogg" ],
			remediationAudio: [
				[ "audio/Question 24 remediation a.m4a", "audio/Question 24 remediation a.ogg" ],
				[ "audio/You got it.m4a", "audio/You got it.ogg" ],
				[ "audio/Question 24 remediation a.m4a", "audio/Question 24 remediation a.ogg" ]
			],
			correctIndex: 1
		},
		{
			questionText: "Which of the following can be a benefit of physical activity?",
			option: [
				"You’ll feel better about yourself.",
				"You won’t need to sleep as much.",
				"You’ll be able to skip breakfast."
			],
			remediation: [
				"You're right!",
				"That’s incorrect. Physical activity is great for you, but it does not mean you will need less sleep.",
				"That’s incorrect. Physical activity is great for you, but it does not mean you should skip meals."
			],
			questionAudio: [ "audio/Question 25.m4a", "audio/Question 25.ogg" ],
			remediationAudio: [
				[ "audio/You're right.m4a", "audio/You're right.ogg" ],
				[ "audio/Question 25 remediation b.m4a", "audio/Question 25 remediation b.ogg" ],
				[ "audio/Question 25 remediation c.m4a", "audio/Question 25 remediation c.ogg" ]
			],
			correctIndex: 0
		},
		{
			questionText: "Which of the following is a short-term risk of not getting enough physical activity?",
			option: [
				"Less injuries",
				"More flexibility",
				"Less energy"
			],
			remediation: [
				"That’s incorrect. You are actually more likely to get injured doing your regular everyday activities.",
				"That’s incorrect. If you don’t get enough physical activity, you will become less flexible.",
				"Great job!"
			],
			questionAudio: [ "audio/Question 26.m4a", "audio/Question 26.ogg" ],
			remediationAudio: [
				[ "audio/Question 26 remediation a.m4a", "audio/Question 26 remediation a.ogg" ],
				[ "audio/Question 26 remediation b.m4a", "audio/Question 26 remediation b.ogg" ],
				[ "audio/Great job.m4a", "audio/Great job.ogg" ]
			],
			correctIndex: 2
		},
		{
			questionText: "Which of the following is a physical activity you could do in cold weather?",
			option: [
				"Shoveling",
				"Sledding",
				"Indoor dance party",
				"All of the above"
			],
			remediation: [
				"Not quite. All of these are physical activities you could do in cold weather.",
				"Not quite. All of these are physical activities you could do in cold weather.",
				"Not quite. All of these are physical activities you could do in cold weather.",
				"That's right!"
			],
			questionAudio: [ "audio/Question 27.m4a", "audio/Question 27.ogg" ],
			remediationAudio: [
				[ "audio/Question 27 remediation a.m4a", "audio/Question 27 remediation a.ogg" ],
				[ "audio/Question 27 remediation a.m4a", "audio/Question 27 remediation a.ogg" ],
				[ "audio/Question 27 remediation a.m4a", "audio/Question 27 remediation a.ogg" ],
				[ "audio/That's right.m4a", "audio/That's right.ogg" ]
			],
			correctIndex: 3
		},
		{
			questionText: "Which of the following is a SMART goal?",
			option: [
				"I want to run a marathon next year.",
				"I will eat five servings of fruits and vegetables each day this week.",
				"I will get more sleep."
			],
			remediation: [
				"Not quite. This goal might not be very attainable for someone your age. Plus, next year is not very specific.",
				"Good job!",
				"Not quite. This goal is not very specific, and it doesn’t state when you would like to reach the goal."
			],
			questionAudio: [ "audio/Question 28.m4a", "audio/Question 28.ogg" ],
			remediationAudio: [
				[ "audio/Question 28 remediation a.m4a", "audio/Question 28 remediation a.ogg" ],
				[ "audio/Good job.m4a", "audio/Good job.ogg" ],
				[ "audio/Question 28 remediation c.m4a", "audio/Question 28 remediation c.ogg" ]
			],
			correctIndex: 1
		}
	],

	voiceover: {
		key: "vo",
		urls: ["audio/gameaudio.ogg", "audio/gameaudio.m4a"],
		data: {
			spritemap: {
			"Go": {
		        "start": 0,
		        "end": 0.5581859410430839,
		        "loop": false
		      },
		      "Instructions": {
		        "start": 2,
		        "end": 29.034013605442176,
		        "loop": false
		      },
		      "Ready": {
		        "start": 31,
		        "end": 31.6,
		        "loop": false
		      },
		      "Set": {
		        "start": 33,
		        "end": 33.610294784580496,
		        "loop": false
		      }
			}
		}
	},

	sfx: {
		key: "sfx",
		urls: ["audio/gamesfx.ogg", "audio/gamesfx.m4a"],
		data: {
			spritemap: {
				"applause2": {
			        "start": 0,
			        "end": 9.334421768707482,
			        "loop": false
			      },
			      "applause3-short": {
			        "start": 11,
			        "end": 31.00312925170068,
			        "loop": false
			      },
			      "boing03": {
			        "start": 33,
			        "end": 33.73142857142857,
			        "loop": false
			      },
			      "congrats": {
			        "start": 35,
			        "end": 35.47963718820861,
			        "loop": false
			      },
			      "crowd_quiet01-short": {
			        "start": 37,
			        "end": 50.53793650793651,
			        "loop": true
			      },
			      "dufter01": {
			        "start": 52,
			        "end": 52.37587301587302,
			        "loop": false
			      },
			      "nice_nav_42": {
			        "start": 54,
			        "end": 55.233560090702944,
			        "loop": false
			      },
			      "righton": {
			        "start": 57,
			        "end": 59.539478458049885,
			        "loop": false
			      }
			  }
		}
	}*/

	
	
}