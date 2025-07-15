epSettings = {

	scormEnabled: epScormEnabled,

	autoScale: true,

	textureKey: "spritesheet",

	loader: {

		rotator: {
			key: "rotator",
			file: "images/load-rotator.png",
			x: 320,
			y: 255,
			speed: 7
		},

		background: {
			key: "sky-background",
			file: "images/BackgroundPlain.png",
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
		background: {
			key: "sky-background",
			x: 0,
			y: 0
		},
		decorations: [
			{
				texture: "spritesheet",
				key: "Horizon.png",
				x: 0,
				y: 205,
				scale: [1, 1]
			},
			{
				texture: "spritesheet",
				key: "Logo_EP.png",
				x: 185,
				y: 20,
				scale: [1, 1]
			}
		],
		texts: [
			{
				font: "PT Sans",
				fill: "#61350A",
				size: 26,
				lineSpacing: 0,
				weight: "bold",
				x: 320,
				y: 150,
				align: "center",
				wordWrap: false,
				message: "Can you make it to the top of the mountain?"
			},
			{
				font: "PT Sans",
				fill: "#ffffff",
				size: 18,
				lineSpacing: -4,
				weight: "normal",
				x: 40,
				y: 280,
				align: "left",
				wordWrap: true,
				wordWrapWidth: 560,
				message: "You will be asked questions about the things you have learned throughout this course. For each question you answer correctly, you will be given a balloon that will move you up the side of the mountain. For each question you answer incorrectly, a balloon will pop. If all of your balloons pop, the game is over. Make it through all three levels of questions and you will ascend to the top of Extreme Peak! Good luck!"
			}
		],
		continueButton: {
			texture: "spritesheet",
			x: 260,
			y: 423,
			overKey: "btn_continue0002.png",
			outKey: "btn_continue0001.png",
			downKey: "btn_continue0002.png",
			upKey: "btn_continue0001.png"
		},
		voKey: "Instructions",
		musicKey: "Cousin_Virgil_yodel_loop",
		musicVolume: 0.3
	},

	characterSelect: {
		background: {
			key: "sky-background",
			x: 0,
			y: 0
		},
		decorations: [
			{
				texture: "spritesheet",
				key: "Horizon.png",
				x: 0,
				y: 205,
				scale: [1, 1]
			},
			{
				texture: "spritesheet",
				key: "Logo_EP.png",
				x: 12,
				y: 12,
				scale: [.63, .63]
			},
			{
				texture: "spritesheet",
				key: "mountainEdge_level1.png",
				x: 0,
				y: 0,
				scale: [1, 1]
			},
			{
				texture: "spritesheet",
				key: "pop-up_box_character.png",
				x: 10,
				y: -10,
				scale: [1, 1]
			}
		],
		texts: [
			{
				font: "PT Sans",
				fill: "#ffffff",
				size: 37,
				lineSpacing: -7,
				weight: "bold",
				x: 210,
				y: 65,
				align: "center",
				wordWrap: true,
				wordWrapWidth: 300,
				message: "Choose your character."
			}
		],
		characterOneButton: {
			texture: "spritesheet",
			x: 65,
			y: 195,
			overKey: "btn_Jack0002.png",
			outKey: "btn_Jack0001.png",
			downKey: "btn_Jack0002.png",
			upKey: "btn_Jack0001.png"
		},
		characterTwoButton: {
			texture: "spritesheet",
			x: 235,
			y: 190,
			overKey: "btn_Sofia0002.png",
			outKey: "btn_Sofia0001.png",
			downKey: "btn_Sofia0002.png",
			upKey: "btn_Sofia0001.png"
		},
		voKey: "Character"
	},

	game: {

		background: {
			key: "sky-background",
			x: 0,
			y: 0
		},
		decorations: [
			{
				texture: "spritesheet",
				key: "Logo_EP.png",
				x: 12,
				y: 12,
				scale: [.63, .63]
			}
		],
		horizon: {
			texture: "spritesheet",
			key: "Horizon.png",
			x: 0,
			y: 205,
			yStep: 15
		},
		mountainEdge: {
			texture: "spritesheet",
			key: "mountainEdge.png",
			startX: 0,
			startY: 0,
			travelX: -125,
			travelY: 480,
			segmentsNeeded: 3,
			levelSegments: [
				{
					key: "mountainEdge_level1.png",
					segment: 0
				},
				{
					key: "mountainEdge_level2.png",
					segment: 3
				},
				{
					key: "mountainEdge_level3.png",
					segment: 6
				},
				{
					key: "mountainEdge_top.png",
					segment: 9
				},
				{
					key: "btn_A0001.png",
					segment: 10
				}
			]
		},
		levelStops: [
			{
				texture: "spritesheet",
				key: "level_1.png",
				x: 0,
				y: 280
			}
		],
		character: {
			texture: "spritesheet",
			floatLift: 10,
			hoverDistance: -10,
			hoverDuration: 3000,
			options: [
				{
					x: 322,
					y: 165,
					still: "jack0001.png",
					floating: "jack0002.png",
					dropping: "jack0003.png",
					falling: "jack0004.png",
					crash: "jack0005.png",
					balloonX: 302,
					balloonY: -22,
					endGameX: 379,
					endGameY: 110
				},
				{
					x: 290,
					y: 147,
					still: "sofia0001.png",
					floating: "sofia0002.png",
					dropping: "sofia0003.png",
					falling: "sofia0004.png",
					crash: "sofia0005.png",
					balloonX: 304,
					balloonY: -24,
					endGameX: 348,
					endGameY: 97
				}
			]
		},
		balloons: {
			texture: "spritesheet",
			addDelay: 250,
			addSoundKey: "balloonAdd",
			removeSoundKey: "pop6a",
			frames: [
				{
					// blank
				},
				{
					activeFrame: "balloons0011.png",
					popFrame: "balloons0012.png"
				},
				{
					activeFrame: "balloons0009.png",
					popFrame: "balloons0010.png"
				},
				{
					activeFrame: "balloons0007.png",
					popFrame: "balloons0008.png"
				},
				{
					activeFrame: "balloons0005.png",
					popFrame: "balloons0006.png"
				},
				{
					activeFrame: "balloons0003.png",
					popFrame: "balloons0004.png"
				},
				{
					activeFrame: "balloons0001.png",
					popFrame: "balloons0002.png"
				}
			]
		},
		float: {
			xStep: -62.5,
			yStep: 240,
			stepDuration: 3000,
			fallDuration: 1500
		},
		crashSoundKey: "crash",
		winSoundKey: "orchestraltadastinger01",
		levelSettings: [
			{
				balloonsAtStart: 3,
			},
			{
				balloonsAtStart: 2,
			},
			{
				balloonsAtStart: 1,
			}
		],
		endSettings: {
			xAdjust: 60,
			yAdjust: -55
		},
		levelDialog: {
			texture: "spritesheet",
			backgroundKey: "pop-up_box_backgroundNarrow.png",
			x: 5,
			y: -10,
			topText: {
				font: "PT Sans",
				fill: "#ffffff",
				size: 24,
				lineSpacing: -7,
				weight: "bold",
				x: 160,
				y: 80,
				align: "center",
				wordWrap: true,
				wordWrapWidth: 284
			},
			bottomText: {
				font: "PT Sans",
				fill: "#FFFF00",
				size: 18,
				lineSpacing: -4,
				weight: "bold",
				x: 160,
				y: 150,
				align: "center",
				wordWrap: true,
				wordWrapWidth: 284
			},
			continueButton: {
				texture: "spritesheet",
				x: 100,
				y: 353,
				overKey: "btn_continue0002.png",
				outKey: "btn_continue0001.png",
				downKey: "btn_continue0002.png",
				upKey: "btn_continue0001.png"
			},
			playAgainButton: {
				texture: "spritesheet",
				x: 100,
				y: 353,
				overKey: "btn_playAgain0002.png",
				outKey: "btn_playAgain0001.png",
				downKey: "btn_playAgain0002.png",
				upKey: "btn_playAgain0001.png"
			},
			levelTexts: [
				{
					top: "Welcome to level one.",
					bottom: "You will be given three balloons to help you get started. When you have a total of six balloons you will reach level two.\n\nClick continue to start.",
					voKey: "Level 1"
				},
				{
					top: "Good job!\nYou made it to level two!",
					bottom: "In this level you will be given a two balloon head start. When you have a total of six balloons you will reach level three.\n\nClick continue to start.",
					voKey: "Level 2"
				},
				{
					top: "Great job!\nYou made it to level three!",
					bottom: "This is the final level. You will start this level with only one balloon. Collect six balloons and you will reach the top of the mountain.\n\nClick continue to start.",
					voKey: "Level 3"
				}
			],
			loseText:{
				top: "Sorry.",
				bottom: "You ran out of balloons so the game is over. Click play again and give it another try.",
				voKey: "Lose"
			},
			winText:{
				top: "Congratulations!",
				bottom: "You made it to the top of Extreme Peak! Play again, answer more questions and see if you can make it back to the top!",
				voKey: "Win"
			}
		},
		questionDialog: {
			texture: "spritesheet",
			backgroundKey: "pop-up_box_backgroundNarrow.png",
			x: 5,
			y: -10,
			optionButtons: [
				{
					overKey: "btn_A0002.png",
					outKey: "btn_A0001.png",
					downKey: "btn_A0002.png",
					upKey: "btn_A0001.png",
					x: 19,
					y: 125
				},
				{
					overKey: "btn_B0002.png",
					outKey: "btn_B0001.png",
					downKey: "btn_B0002.png",
					upKey: "btn_B0001.png",
					x: 19,
					y: 175
				},
				{
					overKey: "btn_C0002.png",
					outKey: "btn_C0001.png",
					downKey: "btn_C0002.png",
					upKey: "btn_C0001.png",
					x: 19,
					y: 225
				},
				{
					overKey: "btn_D0002.png",
					outKey: "btn_D0001.png",
					downKey: "btn_D0002.png",
					upKey: "btn_D0001.png",
					x: 19,
					y: 275
				}
			],
			continueButton: {
				texture: "spritesheet",
				x: 188,
				y: 417,
				overKey: "btn_continue0002.png",
				outKey: "btn_continue0001.png",
				downKey: "btn_continue0002.png",
				upKey: "btn_continue0001.png"
			},
			questionStyle: {
				font: "PT Sans",
				fill: "#4C3C17",
				size: 16,
				lineSpacing: -9,
				weight: "bold",
				x: 25,
				y: 53,
				align: "left",
				wordWrap: true,
				wordWrapWidth: 284
			},
			optionStyle: {
				font: "PT Sans",
				fill: "#ffffff",
				size: 16,
				lineSpacing: -9,
				weight: "normal",
				x: 55,
				y: 131,
				yInterval: 50,
				align: "left",
				wordWrap: true,
				wordWrapWidth: 256,
				highlightColor: "#ffff00"
			},
			remediationStyle: {
				font: "PT Sans",
				fill: "#ffff00",
				size: 16,
				lineSpacing: -9,
				weight: "bold",
				x: 25,
				y: 333,
				align: "left",
				wordWrap: true,
				wordWrapWidth: 284
			},
			drawQuestionsRandomly: true
		},
		questions: [
			{
				questionText: "Fifth graders need 7-8 hours of sleep each night.",
				optionText: [
					"True",
					"False"
				],
				remediationText: [
					"Not quite. Fifth graders generally need around 10 hours of sleep each night.",
					"Correct!"
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 1.m4a", "audio/Question 1.ogg"],
				remediationAudio: [
					["audio/Question 1 remediation a.m4a", "audio/Question 1 remediation a.ogg"],
					["audio/Correct.m4a", "audio/Correct.ogg"]
				]
			},
			{
				questionText: "How much physical activity should you try to get each day?",
				optionText: [
					"30 minutes",
					"45 minutes",
					"60 minutes"
				],
				remediationText: [
					"Not quite. You should try to get 60 minutes of physical activity each day.",
					"Not quite. You should try to get 60 minutes of physical activity each day.",
					"That's right!"
				],
				correctIndex: 2,
				questionAudio: ["audio/Question 2.m4a", "audio/Question 2.ogg"],
				remediationAudio: [
					["audio/Question 2 remediation ab.m4a", "audio/Question 2 remediation ab.ogg"],
					["audio/Question 2 remediation ab.m4a", "audio/Question 2 remediation ab.ogg"],
					["audio/That's right.m4a", "audio/That's right.ogg"]
				]
			},
			{
				questionText: "Which of these is a physical activity?",
				optionText: [
					"Eating",
					"Swimming",
					"Reading"
				],
				remediationText: [
					"Sorry. Swimming is a physical activity, but eating and reading are not.",
					"You're right!",
					"Sorry. Swimming is a physical activity, but eating and reading are not."
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 3Z.m4a", "audio/Question 3Z.ogg"],
				remediationAudio: [
					["audio/Question 3 remediation ac.m4a", "audio/Question 3 remediation ac.ogg"],
					["audio/You're right.m4a", "audio/You're right.ogg"],
					["audio/Question 3 remediation ac.m4a", "audio/Question 3 remediation ac.ogg"]
				]
			},
			{
				questionText: "Which of the following is a valid source of information that can help you figure out what types of foods you should be eating every day?",
				optionText: [
					"MyPyramid",
					"MyMeals",
					"MyPlate"
				],
				remediationText: [
					"That's incorrect. MyPlate is the tool that can help you figure out what types of foods you should eat every day.",
					"That's incorrect. MyPlate is the tool that can help you figure out what types of foods you should eat every day.",
					"Correct!"
				],
				correctIndex: 2,
				questionAudio: ["audio/Question 4.m4a", "audio/Question 4.ogg"],
				remediationAudio: [
					["audio/Question 4 remediation ab.m4a", "audio/Question 4 remediation ab.ogg"],
					["audio/Question 4 remediation ab.m4a", "audio/Question 4 remediation ab.ogg"],
					["audio/Correct.m4a", "audio/Correct.ogg"]
				]
			},
			{
				questionText: "It's ok to skip a meal each day because you really only need two meals per day.",
				optionText: [
					"True",
					"False"
				],
				remediationText: [
					"Not quite. Your body needs three meals per day to have enough energy to get through the day.",
					"That's right!"
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 5.m4a", "audio/Question 5.ogg"],
				remediationAudio: [
					["audio/Question 5 remediation a.m4a", "audio/Question 5 remediation a.ogg"],
					["audio/That's right.m4a", "audio/That's right.ogg"]
				]
			},
			{
				questionText: "What is the maximum amount of time you should spend on inactive, or sedentary, activities, per day, outside of school?",
				optionText: [
					"2 hours",
					"3 hours",
					"4 hours"
				],
				remediationText: [
					"Great job!",
					"Sorry, but three hours would be too much. You should aim for 2 hours or less of inactivity each day.",
					"Sorry, but four hours is too much. You should aim for 2 hours or less of inactivity each day."
				],
				correctIndex: 0,
				questionAudio: ["audio/Question 6.m4a", "audio/Question 6.ogg"],
				remediationAudio: [
					["audio/Great job.m4a", "audio/Great job.ogg"],
					["audio/Question 6 remediation b.m4a", "audio/Question 6 remediation b.ogg"],
					["audio/Question 6 remediation c.m4a", "audio/Question 6 remediation c.ogg"]
				]
			},
			{
				questionText: "Which drink is best for the body?",
				optionText: [
					"Water",
					"Soda",
					"Sports drinks"
				],
				remediationText: [
					"Correct!",
					"Actually, soda has a lot of sugar in it, and is not great for the body.",
					"Actually, sports drinks have a lot of sugar in them, and they're not usually necessary."
				],
				correctIndex: 0,
				questionAudio: ["audio/Question 7.m4a", "audio/Question 7.ogg"],
				remediationAudio: [
					["audio/Correct.m4a", "audio/Correct.ogg"],
					["audio/Question 7 remediation b.m4a", "audio/Question 7 remediation b.ogg"],
					["audio/Question 7 remediation c.m4a", "audio/Question 7 remediation c.ogg"]
				]
			},
			{
				questionText: "Which of the following would be a good source of nutrition information?",
				optionText: [
					"TV commercial",
					"Friends",
					"School nurse"
				],
				remediationText: [
					"That's incorrect. A TV commercial is trying to sell you a specific product, which means it's not a valid source of information.",
					"That's incorrect. Friends can be helpful at times, but they're not necessarily a valid source of nutrition information.",
					"You got it!"
				],
				correctIndex: 2,
				questionAudio: ["audio/Question 8.m4a", "audio/Question 8.ogg"],
				remediationAudio: [
					["audio/Question 8 remediation a.m4a", "audio/Question 8 remediation a.ogg"],
					["audio/Question 8 remediation b.m4a", "audio/Question 8 remediation b.ogg"],
					["audio/You got it.m4a", "audio/You got it.ogg"]
				]
			},
			{
				questionText: "Sugar gives you long lasting energy.",
				optionText: [
					"True",
					"False"
				],
				remediationText: [
					"Not quite. Sugar gives you a quick burst of energy, and it only lasts a short time.",
					"Good job!"
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 9.m4a", "audio/Question 9.ogg"],
				remediationAudio: [
					["audio/Question 9 remediation a.m4a", "audio/Question 9 remediation a.ogg"],
					["audio/Good job.m4a", "audio/Good job.ogg"]
				]
			},
			{
				questionText: "Which of these is a physical sign of hunger?",
				optionText: [
					"The stomach starts to rumble.",
					"We feel tired and weak.",
					"It becomes hard to concentrate.",
					"All of the above."
				],
				remediationText: [
					"Almost. Actually, all of these things can happen.",
					"Almost. Actually, all of these things can happen.",
					"Almost. Actually, all of these things can happen.",
					"You are correct!"
				],
				correctIndex: 3,
				questionAudio: ["audio/Question 10.m4a", "audio/Question 10.ogg"],
				remediationAudio: [
					["audio/Question 10 remediation abc.m4a", "audio/Question 10 remediation abc.ogg"],
					["audio/Question 10 remediation abc.m4a", "audio/Question 10 remediation abc.ogg"],
					["audio/Question 10 remediation abc.m4a", "audio/Question 10 remediation abc.ogg"],
					["audio/You are correct.m4a", "audio/You are correct.ogg"]
				]
			},
			{
				questionText: "Not enjoying your food, feeling discomfort in your stomach, and feeling sluggish or sick, are all signs of what?",
				optionText: [
					"Eating too slowly",
					"Overeating",
					"Healthy eating"
				],
				remediationText: [
					"Nope. These are all signs of overeating.",
					"That's right!",
					"Nope. These are all signs of overeating."
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 11.m4a", "audio/Question 11.ogg"],
				remediationAudio: [
					["audio/Question 11 remediation ac.m4a", "audio/Question 11 remediation ac.ogg"],
					["audio/That's right.m4a", "audio/That's right.ogg"],
					["audio/Question 11 remediation ac.m4a", "audio/Question 11 remediation ac.ogg"]
				]
			},
			{
				questionText: "Signals in our body that we may mistake for physical hunger are called:",
				optionText: [
					"Hunger cues",
					"Non-hunger cues",
					"Body cues"
				],
				remediationText: [
					"Sorry, but signals that we mistake for physical hunger are called non-hunger cues.",
					"Correct!",
					"Sorry, but signals that we mistake for physical hunger are called non-hunger cues."
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 12.m4a", "audio/Question 12.ogg"],
				remediationAudio: [
					["audio/Question 12 remediation ac.m4a", "audio/Question 12 remediation ac.ogg"],
					["audio/Correct.m4a", "audio/Correct.ogg"],
					["audio/Question 12 remediation ac.m4a", "audio/Question 12 remediation ac.ogg"]
				]
			},
			{
				questionText: "What is one way to overcome a barrier to healthy eating?",
				optionText: [
					"Identify your barriers",
					"Set goals",
					"Have a plan",
					"All of the above"
				],
				remediationText: [
					"Not quite. All of these things will help you overcome barriers.",
					"Not quite. All of these things will help you overcome barriers.",
					"Not quite. All of these things will help you overcome barriers.",
					"You got it!"
				],
				correctIndex: 3,
				questionAudio: ["audio/Question 13.m4a", "audio/Question 13.ogg"],
				remediationAudio: [
					["audio/Question 13 remediation abc.m4a", "audio/Question 13 remediation abc.ogg"],
					["audio/Question 13 remediation abc.m4a", "audio/Question 13 remediation abc.ogg"],
					["audio/Question 13 remediation abc.m4a", "audio/Question 13 remediation abc.ogg"],
					["audio/You got it.m4a", "audio/You got it.ogg"]
				]
			},
			{
				questionText: "What are the three main types of physical activity?",
				optionText: [
					"Aerobic, strength, and stretching",
					"Weight management, jumping, and swimming",
					"Aerobic, stretching, and sedentary"
				],
				remediationText: [
					"Good job!",
					"That's incorrect. The three main types of physical activity are aerobic, strength, and stretching.",
					"That's incorrect. The three main types of physical activity are aerobic, strength, and stretching."
				],
				correctIndex: 0,
				questionAudio: ["audio/Question 14.m4a", "audio/Question 14.ogg"],
				remediationAudio: [
					["audio/Good job.m4a", "audio/Good job.ogg"],
					["audio/Question 15 remediation b.m4a", "audio/Question 15 remediation b.ogg"],
					["audio/Question 15 remediation c.m4a", "audio/Question 15 remediation c.ogg"]
				]
			},
			{
				questionText: "Which type of physical activity gets your whole body moving and your heart rate up?",
				optionText: [
					"Aerobic",
					"Strength",
					"Stretching"
				],
				remediationText: [
					"You are correct!",
					"Nope. Strength training is good for you, but aerobic activity gets your whole body moving and your heart rate up.",
					"Nope. Stretching is good for you, but aerobic activity gets your whole body moving and your heart rate up."
				],
				correctIndex: 0,
				questionAudio: ["audio/Question 15.m4a", "audio/Question 15.ogg"],
				remediationAudio: [
					["audio/You are correct.m4a", "audio/You are correct.ogg"],
					["audio/Question 15 remediation b.m4a", "audio/Question 15 remediation b.ogg"],
					["audio/Question 15 remediation c.m4a", "audio/Question 15 remediation c.ogg"]
				]
			},
			{
				questionText: "Sit-ups and push-ups are examples of what type of physical activity?",
				optionText: [
					"Aerobic",
					"Strength",
					"Stretching"
				],
				remediationText: [
					"Nope. These are examples of strength training.",
					"That's right!",
					"Nope. These are examples of strength training."
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 16.m4a", "audio/Question 16.ogg"],
				remediationAudio: [
					["audio/Question 16 remediation ac.m4a", "audio/Question 16 remediation ac.ogg"],
					["audio/That's right.m4a", "audio/That's right.ogg"],
					["audio/Question 16 remediation ac.m4a", "audio/Question 16 remediation ac.ogg"]
				]
			},
			{
				questionText: "Sedentary activities include:",
				optionText: [
					"Gardening",
					"Walking",
					"Watching TV"
				],
				remediationText: [
					"Not quite. Watching TV is considered a sedentary activity.",
					"Not quite. Watching TV is considered a sedentary activity.",
					"Correct!"
				],
				correctIndex: 2,
				questionAudio: ["audio/Question 17.m4a", "audio/Question 17.ogg"],
				remediationAudio: [
					["audio/Question 17 remediation ab.m4a", "audio/Question 17 remediation ab.ogg"],
					["audio/Question 17 remediation ab.m4a", "audio/Question 17 remediation ab.ogg"],
					["audio/Correct.m4a", "audio/Correct.ogg"]
				]
			},
			{
				questionText: "Having more energy, being able to focus better, and sleeping better at night are all benefits of what?",
				optionText: [
					"Sedentary activity",
					"Physical activity",
					"Playing video games"
				],
				remediationText: [
					"That's incorrect. These are all benefits of physical activity.",
					"You're right!",
					"That's incorrect. These are all benefits of physical activity."
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 18.m4a", "audio/Question 18.ogg"],
				remediationAudio: [
					["audio/Question 18 remediation ac.m4a", "audio/Question 18 remediation ac.ogg"],
					["audio/You're right.m4a", "audio/You're right.ogg"],
					["audio/Question 18 remediation ac.m4a", "audio/Question 18 remediation ac.ogg"]
				]
			},
			{
				questionText: "What is the last step of the decision-making process?",
				optionText: [
					"Make your decision.",
					"Look at your options.",
					"Evaluate your decision."
				],
				remediationText: [
					"That's incorrect. The last step of the decision-making process is evaluate your decision.",
					"That's incorrect. The last step of the decision-making process is evaluate your decision.",
					"Great job!"
				],
				correctIndex: 2,
				questionAudio: ["audio/Question 19.m4a", "audio/Question 19.ogg"],
				remediationAudio: [
					["audio/Question 19 remediation ab.m4a", "audio/Question 19 remediation ab.ogg"],
					["audio/Question 19 remediation ab.m4a", "audio/Question 19 remediation ab.ogg"],
					["audio/Great job.m4a", "audio/Great job.ogg"]
				]
			},
			{
				questionText: "What is the first step of the decision-making process?",
				optionText: [
					"Look at your options.",
					"Define the situation.",
					"List the positives and negatives of each option."
				],
				remediationText: [
					"Nope. The first step is to define the situation.",
					"You are correct!",
					"Nope. The first step is to define the situation."
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 20.m4a", "audio/Question 20.ogg"],
				remediationAudio: [
					["audio/Question 20 remediation ac.m4a", "audio/Question 20 remediation ac.ogg"],
					["audio/You are correct.m4a", "audio/You are correct.ogg"],
					["audio/Question 20 remediation ac.m4a", "audio/Question 20 remediation ac.ogg"]
				]
			},
			{
				questionText: "Getting outside can help you concentrate better when you return indoors.",
				optionText: [
					"True",
					"False"
				],
				remediationText: [
					"Great job!",
					"Nope. That's actually true!"
				],
				correctIndex: 0,
				questionAudio: ["audio/Question 21.m4a", "audio/Question 21.ogg"],
				remediationAudio: [
					["audio/Great job.m4a", "audio/Great job.ogg"],
					["audio/Question 21 remediation b.m4a", "audio/Question 21 remediation b.ogg"]
				]
			},
			{
				questionText: "What does being mindful mean?",
				optionText: [
					"Following the decision-making process",
					"Being aware of your current thoughts, moods, feelings and sensations",
					"Explaining your feelings"
				],
				remediationText: [
					"Actually, being mindful means being aware of your thoughts, moods, feelings and sensations that are happening right now.",
					"You got it!",
					"Actually, being mindful means being aware of your thoughts, moods, feelings and sensations that are happening right now."
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 22.m4a", "audio/Question 22.ogg"],
				remediationAudio: [
					["audio/Question 22 remediation ac.m4a", "audio/Question 22 remediation ac.ogg"],
					["audio/You got it.m4a", "audio/You got it.ogg"],
					["audio/Question 22 remediation ac.m4a", "audio/Question 22 remediation ac.ogg"]
				]
			},
			{
				questionText: "Down time is a waste of time.",
				optionText: [
					"True",
					"False"
				],
				remediationText: [
					"No way! Down time helps our brain recharge.",
					"You're right!"
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 23.m4a", "audio/Question 23.ogg"],
				remediationAudio: [
					["audio/Question 23 remediation a.m4a", "audio/Question 23 remediation a.ogg"],
					["audio/You're right.m4a", "audio/You're right.ogg"]
				]
			},
			{
				questionText: "It's best to sleep in for a few extra hours on the weekends so you can catch up on sleep.",
				optionText: [
					"True",
					"False"
				],
				remediationText: [
					"Sleeping in a little bit is ok, but it's better to wake up and go to sleep around the same time every day.",
					"Correct!"
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 24.m4a", "audio/Question 24.ogg"],
				remediationAudio: [
					["audio/Question 24 remediation a.m4a", "audio/Question 24 remediation a.ogg"],
					["audio/Correct.m4a", "audio/Correct.ogg"]
				]
			},
			{
				questionText: "Watching TV is a good way to fall asleep.",
				optionText: [
					"True",
					"False"
				],
				remediationText: [
					"No way! Your room should be dark and quiet when you fall asleep. TV can actually keep you awake.",
					"You got it!"
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 25.m4a", "audio/Question 25.ogg"],
				remediationAudio: [
					["audio/Question 25 remediation a.m4a", "audio/Question 25 remediation a.ogg"],
					["audio/You got it.m4a", "audio/You got it.ogg"]
				]
			},
			{
				questionText: "All electronics should be turned off at least how many minutes before bedtime?",
				optionText: [
					"10 minutes",
					"15 minutes",
					"30 minutes"
				],
				remediationText: [
					"Not quite. Electronics should be turned off at least 30 minutes before bedtime.",
					"Not quite. Electronics should be turned off at least 30 minutes before bedtime.",
					"Great job!"
				],
				correctIndex: 2,
				questionAudio: ["audio/Question 26.m4a", "audio/Question 26.ogg"],
				remediationAudio: [
					["audio/Question 26 remediation ab.m4a", "audio/Question 26 remediation ab.ogg"],
					["audio/Question 26 remediation ab.m4a", "audio/Question 26 remediation ab.ogg"],
					["audio/Great job.m4a", "audio/Great job.ogg"]
				]
			},
			{
				questionText: "What is melatonin?",
				optionText: [
					"A hormone that controls your sleep/wake cycle",
					"A hormone that controls your hunger",
					"A hormone that controls your emotions"
				],
				remediationText: [
					"You are correct!",
					"Sorry. Melatonin is a hormone that your body makes to control your sleep/wake cycle.",
					"Sorry. Melatonin is a hormone that your body makes to control your sleep/wake cycle."
				],
				correctIndex: 0,
				questionAudio: ["audio/Question 27.m4a", "audio/Question 27.ogg"],
				remediationAudio: [
					["audio/You are correct.m4a", "audio/You are correct.ogg"],
					["audio/Question 27 remediation bc.m4a", "audio/Question 27 remediation bc.ogg"],
					["audio/Question 27 remediation bc.m4a", "audio/Question 27 remediation bc.ogg"]
				]
			},
			{
				questionText: "Where is the best place for electronics while you sleep?",
				optionText: [
					"Under the bed",
					"On the floor next to your bed",
					"In another room",
					"Across the room"
				],
				remediationText: [
					"Not quite. For the best sleep, electronics should be kept in another room.",
					"Not quite. For the best sleep, electronics should be kept in another room.",
					"Correct!",
					"Not quite. For the best sleep, electronics should be kept in another room."
				],
				correctIndex: 2,
				questionAudio: ["audio/Question 28.m4a", "audio/Question 28.ogg"],
				remediationAudio: [
					["audio/Question 28 remediation abd.m4a", "audio/Question 28 remediation abd.ogg"],
					["audio/Question 28 remediation abd.m4a", "audio/Question 28 remediation abd.ogg"],
					["audio/Correct.m4a", "audio/Correct.ogg"],
					["audio/Question 28 remediation abd.m4a", "audio/Question 28 remediation abd.ogg"]
				]
			},
			{
				questionText: "What are three healthy behaviors that can be done each day?",
				optionText: [
					"Running a marathon, sleeping 7 hours a night, and drinking soda for energy",
					"Sleeping 10 hours a night, getting an hour of physical activity, and eating healthy foods",
					"Sleeping 12 hours a night, playing video games, and drinking sports drinks for energy"
				],
				remediationText: [
					"Well, you can't run a marathon every day, you need more than 7 hours sleep each night, and drinking soda is not a good way to give your body energy.",
					"That's right!",
					"Well, most kids your age need around 10 hours of sleep, playing video games each day probably isn't very healthy, and sports drinks aren't needed for energy. Food gives us energy."
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 29.m4a", "audio/Question 29.ogg"],
				remediationAudio: [
					["audio/Question 29 remediation a.m4a", "audio/Question 29 remediation a.ogg"],
					["audio/That's right.m4a", "audio/That's right.ogg"],
					["audio/Question 29 remediation c.m4a", "audio/Question 29 remediation c.ogg"]
				]
			},
			{
				questionText: "What is one question you should ask yourself when trying to determine if a source of health information is valid?",
				optionText: [
					"Was it easy to find?",
					"Is it free?",
					"Who wrote it?"
				],
				remediationText: [
					"Not quite. Just because the information was easy to find doesn't mean it's valid.",
					"Not quite. The cost of information does not make it valid.",
					"You got it!"
				],
				correctIndex: 2,
				questionAudio: ["audio/Question 30.m4a", "audio/Question 30.ogg"],
				remediationAudio: [
					["audio/Question 30 remediation a.m4a", "audio/Question 30 remediation a.ogg"],
					["audio/Question 30 remediation b.m4a", "audio/Question 30 remediation b.ogg"],
					["audio/You got it.m4a", "audio/You got it.ogg"]
				]
			},
			{
				questionText: "What are three sources of valid health information?",
				optionText: [
					"Friends, websites, and food packages",
					"Nurses, nutrition facts labels, and choosemyplate.gov",
					"Websites, TV commercials, and older siblings"
				],
				remediationText: [
					"Remember, friends don't know everything, not all websites are valid, and food packages are mainly to sell you the product.",
					"Correct!",
					"Remember, not all websites are valid, TV commercials are trying to sell you the product, and older siblings don't always know everything"
				],
				correctIndex: 1,
				questionAudio: ["audio/Question 31.m4a", "audio/Question 31.ogg"],
				remediationAudio: [
					["audio/Question 31 remediation a.m4a", "audio/Question 31 remediation a.ogg"],
					["audio/Correct.m4a", "audio/Correct.ogg"],
					["audio/Question 31 remediation c.m4a", "audio/Question 31 remediation c.ogg"]
				]
			},
			{
				questionText: "Who is someone that can help you reach your health goals?",
				optionText: [
					"An adult at home",
					"A doctor",
					"A school nurse",
					"All of the above"
				],
				remediationText: [
					"Not quite. All of these people can help you reach your health goals.",
					"Not quite. All of these people can help you reach your health goals.",
					"Not quite. All of these people can help you reach your health goals.",
					"Correct!"
				],
				correctIndex: 3,
				questionAudio: ["audio/Question 32.m4a", "audio/Question 32.ogg"],
				remediationAudio: [
					["audio/Question 32 remediation abc.m4a", "audio/Question 32 remediation abc.ogg"],
					["audio/Question 32 remediation abc.m4a", "audio/Question 32 remediation abc.ogg"],
					["audio/Question 32 remediation abc.m4a", "audio/Question 32 remediation abc.ogg"],
					["audio/Correct.m4a", "audio/Correct.ogg"]
				]
			}
		]

	},

	sfx: {
		key: "sfx",
		urls: ["audio/sfx.ogg", "audio/sfx.m4a"],
		data: {
			spritemap: {
				"Cousin_Virgil_yodel_loop": {
			        "start": 0,
			        "end": 15.973877551020408,
			        "loop": true
			      },
			      "balloonAdd": {
			        "start": 17,
			        "end": 17.223197278911563,
			        "loop": false
			      },
			      "crash": {
			        "start": 19,
			        "end": 20.536938775510205,
			        "loop": false
			      },
			      "orchestraltadastinger01": {
			        "start": 22,
			        "end": 25.381655328798185,
			        "loop": false
			      },
			      "pop6a": {
			        "start": 27,
			        "end": 27.264126984126985,
			        "loop": false
			      }
			}
		}
	},

	voiceover: {
		key: "vo",
		urls: ["audio/gamevo.ogg", "audio/gamevo.m4a"],
		data: {
			spritemap: {
				"Character": {
			        "start": 0,
			        "end": 1.167687074829932,
			        "loop": false
			      },
			      "Instructions": {
			        "start": 3,
			        "end": 33.921247165532876,
			        "loop": false
			      },
			      "Level 1": {
			        "start": 35,
			        "end": 46.68086167800453,
			        "loop": false
			      },
			      "Level 2": {
			        "start": 48,
			        "end": 61.67662131519275,
			        "loop": false
			      },
			      "Level 3": {
			        "start": 63,
			        "end": 78.3704761904762,
			        "loop": false
			      },
			      "Lose": {
			        "start": 80,
			        "end": 86.99174603174603,
			        "loop": false
			      },
			      "Win": {
			        "start": 88,
			        "end": 96.7553514739229,
			        "loop": false
			      }
			}
		}
	}

}