SkeeBallSettings = {

	scormEnabled: SkeeBallScormEnabled,

	autoScale: true,

	backgroundColor: "#262626",

	questionLimit: 8,

	loader: {

		rotator: {
			key: "rotator",
			file: "images/load-rotator.png",
			x: 400,
			y: 470,
			speed: 7
		},

		backgroundElements: [
			{ x: 210, y: 200, key: "logo", file: "images/mission_health_logo.png" }
		],

		label: {
			loadingText: "Loading",
			clickthroughText: "Tap here to continue.",
			font: "Arial, Helvetica, sans",
			fill: "#F2CA1D",
			size: 22,
			x: 400,
			y: 410
		}

	},

	textures: [
		{ key: "main", image: "images/main.png", data: "images/main.json" }
	],

	instructions: {
		backgroundElements: [
			{ x: 0, y: 0, texture: "main", key: "instructions-bg.png" }
		],

		instructionText: {
			font: "Lato, Helvetica, sans",
			fill: "#262626",
			size: 24,
			weight: 400,
			align: "center",
			lineSpacing: -5,
			x: 400,
			y: 310,
			text: "In this game you'll be asked questions about what you've learned in this course and earn points for correct answers. You get to choose the point total for each question. The higher the point total, the more difficult the question. Good luck!",
			anchor: { x: 0.5, y: 0 },
			wordWrapWidth: 460
		},

		beginButton: {
			x: 327,
			y: 515,
			texture: "main",
			upKey: "begin-up.png",
			overKey: "begin-down.png",
			downKey: "begin-down.png",
			outKey: "begin-up.png",
			anchor: { x: 0, y: 0 }
		},

		voKey: "Instructions",
		sfxKey: "pinball_start02"
	},

	commonItems: {

		questionTitle: {
			font: "Righteous, Helvetica, sans",
			fill: "#F2CA1D",
			size: 28,
			weight: 400,
			align: "center",
			lineSpacing: 0,
			x: 400,
			y: 12,
			text: "",
			anchor: { x: 0.5, y: 0 }
		},

		scoreLabel: {
			font: "Righteous, Helvetica, sans",
			fill: "#F2CA1D",
			size: 23,
			weight: 400,
			align: "center",
			lineSpacing: 0,
			x: 675,
			y: 19,
			text: "SCORE",
			anchor: { x: 0.5, y: 0 }
		},

		scoreText: {
			font: "DS-Digital, Helvetica, sans",
			fill: "#CE3431",
			size: 48,
			weight: 400,
			align: "right",
			lineSpacing: 0,
			x: 739,
			y: 48,
			text: "",
			anchor: { x: 1, y: 0 }
		}

	},

	difficulty: {
		backgroundElements: [
			{ x: 0, y: 0, texture: "main", key: "choice-bg.png" },
			{ x: 0, y: 0, texture: "main", key: "question-header.png" }
		],

		voKey: "Choose",

		directionText: {
			font: "Lato, Helvetica, sans",
			fill: "#262626",
			size: 23,
			weight: 400,
			align: "center",
			lineSpacing: -5,
			x: 400,
			y: 64,
			text: "Choose the point value for this question.",
			anchor: { x: 0.5, y: 0 },
			wordWrapWidth: 230
		},

		scoreButtons: [
			{
				x: 257,
				y: 183,
				texture: "main",
				upKey: "3k-up.png",
				overKey: "3k-down.png",
				downKey: "3k-down.png",
				outKey: "3k-up.png",
				anchor: { x: 0, y: 0 },
				hitArea: {
					type: "polygon",
					data: {
						points: [
							{ x: 0, y: 0 },
							{ x: 0, y: 80 },
							{ x: 73, y: 80 },
							{ x: 73, y: 0 },
							{ x: 210, y: 0 },
							{ x: 210, y: 80 },
							{ x: 283, y: 80 },
							{ x: 283, y: 0 },
						]
					}
				},
				value: 3000
			},
			{
				x: 276,
				y: 247,
				texture: "main",
				upKey: "1k-up.png",
				overKey: "1k-down.png",
				downKey: "1k-down.png",
				outKey: "1k-up.png",
				anchor: { x: 0, y: 0 },
				hitArea: {
					type: "ellipse",
					data: {
						x: 0,
						y: 0,
						width: 246,
						height: 220 
					}
				},
				value: 1000
			},
			{
				x: 328,
				y: 263,
				texture: "main",
				upKey: "2k-up.png",
				overKey: "2k-down.png",
				downKey: "2k-down.png",
				outKey: "2k-up.png",
				anchor: { x: 0, y: 0 },
				hitArea: {
					type: "ellipse",
					data: {
						x: 0,
						y: 0,
						width: 142,
						height: 141 
					}
				},
				value: 2000
			}
		]

	},

	question: {
		backgroundElements: [
			{ x: 0, y: 0, texture: "main", key: "question-bg.png" },
			{ x: 0, y: 0, texture: "main", key: "question-header.png" }
		],

		directionText: {
			font: "Lato, Helvetica, sans",
			fill: "#262626",
			size: 26,
			weight: 400,
			align: "center",
			lineSpacing: 0,
			x: 400,
			y: 74,
			text: "",
			anchor: { x: 0.5, y: 0 },
			wordWrapWidth: 230,
			valueTextTags: [ "For ", " points" ]
		},

		questionText: {
			font: "Lato, Helvetica, sans",
			fill: "#F2CA1D",
			size: 25,
			weight: 700,
			align: "left",
			lineSpacing: -7,
			x: 100,
			y: 160,
			text: "",
			anchor: { x: 0, y: 0 },
			wordWrapWidth: 650
		},

		optionText: {
			font: "Lato, Helvetica, sans",
			fill: "#ffffff",
			size: 23,
			weight: 400,
			align: "left",
			lineSpacing: -5,
			x: 150,
			y: -1000,
			text: "",
			anchor: { x: 0, y: 0 },
			wordWrapWidth: 600,
			padding: 10
		},

		optionTextOver: {
			font: "Lato, Helvetica, sans",
			fill: "#B7E24B",
			size: 23,
			weight: 400,
			align: "left",
			wordWrapWidth: 600
		},

		optionButtons: [
			{
				x: 100,
				y: -100,
				texture: "main",
				upKey: "a-up.png",
				overKey: "a-down.png",
				downKey: "a-down.png",
				outKey: "a-up.png",
				anchor: { x: 0, y: 0 },
				yOffset: -5
			},
			{
				x: 100,
				y: -100,
				texture: "main",
				upKey: "b-up.png",
				overKey: "b-down.png",
				downKey: "b-down.png",
				outKey: "b-up.png",
				anchor: { x: 0, y: 0 },
				yOffset: -5
			},
			{
				x: 100,
				y: -100,
				texture: "main",
				upKey: "c-up.png",
				overKey: "c-down.png",
				downKey: "c-down.png",
				outKey: "c-up.png",
				anchor: { x: 0, y: 0 },
				yOffset: -5
			},
			{
				x: 100,
				y: -100,
				texture: "main",
				upKey: "d-up.png",
				overKey: "d-down.png",
				downKey: "d-down.png",
				outKey: "d-up.png",
				anchor: { x: 0, y: 0 },
				yOffset: -5
			}
		],

		preVoKeys: [ "For1000", "For2000", "For3000" ],

		audioPauseGap: 500
	},

	roll: {
		backgroundElements: [
			{ x: 0, y: 0, texture: "main", key: "roll-bg.png" }
		],

		rollSfx: "rolling_ball_loop04",

		ring0: {
			x: 253,
			y: 19,
			texture: "main",
			key: "0-fore.png"
		},

		highRing: {
			back: {
				x: 288,
				y: 21,
				texture: "main",
				key: "3k-back.png"
			},
			fore: {
				x: 287,
				y: 39,
				texture: "main",
				key: "3k-fore.png"
			}
		},

		mediumRing: {
			back: {
				x: 341,
				y: 77,
				texture: "main",
				key: "2k-back.png"
			},
			fore: {
				x: 340,
				y: 115,
				texture: "main",
				key: "2k-fore.png"
			}
		},

		lowRing: {
			back: {
				x: 298,
				y: 66,
				texture: "main",
				key: "1k-back.png"
			},
			fore: {
				x: 297,
				y: 133,
				texture: "main",
				key: "1k-fore.png"
			}
		},

		ball: {
			x: 545,
			y: 655,
			texture: "main",
			key: "ball.png",
			anchor: { x: 0.5, y: 0.5 }
		},

		ballAnimation: {
			texture: "main",
			frames: ["ball-spin0001.png", "ball-spin0002.png", "ball-spin0003.png", "ball-spin0004.png", "ball-spin0005.png", "ball-spin0006.png", "ball-spin0007.png", "ball-spin0008.png", "ball-spin0009.png", "ball-spin0010.png", "ball-spin0011.png", "ball-spin0012.png"]
		},

		ballAnimations: [
			{
				targetValue: 1000,
				success: false,
				start: { x: 521, y: 655 },
				sequence: [
					{
						x: 445,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 402,
						y: -22,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 365,
						y: 191,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 396,
						y: 268,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 500,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 1000,
				success: false,
				start: { x: 450, y: 655 },
				sequence: [
					{
						x: 397,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 358,
						y: -22,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 323,
						y: 122,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 368,
						y: 245,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 500,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 408,
						y: 270,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 400,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 1000,
				success: true,
				start: { x: 650, y: 655 },
				sequence: [
					{
						x: 516,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 420,
						y: -22,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 397,
						y: 216,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 1000,
				success: true,
				start: { x: 620, y: 655 },
				sequence: [
					{
						x: 516,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 394,
						y: -22,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 311,
						y: 139,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 403,
						y: 219,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 500,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 2000,
				success: false,
				start: { x: 600, y: 655 },
				sequence: [
					{
						x: 494,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 444,
						y: -22,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 424,
						y: 118,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 396,
						y: 267,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 500,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 2000,
				success: false,
				start: { x: 566, y: 655 },
				sequence: [
					{
						x: 464,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 408,
						y: -22,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 375,
						y: 149,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 427,
						y: 253,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 500,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 396,
						y: 265,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 350,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 2000,
				success: true,
				start: { x: 465, y: 655 },
				sequence: [
					{
						x: 430,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 410,
						y: -22,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 396,
						y: 168,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 2000,
				success: true,
				start: { x: 671, y: 655 },
				sequence: [
					{
						x: 521,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 451,
						y: -22,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 410,
						y: 117,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true,
						endSFX: "pool_bumper_04"
					},
					{
						x: 396,
						y: 168,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 450,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 3000,
				success: false,
				start: { x: 495, y: 655 },
				sequence: [
					{
						x: 425,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 356,
						y: -50,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 340,
						y: 38,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 396,
						y: 264,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 3000,
				success: false,
				start: { x: 316, y: 655 },
				sequence: [
					{
						x: 389,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 443,
						y: -50,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 467,
						y: 35,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 400,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 497,
						y: 35,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 100,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 437,
						y: 251,
						scale: .25,
						xEase: Phaser.Easing.Sinusoidal.Out,
						yEase: Phaser.Easing.Sinusoidal.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_bumper_04"
					},
					{
						x: 396,
						y: 264,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 250,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 3000,
				success: true,
				start: { x: 650, y: 655 },
				sequence: [
					{
						x: 466,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 345,
						y: -50,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 312,
						y: 66,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			},
			{
				targetValue: 3000,
				success: true,
				start: { x: 375, y: 655 },
				sequence: [
					{
						x: 412,
						y: 365,
						scale: .35,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Linear.None,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 750,
						peak: false,
						endSFX: "ball-jump"
					},
					{
						x: 460,
						y: -50,
						scale: .3,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Cubic.Out,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: true
					},
					{
						x: 480,
						y: 64,
						scale: .25,
						xEase: Phaser.Easing.Linear.None,
						yEase: Phaser.Easing.Quadratic.In,
						scaleEase: Phaser.Easing.Linear.None,
						duration: 600,
						peak: false,
						endSFX: "pool_pocket_05"
					}
				]
			}
		]
	},

	remediation: {
		box: {
			x: 0,
			y: 395,
			texture: "main",
			key: "remediation-bg.png"
		},

		scoreText: {
			font: "Kanit, Helvetica, sans",
			fill: "#CE3431",
			size: 80,
			weight: 700,
			align: "left",
			lineSpacing: 0,
			x: 31,
			y: 407,
			text: "",
			anchor: { x: 0, y: 0 }
		},

		remediationTextCorrect: {
			font: "Lato, Helvetica, sans",
			fill: "#262626",
			size: 25,
			weight: 700,
			align: "left",
			lineSpacing: 0,
			x: 288,
			y: 425,
			text: "",
			anchor: { x: 0, y: 0 },
			wordWrapWidth: 462
		},

		remediationTextIncorrect: {
			font: "Lato, Helvetica, sans",
			fill: "#262626",
			size: 25,
			weight: 700,
			align: "left",
			lineSpacing: 0,
			x: 75,
			y: 425,
			text: "",
			anchor: { x: 0, y: 0 },
			wordWrapWidth: 675
		},

		continueButton: {
			x: 288,
			y: 524,
			texture: "main",
			upKey: "continue-up.png",
			overKey: "continue-down.png",
			downKey: "continue-down.png",
			outKey: "continue-up.png",
			anchor: { x: 0, y: 0 }
		},

		scoreTallySFX: { key: "score-tick", volume: 0.2 }

	},

	gameOver: {
		backgroundElements: [
			{ x: 0, y: 0, texture: "main", key: "gameover-bg.png" }
		],

		scoreTallySFX: "gamemachine19-short",
		scoreTallyEchoSFX: "echo",

		headingText: {
			font: "Righteous, Helvetica, sans",
			fill: "#262626",
			size: 38,
			weight: 400,
			align: "center",
			lineSpacing: 0,
			x: 400,
			y: 91,
			text: "YOUR FINAL SCORE IS",
			anchor: { x: 0.5, y: 0 }
		},

		scoreText: {
			font: "Kanit, Helvetica, sans",
			fill: "#F2CA1D",
			size: 90,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 400,
			y: 192,
			text: "",
			anchor: { x: 0.5, y: 0 }
		},

		directionText: {
			font: "Lato, Helvetica, sans",
			fill: "#262626",
			size: 31,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 400,
			y: 360,
			text: "",
			anchor: { x: 0.5, y: 0 }
		},

		playAgainButton: {
			x: 271,
			y: 453,
			texture: "main",
			upKey: "playagain-up.png",
			overKey: "playagain-down.png",
			downKey: "playagain-down.png",
			outKey: "playagain-up.png",
			anchor: { x: 0, y: 0 }
		}
	},

	audio: {
		key: "audio",
		urls: [ "audio/skeeball.ogg", "audio/skeeball.m4a" ],
		data: {
			spritemap: {
				"ball-jump": {
			      "start": 0,
			      "end": 0.37281179138321996,
			      "loop": false
			    },
			    "Choose": {
			      "start": 1,
			      "end": 2.903514739229025,
			      "loop": false
			    },
			    "echo": {
			      "start": 3,
			      "end": 4.1834013605442175,
			      "loop": false
			    },
			    "For1000": {
			      "start": 5,
			      "end": 6.467460317460318,
			      "loop": false
			    },
			    "For2000": {
			      "start": 7,
			      "end": 8.517777777777777,
			      "loop": false
			    },
			    "For3000": {
			      "start": 9,
			      "end": 10.41716553287982,
			      "loop": false
			    },
			    "gamemachine03-short": {
			      "start": 11,
			      "end": 11.362131519274376,
			      "loop": false
			    },
			    "gamemachine19-short": {
			      "start": 12,
			      "end": 12.575578231292518,
			      "loop": false
			    },
			    "hole-score": {
			      "start": 13,
			      "end": 14.095759637188209,
			      "loop": false
			    },
			    "Instructions": {
			      "start": 15,
			      "end": 28.248979591836736,
			      "loop": false
			    },
			    "pinball_start02": {
			      "start": 29,
			      "end": 29.47392290249433,
			      "loop": false
			    },
			    "pool_bumper_04": {
			      "start": 30,
			      "end": 30.37950113378685,
			      "loop": false
			    },
			    "pool_pocket_05": {
			      "start": 31,
			      "end": 31.487709750566893,
			      "loop": false
			    },
			    "rolling_ball_loop04": {
			      "start": 32,
			      "end": 36.632380952380956,
			      "loop": false
			    },
			    "score-tick": {
			      "start": 37,
			      "end": 38.68,
			      "loop": false
			    }
			}
		}
	},

	questions: [
		{
			question: "It's OK to skip breakfast as long as you eat lunch and dinner.",
			options: ["True", "False"],
			remediation: ["Nope. Skipping meals can make you tired and cranky.", "That's right. Skipping meals can make you tired and cranky."],
			questionVO: ["audio/Question0-1000.m4a", "audio/Question0-1000.ogg"],
			remediationVO: [["audio/Question0-1000-Remediation-a.m4a", "audio/Question0-1000-Remediation-a.ogg"], ["audio/Question0-1000-Remediation-b.m4a", "audio/Question0-1000-Remediation-b.ogg"]],
			correctIndex: 1,
			value: 1000
		},
		{
			question: "How much physical activity should you get each day?",
			options: ["None", "30 minutes", "1 hour"],
			remediation: ["No way! It's recommended that you get 1 hour of physical activity each day.", "Sorry, but that's not enough. It's recommended that you get 1 hour of physical activity each day.", "Correct! One hour of physical activity is best."],
			questionVO: ["audio/Question1-1000.m4a", "audio/Question1-1000.ogg"],
			remediationVO: [["audio/Question1-1000-Remediation-a.m4a", "audio/Question1-1000-Remediation-a.ogg"], ["audio/Question1-1000-Remediation-b.m4a", "audio/Question1-1000-Remediation-b.ogg"], ["audio/Question1-1000-Remediation-c.m4a", "audio/Question1-1000-Remediation-c.ogg"]],
			correctIndex: 2,
			value: 1000
		},
		{
			question: "Which of the following is a valid source of health information?",
			options: ["Nutrition Facts labels", "TV commercials", "Friends"],
			remediation: ["You're right. You can get a lot of valid information from Nutrition Facts labels.", "Sorry, but the purpose of TV commercials is to sell products, not give you valid information.", "Sorry. Friends are great, but they don't always know everything."],
			questionVO: ["audio/Question2-1000.m4a", "audio/Question2-1000.ogg"],
			remediationVO: [["audio/Question2-1000-Remediation-a.m4a", "audio/Question2-1000-Remediation-a.ogg"], ["audio/Question2-1000-Remediation-b.m4a", "audio/Question2-1000-Remediation-b.ogg"], ["audio/Question2-1000-Remediation-c.m4a", "audio/Question2-1000-Remediation-c.ogg"]],
			correctIndex: 0,
			value: 1000
		},
		{
			question: "Which of the following is a light intensity physical activity?",
			options: ["Shoveling snow", "Stretching", "Playing soccer"],
			remediation: ["Not quite. Shoveling snow usually requires a moderate amount of effort.", "Correct! Stretching is a light intensity physical activity.", "That's incorrect. Soccer is usually a vigorous intensity activity."],
			questionVO: ["audio/Question3-1000.m4a", "audio/Question3-1000.ogg"],
			remediationVO: [["audio/Question3-1000-Remediation-a.m4a", "audio/Question3-1000-Remediation-a.ogg"], ["audio/Question3-1000-Remediation-b.m4a", "audio/Question3-1000-Remediation-b.ogg"], ["audio/Question3-1000-Remediation-c.m4a", "audio/Question3-1000-Remediation-c.ogg"]],
			correctIndex: 1,
			value: 1000
		},
		{
			question: "Which of the following provides the most valid nutrition information?",
			options: ["Front of food packages", "Nutrition Facts labels", "TV commercials"],
			remediation: ["That's incorrect. Companies can say just about anything on the front of their packages.", "That's right. Nutrition Facts labels can provide lots of valid information.", "That's incorrect. TV commercials are made to sell products, not to provide valid information."],
			questionVO: ["audio/Question4-1000.m4a", "audio/Question4-1000.ogg"],
			remediationVO: [["audio/Question4-1000-Remediation-a.m4a", "audio/Question4-1000-Remediation-a.ogg"], ["audio/Question4-1000-Remediation-b.m4a", "audio/Question4-1000-Remediation-b.ogg"], ["audio/Question4-1000-Remediation-c.m4a", "audio/Question4-1000-Remediation-c.ogg"]],
			correctIndex: 1,
			value: 1000
		},
		{
			question: "Which type of exercise is best for the heart and lungs?",
			options: ["Aerobic exercise", "Strength training", "Flexibility training"],
			remediation: ["You're right! Aerobic exercise is best for your heart and lungs.", "Not quite. Aerobic exercise is best for the heart and lungs, while strength training is great for the other muscles in your body.", "Not quite. Aerobic exercise is best for the heart and lungs."],
			questionVO: ["audio/Question5-1000.m4a", "audio/Question5-1000.ogg"],
			remediationVO: [["audio/Question5-1000-Remediation-a.m4a", "audio/Question5-1000-Remediation-a.ogg"], ["audio/Question5-1000-Remediation-b.m4a", "audio/Question5-1000-Remediation-b.ogg"], ["audio/Question5-1000-Remediation-c.m4a", "audio/Question5-1000-Remediation-c.ogg"]],
			correctIndex: 0,
			value: 1000
		},
		{
			question: "Which of these is an example of aerobic exercise?",
			options: ["Weight lifting", "Yoga", "Swimming"],
			remediation: ["Sorry, but weight lifting is considered strength training.", "Not quite. Yoga is considered flexibility training.", "That's right! Swimming is a great aerobic exercise."],
			questionVO: ["audio/Question6-1000.m4a", "audio/Question6-1000.ogg"],
			remediationVO: [["audio/Question6-1000-Remediation-a.m4a", "audio/Question6-1000-Remediation-a.ogg"], ["audio/Question6-1000-Remediation-b.m4a", "audio/Question6-1000-Remediation-b.ogg"], ["audio/Question6-1000-Remediation-c.m4a", "audio/Question6-1000-Remediation-c.ogg"]],
			correctIndex: 2,
			value: 1000
		},
		{
			question: "Which of these is a benefit of getting regular physical activity?",
			options: ["Reduces your risk for certain diseases", "Helps you maintain a healthy weight", "Helps you sleep and learn better", "All of the above"],
			remediation: ["Not quite. All of these are benefits of getting regular physical activity.", "Not quite. All of these are benefits of getting regular physical activity.", "Not quite. All of these are benefits of getting regular physical activity.", "That's correct! These are all benefits of getting regular physical activity."],
			questionVO: ["audio/Question7-1000.m4a", "audio/Question7-1000.ogg"],
			remediationVO: [["audio/Question7-1000-Remediation-a.m4a", "audio/Question7-1000-Remediation-a.ogg"], ["audio/Question7-1000-Remediation-b.m4a", "audio/Question7-1000-Remediation-b.ogg"], ["audio/Question7-1000-Remediation-c.m4a", "audio/Question7-1000-Remediation-c.ogg"], ["audio/Question7-1000-Remediation-d.m4a", "audio/Question7-1000-Remediation-d.ogg"]],
			correctIndex: 3,
			value: 1000
		},
		{
			question: "Down time helps your brain recharge.",
			options: ["True", "False"],
			remediation: ["You're right! Down time does help your brain recharge.", "Sorry, but down time definitely helps your brain recharge."],
			questionVO: ["audio/Question8-1000.m4a", "audio/Question8-1000.ogg"],
			remediationVO: [
				["audio/Question8-1000-Remediation-a.m4a", "audio/Question8-1000-Remediation-a.ogg"], 
				["audio/Question8-1000-Remediation-b.m4a", "audio/Question8-1000-Remediation-b.ogg"]
			],
			correctIndex: 0,
			value: 1000
		},
		{
			question: "What is the most amount of time per day you should spend watching TV, playing video games or using your phone, tablet or computer, outside of school?",
			options: ["2 hours", "4 hours", "There is no limit."],
			remediation: ["You're right! This will give you more time to do other, more active things each day.", "Nope. We should limit screen time to less than two hours per day, outside of school.", "Nope. We should limit screen time to less than two hours per day, outside of school."],
			questionVO: ["audio/Question9-1000.m4a", "audio/Question9-1000.ogg"],
			remediationVO: [
				["audio/Question9-1000-Remediation-a.m4a", "audio/Question9-1000-Remediation-a.ogg"], 
				["audio/Question9-1000-Remediation-b.m4a", "audio/Question9-1000-Remediation-b.ogg"], 
				["audio/Question9-1000-Remediation-c.m4a", "audio/Question9-1000-Remediation-c.ogg"]
			],
			correctIndex: 0,
			value: 1000
		},
		{
			question: "How many sugary, or sweetened, drinks should we drink each day?",
			options: ["0 drinks", "1 drink", "2 drinks"],
			remediation: ["That's correct. Zero sweetened drinks per day is best.", "Not quite. Zero sweetened drinks per day is best.", "Not quite. Zero sweetened drinks per day is best."],
			questionVO: ["audio/Question10-2000.m4a", "audio/Question10-2000.ogg"],
			remediationVO: [
				["audio/Question10-2000-Remediation-a.m4a", "audio/Question10-2000-Remediation-a.ogg"], 
				["audio/Question10-2000-Remediation-b.m4a", "audio/Question10-2000-Remediation-b.ogg"], 
				["audio/Question10-2000-Remediation-c.m4a", "audio/Question10-2000-Remediation-c.ogg"]
			],
			correctIndex: 0,
			value: 2000
		},
		{
			question: "Which of these is a potential outcome of not getting regular physical activity?",
			options: ["Weight loss", "Decreased risk of developing certain diseases", "Poor sleep"],
			remediation: ["That's incorrect. The opposite can occur if you're not getting regular physical activity.", "That's incorrect. The opposite can occur if you're not getting regular physical activity.", "That's right. Poor sleep is one of the many outcomes of not getting regular physical activity."],
			questionVO: ["audio/Question11-2000.m4a", "audio/Question11-2000.ogg"],
			remediationVO: [
				["audio/Question11-2000-Remediation-a.m4a", "audio/Question11-2000-Remediation-a.ogg"], 
				["audio/Question11-2000-Remediation-b.m4a", "audio/Question11-2000-Remediation-b.ogg"], 
				["audio/Question11-2000-Remediation-c.m4a", "audio/Question11-2000-Remediation-c.ogg"]
			],
			correctIndex: 2,
			value: 2000
		},
		{
			question: "What is body image?",
			options: ["How others see you", "How you see yourself"],
			remediation: ["That's incorrect. Body image is how you see yourself.", "That's right! Body image is how you see yourself."],
			questionVO: ["audio/Question12-2000.m4a", "audio/Question12-2000.ogg"],
			remediationVO: [
				["audio/Question12-2000-Remediation-a.m4a", "audio/Question12-2000-Remediation-a.ogg"], 
				["audio/Question12-2000-Remediation-b.m4a", "audio/Question12-2000-Remediation-b.ogg"]
			],
			correctIndex: 1,
			value: 2000
		},
		{
			question: "Which of the following can affect a person's body image?",
			options: ["Puberty", "Media", "Friends", "All of the above"],
			remediation: ["Not quite. All of these things can affect a person's body image.", "Not quite. All of these things can affect a person's body image.", "Not quite. All of these things can affect a person's body image.", "You're right! All of these things can affect a person's body image."],
			questionVO: ["audio/Question13-2000.m4a", "audio/Question13-2000.ogg"],
			remediationVO: [["audio/Question13-2000-Remediation-a.m4a", "audio/Question13-2000-Remediation-a.ogg"], 
							["audio/Question13-2000-Remediation-b.m4a", "audio/Question13-2000-Remediation-b.ogg"], 
							["audio/Question13-2000-Remediation-c.m4a", "audio/Question13-2000-Remediation-c.ogg"], 
							["audio/Question13-2000-Remediation-d.m4a", "audio/Question13-2000-Remediation-d.ogg"]],
			correctIndex: 3,
			value: 2000
		},
		{
			question: "Which of these is an example of flexibility training?",
			options: ["Gymnastics", "Weight lifting", "Biking"],
			remediation: ["Correct! Gymnastics is an example of flexibility training.", "Sorry, but weight lifting is considered strength training.", "Sorry, but biking is considered an aerobic exercise."],
			questionVO: ["audio/Question14-2000.m4a", "audio/Question14-2000.ogg"],
			remediationVO: [["audio/Question14-2000-Remediation-a.m4a", "audio/Question14-2000-Remediation-a.ogg"], 
							["audio/Question14-2000-Remediation-b.m4a", "audio/Question14-2000-Remediation-b.ogg"], 
							["audio/Question14-2000-Remediation-c.m4a", "audio/Question14-2000-Remediation-c.ogg"]],
			correctIndex: 0,
			value: 2000
		},
		{
			question: "Teens your age need about how many hours of sleep each night?",
			options: ["8 hours", "9 hours", "10 hours"],
			remediation: ["Not quite. Teens your age need about 10 hours of sleep each night.", "Not quite. Teens your age need about 10 hours of sleep each night.", "That's right! 10 hours of sleep is best for someone your age."],
			questionVO: ["audio/Question15-2000.m4a", "audio/Question15-2000.ogg"],
			remediationVO: [
				["audio/Question15-2000-Remediation-a.m4a", "audio/Question15-2000-Remediation-a.ogg"], 
				["audio/Question15-2000-Remediation-b.m4a", "audio/Question15-2000-Remediation-b.ogg"], 
				["audio/Question15-2000-Remediation-c.m4a", "audio/Question15-2000-Remediation-c.ogg"]
			],
			correctIndex: 2,
			value: 2000
		},
		{
			question: "Less melatonin makes it:",
			options: ["Easier to fall asleep", "Harder to fall asleep"],
			remediation: ["Nope. Less melatonin makes it harder to fall asleep, not easier.", "Correct! Less melatonin makes it harder to fall asleep."],
			questionVO: ["audio/Question16-2000.m4a", "audio/Question16-2000.ogg"],
			remediationVO: [
				["audio/Question16-2000-Remediation-a.m4a", "audio/Question16-2000-Remediation-a.ogg"], 
				["audio/Question16-2000-Remediation-b.m4a", "audio/Question16-2000-Remediation-b.ogg"]
			],
			correctIndex: 1,
			value: 2000
		},
		{
			question: "For the best sleep, electronics should be kept across the room from your bed.",
			options: ["True", "False"],
			remediation: ["Nope. For the best sleep, electronics should be kept in a different room.", "That's right. For the best sleep, electronics should be kept in a different room."],
			questionVO: ["audio/Question17-2000.m4a", "audio/Question17-2000.ogg"],
			remediationVO: [
				["audio/Question17-2000-Remediation-a.m4a", "audio/Question17-2000-Remediation-a.ogg"], 
				["audio/Question17-2000-Remediation-b.m4a", "audio/Question17-2000-Remediation-b.ogg"]
			],
			correctIndex: 1,
			value: 2000
		},
		{
			question: "\"I will get more sleep next week\" is a SMART goal.",
			options: ["True", "False"],
			remediation: ["Sorry, but this isn't a very SMART goal. It's not specific.", "You got it! This goal isn't very specific so it's not a SMART goal."],
			questionVO: ["audio/Question18-2000.m4a", "audio/Question18-2000.ogg"],
			remediationVO: [
				["audio/Question18-2000-Remediation-a.m4a", "audio/Question18-2000-Remediation-a.ogg"], 
				["audio/Question18-2000-Remediation-b.m4a", "audio/Question18-2000-Remediation-b.ogg"]
			],
			correctIndex: 1,
			value: 2000
		},
		{
			question: "Why is \"I will get more physical activity every day this month\" not a SMART goal?",
			options: ["It's not specific.", "It's not attainable.", "It's not realistic."],
			remediation: ["That's right! More physical activity isn't very specific.", "Sorry, but the reason it's not a SMART goal is that saying you'll get more physical activity isn't very specific.", "Sorry, but the reason it's not a SMART goal is that saying you'll get more physical activity isn't very specific."],
			questionVO: ["audio/Question19-2000.m4a", "audio/Question19-2000.ogg"],
			remediationVO: [
				["audio/Question19-2000-Remediation-a.m4a", "audio/Question19-2000-Remediation-a.ogg"], 
				["audio/Question19-2000-Remediation-b.m4a", "audio/Question19-2000-Remediation-b.ogg"], 
				["audio/Question19-2000-Remediation-c.m4a", "audio/Question19-2000-Remediation-c.ogg"]
			],
			correctIndex: 0,
			value: 2000
		},
		{
			question: "Which of the following is a moderate intensity physical activity?",
			options: ["Playing catch", "Running", "Brisk walking"],
			remediation: ["That's incorrect. Playing catch is considered a light intensity activity.", "Not quite. Running is usually a vigorous activity.", "Correct! Brisk walking is a moderate intensity physical activity."],
			questionVO: ["audio/Question20-3000.m4a", "audio/Question20-3000.ogg"],
			remediationVO: [["audio/Question20-3000-Remediation-a.m4a", "audio/Question20-3000-Remediation-a.ogg"], 
							["audio/Question20-3000-Remediation-b.m4a", "audio/Question20-3000-Remediation-b.ogg"], 
							["audio/Question20-3000-Remediation-c.m4a", "audio/Question20-3000-Remediation-c.ogg"]],
			correctIndex: 2,
			value: 3000
		},
		{
			question: "Which of the following is a vigorous intensity physical activity?",
			options: ["Walking", "Jumping rope", "Hiking"],
			remediation: ["Not quite. Brisk walking would be a moderate physical activity.", "That's right. Jumping rope is a vigorous intensity activity.", "Not quite. Hiking is usually considered a moderate physical activity."],
			questionVO: ["audio/Question21-3000.m4a", "audio/Question21-3000.ogg"],
			remediationVO: [["audio/Question21-3000-Remediation-a.m4a", "audio/Question21-3000-Remediation-a.ogg"], 
							["audio/Question21-3000-Remediation-b.m4a", "audio/Question21-3000-Remediation-b.ogg"], 
							["audio/Question21-3000-Remediation-c.m4a", "audio/Question21-3000-Remediation-c.ogg"]],
			correctIndex: 1,
			value: 3000
		},
		{
			question: "Which of the following will help you get better sleep?",
			options: ["Sleep in a few extra hours on the weekends.", "Keep your phone next to your bed.", "Turn off electronics at least 30 minutes before bed.", "Keep your room warm."],
			remediation: ["Nope. It's best to keep a regular schedule and go to bed and wake up around the same time every day, including on weekends.", "Nope. Keeping your phone anywhere in your bedroom can keep you awake.", "Yes! This gives your brain time to relax and prepare for sleep.", "That's incorrect. Keep your room cool for the best sleep."],
			questionVO: ["audio/Question22-3000.m4a", "audio/Question22-3000.ogg"],
			remediationVO: [["audio/Question22-3000-Remediation-a.m4a", "audio/Question22-3000-Remediation-a.ogg"], 
							["audio/Question22-3000-Remediation-b.m4a", "audio/Question22-3000-Remediation-b.ogg"], 
							["audio/Question22-3000-Remediation-c.m4a", "audio/Question22-3000-Remediation-c.ogg"], 
							["audio/Question22-3000-Remediation-d.m4a", "audio/Question22-3000-Remediation-d.ogg"]],
			correctIndex: 2,
			value: 3000
		},
		{
			question: "What is the United States Department of Agriculture's website where you can find valid nutrition information?",
			options: ["usagriculture.com", "choosemyfoods.org", "choosemyplate.gov", "healthyusa.gov"],
			remediation: ["Not quite. The USDA's website is choosemyplate.gov.", "Not quite. The USDA's website is choosemyplate.gov.", "That's correct. You can also find information on physical activity there.", "Not quite. The USDA's website is choosemyplate.gov."],
			questionVO: ["audio/Question23-3000.m4a", "audio/Question23-3000.ogg"],
			remediationVO: [["audio/Question23-3000-Remediation-a.m4a", "audio/Question23-3000-Remediation-a.ogg"], 
							["audio/Question23-3000-Remediation-b.m4a", "audio/Question23-3000-Remediation-b.ogg"], 
							["audio/Question23-3000-Remediation-c.m4a", "audio/Question23-3000-Remediation-c.ogg"], 
							["audio/Question23-3000-Remediation-d.m4a", "audio/Question23-3000-Remediation-d.ogg"]],
			correctIndex: 2,
			value: 3000
		},
		{
			question: "Which of the following helps keep the digestive system healthy?",
			options: ["Trans fat", "Sugar", "Fiber", "Saturated fat"],
			remediation: ["Nope. Fiber is what helps keep the digestive system healthy.", "Nope. Fiber is what helps keep the digestive system healthy.", "That's correct! Fiber keeps food moving through the digestive system.", "Nope. Fiber is what helps keep the digestive system healthy."],
			questionVO: ["audio/Question24-3000.m4a", "audio/Question24-3000.ogg"],
			remediationVO: [["audio/Question24-3000-Remediation-a.m4a", "audio/Question24-3000-Remediation-a.ogg"], 
							["audio/Question24-3000-Remediation-b.m4a", "audio/Question24-3000-Remediation-b.ogg"], 
							["audio/Question24-3000-Remediation-c.m4a", "audio/Question24-3000-Remediation-c.ogg"], 
							["audio/Question24-3000-Remediation-d.m4a", "audio/Question24-3000-Remediation-d.ogg"]],
			correctIndex: 2,
			value: 3000
		},
		{
			question: "Aim for each of your meals to include:",
			options: ["1 fruit or vegetable, 1 refined grain and 1 protein", "1 fruit or vegetable, 1 whole grain, and 1 dairy or protein", "1 fruit or vegetable, 1 dairy and 1 protein"],
			remediation: ["Not quite. You should aim for 1 fruit or vegetable, 1 whole grain, and 1 dairy or protein in each meal.", "You're right! This will ensure a balanced meal.", "Not quite. You should aim for 1 fruit or vegetable, 1 whole grain, and 1 dairy or protein in each meal."],
			questionVO: ["audio/Question25-3000.m4a", "audio/Question25-3000.ogg"],
			remediationVO: [["audio/Question25-3000-Remediation-a.m4a", "audio/Question25-3000-Remediation-a.ogg"], 
							["audio/Question25-3000-Remediation-b.m4a", "audio/Question25-3000-Remediation-b.ogg"], 
							["audio/Question25-3000-Remediation-c.m4a", "audio/Question25-3000-Remediation-c.ogg"]],
			correctIndex: 1,
			value: 3000
		},
		{
			question: "Which of the following is true about the blue light emitted by screens?",
			options: ["It helps you fall asleep.", "It increases the body's production of melatonin.", "It keeps your brain alert.", "All of the above."],
			remediation: ["Nope. It does the opposite.", "Nope it does the opposite.", "That's correct! Blue light keeps your brain alert and makes it harder to fall asleep.", "Nope. Blue light keeps your brain alert, but it doesn't help you fall asleep or increase the body's production of melatonin."],
			questionVO: ["audio/Question26-3000.m4a", "audio/Question26-3000.ogg"],
			remediationVO: [["audio/Question26-3000-Remediation-a.m4a", "audio/Question26-3000-Remediation-a.ogg"], 
							["audio/Question26-3000-Remediation-b.m4a", "audio/Question26-3000-Remediation-b.ogg"], 
							["audio/Question26-3000-Remediation-c.m4a", "audio/Question26-3000-Remediation-c.ogg"], 
							["audio/Question26-3000-Remediation-d.m4a", "audio/Question26-3000-Remediation-d.ogg"]],
			correctIndex: 2,
			value: 3000
		},
		{
			question: "What is melatonin?",
			options: ["The hormone that controls puberty.", "The hormone that controls the sleep/wake cycle.", "The hormone that responds to stress."],
			remediation: ["That's incorrect. Melatonin is the hormone that controls the sleep/wake cycle.", "That's correct! Melatonin is the hormone that regulates your sleep/wake cycle.", "That's incorrect. Melatonin is the hormone that controls the sleep/wake cycle."],
			questionVO: ["audio/Question27-3000.m4a", "audio/Question27-3000.ogg"],
			remediationVO: [["audio/Question27-3000-Remediation-a.m4a", "audio/Question27-3000-Remediation-a.ogg"], 
							["audio/Question27-3000-Remediation-b.m4a", "audio/Question27-3000-Remediation-b.ogg"], 
							["audio/Question27-3000-Remediation-c.m4a", "audio/Question27-3000-Remediation-c.ogg"]],
			correctIndex: 1,
			value: 3000
		},
		{
			question: "A SMART goal is:",
			options: ["Smart, manageable, attainable, relevant, and timely", "Smart, measurable, achievable, relevant, and timely", "Specific, measurable, attainable, relevant, and timely", "Specific, manageable, achievable, relative, and true"],
			remediation: ["Not quite. A SMART goal is specific, measurable, achievable, relevant, and timely.", "Not quite. A SMART goal is specific, measurable, achievable, relevant, and timely.", "You're right! For a goal to be SMART it should be all these things.", "Not quite. A SMART goal is specific, measurable, achievable, relevant, and timely."],
			questionVO: ["audio/Question28-3000.m4a", "audio/Question28-3000.ogg"],
			remediationVO: [["audio/Question28-3000-Remediation-a.m4a", "audio/Question28-3000-Remediation-a.ogg"], 
							["audio/Question28-3000-Remediation-b.m4a", "audio/Question28-3000-Remediation-b.ogg"], 
							["audio/Question28-3000-Remediation-c.m4a", "audio/Question28-3000-Remediation-c.ogg"], 
							["audio/Question28-3000-Remediation-d.m4a", "audio/Question28-3000-Remediation-d.ogg"]],
			correctIndex: 2,
			value: 3000
		},
		{
			question: "What does it mean for a goal to be relevant?",
			options: ["It should have something to do with what's going on in the news.", "It should be important to you.", "It should be important to your family and friends.", "It should be about something you're learning in school."],
			remediation: ["Not quite. For a goal to be relevant it should be important to you.", "That's right! Your goal must be important to you!", "Not quite. For a goal to be relevant it should be important to you, not your family and friends.", "Not quite. For a goal to be relevant it should be important to you."],
			questionVO: ["audio/Question29-3000.m4a", "audio/Question29-3000.ogg"],
			remediationVO: [["audio/Question29-3000-Remediation-a.m4a", "audio/Question29-3000-Remediation-a.ogg"], 
							["audio/Question29-3000-Remediation-b.m4a", "audio/Question29-3000-Remediation-b.ogg"], 
							["audio/Question29-3000-Remediation-c.m4a", "audio/Question29-3000-Remediation-c.ogg"], 
							["audio/Question29-3000-Remediation-d.m4a", "audio/Question29-3000-Remediation-d.ogg"]],
			correctIndex: 1,
			value: 3000
		}
	]
}