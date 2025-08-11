BHMSettings = {

	scormEnabled: BHMScormEnabled,

	autoScale: true,

	backgroundColor: "#387C2B",

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

		loadingText: {
			text: "Loading",
			font: "Arial, Helvetica, sans",
			fill: "#ffffff",
			size: 22,
			weight: 400,
			align: "center",
			lineSpacing: 0,
			x: 400,
			y: 415,
			anchor: { x: 0.5, y: 0 }
		},

		clickthroughText: {
			text: "Tap or click here to continue.",
			font: "Arial, Helvetica, sans",
			fill: "#ffffff",
			size: 22,
			weight: 400,
			align: "center",
			lineSpacing: 0,
			x: 400,
			y: 415,
			anchor: { x: 0.5, y: 0 }
		}

	},

	textures: [
		{ key: "interface", image: "images/interface.png", data: "images/interface.json" }
	],

	buttonClickKey: "mouseclick03",

	instructions: {
		backgroundElements: [
			{ x: 0, y: 0, texture: "interface", key: "divider-top.png" },
			{ x: 237, y: 30, texture: "interface", key: "logo.png" },
			{ x: 146, y: 342, texture: "interface", key: "instruction-box.png" }
		],

		title: {
			text: "INSTRUCTIONS",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#ffffff",
			size: 18,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 400,
			y: 310,
			anchor: { x: 0.5, y: 0 }
		},

		instructions: {
			text: "In this activity, you’ll build a meal plan for an entire day by choosing foods according to their Nutrition Facts Labels. You’ll also choose a snack to make sure all food groups are well represented in your plan. Click begin to get started.",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#387C2B",
			size: 16,
			weight: 600,
			align: "left",
			lineSpacing: -4,
			x: 170,
			y: 360,
			anchor: { x: 0, y: 0 },
			wordWrapWidth: 460
		},

		beginButton: {
			x: 354,
			y: 505,
			texture: "interface",
			upKey: "begin-btn.png",
			overKey: "begin-btn-down.png",
			downKey: "begin-btn-down.png",
			outKey: "begin-btn.png",
			anchor: { x: 0, y: 0 }
		},

		voKey: "Instructions"
	},

	chooser: {
		backgroundElements: [
			{ x: 0, y: -212, texture: "interface", key: "divider-top.png" }
		],

		loadRotator: {
			x: 400,
			y: 300,
			key: "rotator",
			anchor: { x: 0.5, y: 0.5 }
		},

		title: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#387C2B",
			size: 30,
			weight: 800,
			align: "center",
			lineSpacing: 0,
			x: 400,
			y: 25,
			anchor: { x: 0.5, y: 0 }
		},

		choiceHeading1: {
			text: "CHOICE #1",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#FFFFFF",
			size: 18,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 250,
			y: 111,
			anchor: { x: 0.5, y: 0 }
		},

		choiceHeading2: {
			text: "CHOICE #2",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#FFFFFF",
			size: 18,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 551,
			y: 111,
			anchor: { x: 0.5, y: 0 }
		},

		labelButton1: {
			x: 127,
			y: 163,
			texture: "interface",
			upKey: "labelbox.png",
			overKey: "labelbox-orange.png",
			downKey: "labelbox-orange.png",
			outKey: "labelbox.png",
			anchor: { x: 0, y: 0 },
			selectedKey: "labelbox-orange.png"
		},

		labelButton2: {
			x: 428,
			y: 163,
			texture: "interface",
			upKey: "labelbox.png",
			overKey: "labelbox-orange.png",
			downKey: "labelbox-orange.png",
			outKey: "labelbox.png",
			anchor: { x: 0, y: 0 },
			selectedKey: "labelbox-orange.png"
		},

		label1Position: { x: 131, y: 167 },
		label2Position: { x: 432, y: 167 },

		foodCircle1: {
			x: 147,
			y: 87,
			texture: "interface",
			key: "circle.png",
			scale: { x: .75, y: .75 }
		},

		foodCircle2: {
			x: 448,
			y: 87,
			texture: "interface",
			key: "circle.png",
			scale: { x: .75, y: .75 }
		},

		food1Position: { x: 153, y: 93 },
		food2Position: { x: 454, y: 93 },

		food1Name: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#FFFFFF",
			size: 18,
			weight: 700,
			align: "left",
			lineSpacing: -5,
			x: 227,
			y: 100,
			anchor: { x: 0, y: 0 },
			wordWrapWidth: 180
		},

		food2Name: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#FFFFFF",
			size: 18,
			weight: 700,
			align: "left",
			lineSpacing: -5,
			x: 528,
			y: 100,
			anchor: { x: 0, y: 0 },
			wordWrapWidth: 180
		},

		tallyBackground: {
			x: 669,
			y: 15,
			texture: "interface",
			key: "label-check.png"
		},

		tallyText: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#387C2B",
			size: 20,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 725,
			y: 27,
			anchor: { x: 0.5, y: 0 }
		},

		nextButton: {
			x: 694,
			y: 535,
			texture: "interface",
			upKey: "next-btn.png",
			overKey: "next-btn-down.png",
			downKey: "next-btn-down.png",
			outKey: "next-btn.png",
			anchor: { x: 0, y: 0 }
		},

		mealIntroVO: [ "Breakfast Intro", "Lunch Dinner Intro", "Lunch Dinner Intro" ],

		correctChoiceVO: "Choice Correct",
		incorrectChoiceVO: "Choice Incorrect",
		correctSFX: "service_bell_01",
		correctVODelay: 666
	},

	mealSummary: {
		backgroundElements: [
			{ x: 0, y: -212, texture: "interface", key: "divider-top.png" }
		],

		title: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#387C2B",
			size: 30,
			weight: 800,
			align: "center",
			lineSpacing: 0,
			x: 400,
			y: 25,
			anchor: { x: 0.5, y: 0 }
		},

		tallyBackground: {
			x: 669,
			y: 15,
			texture: "interface",
			key: "label-check.png"
		},

		tallyText: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#387C2B",
			size: 20,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 725,
			y: 27,
			anchor: { x: 0.5, y: 0 }
		},

		lunchButton: {
			x: 680,
			y: 535,
			texture: "interface",
			upKey: "lunch-btn.png",
			overKey: "lunch-btn-down.png",
			downKey: "lunch-btn-down.png",
			outKey: "lunch-btn.png",
			anchor: { x: 0, y: 0 }
		},

		dinnerButton: {
			x: 680,
			y: 535,
			texture: "interface",
			upKey: "dinner-btn.png",
			overKey: "dinner-btn-down.png",
			downKey: "dinner-btn-down.png",
			outKey: "dinner-btn.png",
			anchor: { x: 0, y: 0 }
		},

		continueButton: {
			x: 639,
			y: 535,
			texture: "interface",
			upKey: "continue-btn.png",
			overKey: "continue-btn-down.png",
			downKey: "continue-btn-down.png",
			outKey: "continue-btn.png",
			anchor: { x: 0, y: 0 }
		},

		circle: {
			x: 234,
			y: 96,
			texture: "interface",
			key: "circle.png"
		},

		circleYPositions: [191, 191, 191, 143, 96],
		circleYInterval: 95,

		foodPositionOffset: { x: 8, y: 8 },

		correctMark: {
			x: 0,
			y: 0,
			texture: "interface",
			key: "green-check.png",
			offset: { x: -13, y: 37 }
		},

		incorrectMark: {
			x: 0,
			y: 0,
			texture: "interface",
			key: "green-x.png",
			offset: { x: -13, y: 37 }
		},

		foodLabel: {
			text: "default",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#FFFFFF",
			size: 18,
			weight: 700,
			align: "left",
			lineSpacing: 0,
			x: 341,
			y: 131,
			anchor: { x: 0, y: 0 }
		},

		labelPositionOffset: { x: 107, y: 35 },

		mealSummaryPerfectVO: [ "Breakfast Summary Perfect", "Lunch Summary Perfect", "Dinner Summary  Perfect" ],
		mealSummaryOneWrongVO: [ "Breakfast Summary One Wrong", "Lunch Summary One Wrong", "Dinner Summary One Wrong" ],
		mealSummaryTwoWrongVO: [ "Breakfast Summary Two or More Wrong", "Lunch Summary Two or More Wrong", "Dinner Summary Two or More Wrong" ]

	},

	daySummary: {
		backgroundElements: [
		],

		tallyBackground: {
			x: 153,
			y: 0,
			texture: "interface",
			key: "label-check.png"
		},

		tallyText: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#387C2B",
			size: 20,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 208,
			y: 12,
			anchor: { x: 0.5, y: 0 }
		},

		foodStartY: 55,
		foodInterval: 30,

		foodGroupsTitle: {
			text: "FOOD GROUPS",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#ffffff",
			size: 18,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 402,
			y: 14,
			anchor: { x: 0.5, y: 0 }
		},

		foodGroupLabels: {
			text: "",
			font: "Open Sans Condensed, Helvetica, sans-serif",
			fill: "#9AC83A",
			size: 13,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 307,
			y: 54,
			anchor: { x: 0.5, y: 0 },
			xInterval: 48
		},

		foodGroups: [ "PROTEIN", "GRAINS", "FRUITS", "VEG.", "DAIRY" ],

		mealLabels: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#9AC83A",
			size: 18,
			weight: 700,
			align: "left",
			lineSpacing: 0,
			x: 28,
			y: 73,
			anchor: { x: 0, y: 0 }
		},

		choiceLabels: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#ffffff",
			size: 13,
			weight: 600,
			align: "left",
			lineSpacing: 0,
			x: 57,
			y: 90,
			anchor: { x: 0, y: 0 }
		},

		correctMark: {
			x: 28,
			y: 90,
			texture: "interface",
			key: "check.png"
		},

		incorrectMark: {
			x: 28,
			y: 90,
			texture: "interface",
			key: "x.png"
		},

		groupCheck: {
			x: 308,
			y: 0,
			texture: "interface",
			key: "grid-checkmark.png",
			anchor: { x: 0.5, y: 0.5 },
			groupMap: [ "Protein", "Grains", "Fruits", "Vegetables", "Dairy" ]
		},

		grid: {
			color: 0xffffff,
			stroke: 2,
			x: 284,
			yOffset: -8,
			cellWidth: 48,
			cellHeight: 30
		},

		snackChooserBackground: { x: 549, y: 0, texture: "interface", key: "divider-right.png" },

		chooseASnackTitle: {
			text: "CHOOSE A SNACK",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#387C2B",
			size: 18,
			weight: 700,
			align: "center",
			lineSpacing: 0,
			x: 676,
			y: 14,
			anchor: { x: 0.5, y: 0 }
		},

		arrow: {
			x: 670,
			y: 51,
			texture: "interface",
			key: "down-arrow.png"
		},

		snackButton1: {
			x: 583,
			y: 88,
			texture: "interface",
			upKey: "snack-box.png",
			overKey: "snack-box-orange.png",
			downKey: "snack-box-orange.png",
			outKey: "snack-box.png",
			anchor: { x: 0, y: 0 },
			selectedKey: "snack-box-orange.png"
		},

		snackButton1: {
			x: 583,
			y: 88,
			texture: "interface",
			upKey: "snack-box.png",
			overKey: "snack-box-orange.png",
			downKey: "snack-box-orange.png",
			outKey: "snack-box.png",
			anchor: { x: 0, y: 0 },
			selectedKey: "snack-box-orange.png",
			imageOffset: { x: 93, y: 93 },
			imageAnchor: { x: 0.5, y: 0.5 }
		},

		snackButton2: {
			x: 583,
			y: 311,
			texture: "interface",
			upKey: "snack-box.png",
			overKey: "snack-box-orange.png",
			downKey: "snack-box-orange.png",
			outKey: "snack-box.png",
			anchor: { x: 0, y: 0 },
			selectedKey: "snack-box-orange.png",
			imageOffset: { x: 93, y: 93 },
			imageAnchor: { x: 0.5, y: 0.5 }
		},

		snack1Name: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#387C2B",
			size: 16,
			weight: 700,
			align: "center",
			lineSpacing: -7,
			x: 676,
			y: 243,
			anchor: { x: 0.5, y: 0 },
			wordWrapWidth: 165
		},

		snack2Name: {
			text: "",
			font: "Open Sans, Helvetica, sans-serif",
			fill: "#387C2B",
			size: 16,
			weight: 700,
			align: "center",
			lineSpacing: -7,
			x: 676,
			y: 466,
			anchor: { x: 0.5, y: 0 },
			wordWrapWidth: 165
		},

		continueButton: {
			x: 639,
			y: 535,
			texture: "interface",
			upKey: "continue-btn.png",
			overKey: "continue-btn-down.png",
			downKey: "continue-btn-down.png",
			outKey: "continue-btn.png",
			anchor: { x: 0, y: 0 }
		},

		playAgainButton: {
			x: 627,
			y: 535,
			texture: "interface",
			upKey: "playagain-btn.png",
			overKey: "playagain-btn-down.png",
			downKey: "playagain-btn-down.png",
			outKey: "playagain-btn.png",
			anchor: { x: 0, y: 0 }
		},

		introVO: "Day Summary Intro",

		grainsSnackVO: [ "Snack Choice Incorrect Grains", "Snack Choice Correct Grains" ],
		fruitsSnackVO: [ "Snack Choice Incorrect Fruits", "Snack Choice Correct Fruits" ],
		vegetablesSnackVO: [ "Snack Choice Incorrect Vegetables", "Snack Choice Correct Vegetables" ],
		dairySnackVO: [ "Snack Choice Incorrect Dairy", "Snack Choice Correct Dairy" ],
		proteinSnackVO: [ "Snack Choice Incorrect Protein", "Snack Choice Correct Protein" ],

		summaryGoodVO: "Day Summary Good",
		summaryOKVO: "Day Summary Ok"
	},

	mealData: {
		days: [
			{
				id: "1",
				texture: { key: "day1", image: "images/day1.png", data: "images/day1.json" },
				meals: [
					{
						id: "BREAKFAST",
						choices: [
							{
								healthy: {
									name: "Cheerios",
									image: { texture: "day1", key: "Cheerios-box.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Cheerios.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "Frosted Cheerios",
									image: { texture: "day1", key: "FrostedCheerios-box.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Frosted Cheerios.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "An Orange",
									image: { texture: "day1", key: "Orange-fruit.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Orange.jpg" },
									foodGroups: ["Fruits"]
								},
								unhealthy: {
									name: "Orange Juice",
									image: { texture: "day1", key: "JuiceOrange.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Orange Juice.jpg" },
									foodGroups: ["Fruits"]
								}
							},
							{
								healthy: {
									name: "White Skim Milk",
									image: { texture: "day1", key: "MilkSkim.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "White Skim Milk.jpg" },
									foodGroups: ["Dairy"]
								},
								unhealthy: {
									name: "Chocolate Milk",
									image: { texture: "day1", key: "MilkChocolate.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Chocolate Milk.jpg" },
									foodGroups: ["Dairy"]
								}
							}
						]
					},
					{
						id: "LUNCH",
						choices: [
							{
								healthy: {
									name: "Light Caesar Salad",
									image: { texture: "day1", key: "SaladCaesarLight.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Light Caesar Salad.jpg" },
									foodGroups: ["Vegetables"]
								},
								unhealthy: {
									name: "Regular Caesar Salad",
									image: { texture: "day1", key: "SaladCaesarReg.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Regular Caesar Salad.jpg" },
									foodGroups: ["Vegetables"]
								}
							},
							{
								healthy: {
									name: "Nonfat Greek Yogurt",
									image: { texture: "day1", key: "YogurtLightGreek.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Light Greek Yogurt.jpg" },
									foodGroups: ["Dairy"]
								},
								unhealthy: {
									name: "Low-fat Yogurt",
									image: { texture: "day1", key: "YogurtBlueberry.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Blueberry Yogurt.jpg" },
									foodGroups: ["Dairy"]
								}
							},
							{
								healthy: {
									name: "Fruit Cup (No Sugar Added)",
									image: { texture: "day1", key: "FruitCupNoSugarAdded.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Fruit Cup (No Sugar Added).jpg" },
									foodGroups: ["Fruits"]
								},
								unhealthy: {
									name: "Fruit Cup in Real Juice",
									image: { texture: "day1", key: "FruitCupInSyrup.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Fruit Cup (In Light Syrup).jpg" },
									foodGroups: ["Fruits"]
								}
							},
							{
								healthy: {
									name: "Flavored Water",
									image: { texture: "day1", key: "WaterFlavored.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Flavored Water.jpg" },
									foodGroups: []
								},
								unhealthy: {
									name: "Grape Soda",
									image: { texture: "day1", key: "SodaGrape.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Fruit Flavored Soda.jpg" },
									foodGroups: []
								}
							}
						]
					},
					{
						id: "DINNER",
						choices: [
							{
								healthy: {
									name: "Whole Wheat Tortilla",
									image: { texture: "day1", key: "TortillaWholeWheat.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Whole Wheat Tortilla.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "Flour Tortilla",
									image: { texture: "day1", key: "TortillaWhite.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "White Tortilla.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "Shredded Chicken",
									image: { texture: "day1", key: "ChickenShredded.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Shredded Chicken.jpg" },
									foodGroups: ["Protein"]
								},
								unhealthy: {
									name: "Ground Beef",
									image: { texture: "day1", key: "Beef.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Taco Beef.jpg" },
									foodGroups: ["Protein"]
								}
							},
							{
								healthy: {
									name: "Reduced Fat Cheese",
									image: { texture: "day1", key: "CheeseReducedFat.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Reduced Fat Cheese.jpg" },
									foodGroups: ["Dairy"]
								},
								unhealthy: {
									name: "Cheese",
									image: { texture: "day1", key: "CheeseHighFat.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "High Fat Cheese.jpg" },
									foodGroups: ["Dairy"]
								}
							},
							{
								healthy: {
									name: "Corn",
									image: { texture: "day1", key: "Corn.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Corn.jpg" },
									foodGroups: ["Vegetables"]
								},
								unhealthy: {
									name: "Buttered Corn",
									image: { texture: "day1", key: "CornWithButter.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Corn With Butter Sauce.jpg" },
									foodGroups: ["Vegetables"]
								}
							},
							{
								healthy: {
									name: "Sparkling Water",
									image: { texture: "day1", key: "WaterSparkling.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Flavored Sparkling Water.jpg" },
									foodGroups: []
								},
								unhealthy: {
									name: "Kool Aid",
									image: { texture: "day1", key: "KoolAidReg.png", scale: { x: .75, y: .75 } },
									label: { texture: "day1", key: "Regular Kool Aid.jpg" },
									foodGroups: []
								}
							}
						]
					}
				],
				snackChoices: {
					correct: {
						name: "Hard Boiled Egg",
						image: { texture: "day1", key: "HardBoiledEgg.png" },
						foodGroups: ["Protein"]
					},
					incorrect: {
						name: "Red Grapes",
						image: { texture: "day1", key: "GrapesRed.png" },
						foodGroups: ["Fruits"]
					}
				}
			},
			{
				id: "2",
				texture: { key: "day2", image: "images/day2.png", data: "images/day2.json" },
				meals: [
					{
						id: "BREAKFAST",
						choices: [
							{
								healthy: {
									name: "Nonfat Greek Yogurt",
									image: { texture: "day2", key: "Nonfat Greek Yogurt.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Nonfat Greek Yogurt.jpg" },
									foodGroups: ["Dairy"]
								},
								unhealthy: {
									name: "Low-fat Yogurt",
									image: { texture: "day2", key: "Low-fat Yogurt.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Low-fat Yogurt.jpg" },
									foodGroups: ["Dairy"]
								}
							},
							{
								healthy: {
									name: "Shredded Wheat Cereal",
									image: { texture: "day2", key: "Shredded Wheat Cereal.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Shredded Wheat Cereal.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "Granola",
									image: { texture: "day2", key: "Granola.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Granola.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "Raspberries",
									image: { texture: "day2", key: "Raspberries.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Raspberries.jpg" },
									foodGroups: ["Fruits"]
								},
								unhealthy: {
									name: "Raisins",
									image: { texture: "day2", key: "Raisins.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Raisins.jpg" },
									foodGroups: ["Fruits"]
								}
							},
							{
								healthy: {
									name: "Water",
									image: { texture: "day2", key: "Water.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Water.jpg" },
									foodGroups: []
								},
								unhealthy: {
									name: "Grape Soda",
									image: { texture: "day2", key: "Grape Soda.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Grape Soda.jpg" },
									foodGroups: []
								}
							}
						]
					},
					{
						id: "LUNCH",
						choices: [
							{
								healthy: {
									name: "Whole Wheat Bun",
									image: { texture: "day2", key: "Whole Wheat Bun.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Whole Wheat Bun.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "White Bun",
									image: { texture: "day2", key: "White Bun.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "White Bun.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "Turkey Burger",
									image: { texture: "day2", key: "Turkey Burger.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Turkey Burger.jpg" },
									foodGroups: ["Protein"]
								},
								unhealthy: {
									name: "Hamburger",
									image: { texture: "day2", key: "Hamburger.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Hamburger.jpg" },
									foodGroups: ["Protein"]
								}
							},
							{
								healthy: {
									name: "White Skim Milk",
									image: { texture: "day2", key: "White Skim Milk.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "White Skim Milk.jpg" },
									foodGroups: ["Dairy"]
								},
								unhealthy: {
									name: "Chocolate Milk",
									image: { texture: "day2", key: "Chocolate Milk.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Chocolate Milk.jpg" },
									foodGroups: ["Dairy"]
								}
							},
							{
								healthy: {
									name: "Apple",
									image: { texture: "day2", key: "Apple.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Apple.jpg" },
									foodGroups: ["Fruits"]
								},
								unhealthy: {
									name: "Applesauce",
									image: { texture: "day2", key: "Applesauce.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Applesauce.jpg" },
									foodGroups: ["Fruits"]
								}
							}
						]
					},
					{
						id: "DINNER",
						choices: [
							{
								healthy: {
									name: "Whole Wheat Pasta",
									image: { texture: "day2", key: "Whole Wheat Pasta.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Whole Wheat Pasta.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "Pasta",
									image: { texture: "day2", key: "Pasta.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Pasta.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "Marinara Sauce",
									image: { texture: "day2", key: "Marinara Sauce.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Marinara Sauce.jpg" },
									foodGroups: ["Vegetables"]
								},
								unhealthy: {
									name: "Alfredo Sauce",
									image: { texture: "day2", key: "Alfredo Sauce.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Alfredo Sauce.jpg" },
									foodGroups: ["Dairy"]
								}
							},
							{
								healthy: {
									name: "Turkey Sausage",
									image: { texture: "day2", key: "Turkey Sausage.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Turkey Sausage.jpg" },
									foodGroups: ["Protein"]
								},
								unhealthy: {
									name: "Italian Sausage",
									image: { texture: "day2", key: "Italian Sausage.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Italian Sausage.jpg" },
									foodGroups: ["Protein"]
								}
							},
							{
								healthy: {
									name: "Pear",
									image: { texture: "day2", key: "Pear.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Pear.jpg" },
									foodGroups: ["Fruits"]
								},
								unhealthy: {
									name: "Canned Pears in Heavy Syrup",
									image: { texture: "day2", key: "Canned Pears in Heavy Syrup.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Canned Pears in Heavy Syrup.jpg" },
									foodGroups: ["Fruits"]
								}
							},
							{
								healthy: {
									name: "White Skim Milk",
									image: { texture: "day2", key: "White Skim Milk.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "White Skim Milk.jpg" },
									foodGroups: ["Dairy"]
								},
								unhealthy: {
									name: "Strawberry Milk",
									image: { texture: "day2", key: "Strawberry Milk.png", scale: { x: .75, y: .75 } },
									label: { texture: "day2", key: "Strawberry Milk.jpg" },
									foodGroups: ["Dairy"]
								}
							}
						]
					}
				],
				snackChoices: {
					correct: {
						name: "Carrots",
						image: { texture: "day2", key: "Carrots.png" },
						foodGroups: ["Vegetables"]
					},
					incorrect: {
						name: "Nonfat Greek Yogurt",
						image: { texture: "day2", key: "Nonfat Greek Yogurt.png" },
						foodGroups: ["Dairy"]
					}
				}
			},
			{
				id: "3",
				texture: { key: "day3", image: "images/day3.png", data: "images/day3.json" },
				meals: [
					{
						id: "BREAKFAST",
						choices: [
							{
								healthy: {
									name: "Whole Wheat Toast",
									image: { texture: "day3", key: "Whole Wheat Toast.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Whole Wheat Toast.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "White Toast",
									image: { texture: "day3", key: "White Toast.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "White Toast.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "Peanut Butter",
									image: { texture: "day3", key: "Peanut Butter.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Peanut Butter.jpg" },
									foodGroups: ["Protein"]
								},
								unhealthy: {
									name: "Peanut Butter Chocolate Spread",
									image: { texture: "day3", key: "Peanut Butter Chocolate Spread.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Peanut Butter Chocolate Spread.jpg" },
									foodGroups: ["Protein"]
								}
							},
							{
								healthy: {
									name: "White Skim Milk",
									image: { texture: "day3", key: "White Skim Milk.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "White Skim Milk.jpg" },
									foodGroups: ["Dairy"]
								},
								unhealthy: {
									name: "Mocha Chilled Coffee",
									image: { texture: "day3", key: "Mocha Chilled Coffee.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Mocha Chilled Coffee.jpg" },
									foodGroups: ["Dairy"]
								}
							},
							{
								healthy: {
									name: "Strawberries",
									image: { texture: "day3", key: "Strawberries.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Strawberries.jpg" },
									foodGroups: ["Fruits"]
								},
								unhealthy: {
									name: "Berry Applesauce",
									image: { texture: "day3", key: "Berry Applesauce.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Berry Applesauce.jpg" },
									foodGroups: ["Fruits"]
								}
							}
						]
					},
					{
						id: "LUNCH",
						choices: [
							{
								healthy: {
									name: "Low Sodium Chicken Soup",
									image: { texture: "day3", key: "Low Sodium Chicken Soup.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Low Sodium Chicken Soup.jpg" },
									foodGroups: ["Protein", "Grains"]
								},
								unhealthy: {
									name: "Chicken Soup",
									image: { texture: "day3", key: "Chicken Soup.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Chicken Soup.jpg" },
									foodGroups: ["Protein", "Grains"]
								}
							},
							{
								healthy: {
									name: "Whole Wheat Crackers",
									image: { texture: "day3", key: "Whole Wheat Crackers.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Whole Wheat Crackers.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "Saltines",
									image: { texture: "day3", key: "Saltines.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Saltines.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "Orange",
									image: { texture: "day3", key: "Orange.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Orange.jpg" },
									foodGroups: ["Fruits"]
								},
								unhealthy: {
									name: "Canned Oranges in Syrup",
									image: { texture: "day3", key: "Canned Orange in Syrup.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Canned Orange in Syrup.jpg" },
									foodGroups: ["Fruits"]
								}
							},
							{
								healthy: {
									name: "String Cheese",
									image: { texture: "day3", key: "String Cheese.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "String Cheese.jpg" },
									foodGroups: ["Dairy"]
								},
								unhealthy: {
									name: "Mozzarella Sticks",
									image: { texture: "day3", key: "Mozzarella Sticks.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Mozzarella Sticks.jpg" },
									foodGroups: ["Dairy"]
								}
							},
							{
								healthy: {
									name: "Water",
									image: { texture: "day3", key: "Water.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Water.jpg" },
									foodGroups: []
								},
								unhealthy: {
									name: "Cola",
									image: { texture: "day3", key: "Cola.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Cola.jpg" },
									foodGroups: []
								}
							}
						]
					},
					{
						id: "DINNER",
						choices: [
							{
								healthy: {
									name: "Thin Crust Veggie Pizza",
									image: { texture: "day3", key: "Thin Crust Veggie Pizza.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Thin Crust Veggie Pizza.jpg" },
									foodGroups: ["Grains", "Vegetables", "Dairy"]
								},
								unhealthy: {
									name: "Meat Lover's Pizza",
									image: { texture: "day3", key: "Meat Lover's Pizza.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Meat Lover's Pizza.jpg" },
									foodGroups: ["Protein", "Grains", "Vegetables", "Dairy"]
								}
							},
							{
								healthy: {
									name: "Side Salad Without Dressing",
									image: { texture: "day3", key: "Side Salad Without Dressing.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Side Salad Without Dressing.jpg" },
									foodGroups: ["Vegetables"]
								},
								unhealthy: {
									name: "Onion Rings",
									image: { texture: "day3", key: "Onion Rings.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Onion Rings.jpg" },
									foodGroups: ["Vegetables"]
								}
							},
							{
								healthy: {
									name: "Water",
									image: { texture: "day3", key: "Water.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Water.jpg" },
									foodGroups: []
								},
								unhealthy: {
									name: "Cola",
									image: { texture: "day3", key: "Cola.png", scale: { x: .75, y: .75 } },
									label: { texture: "day3", key: "Cola.jpg" },
									foodGroups: []
								}
							}
						]
					}
				],
				snackChoices: {
					correct: {
						name: "Carrots",
						image: { texture: "day3", key: "Carrots.png" },
						foodGroups: ["Vegetables"]
					},
					incorrect: {
						name: "Whole Grain Tortilla Chips",
						image: { texture: "day3", key: "Whole Grain Tortilla Chips.png" },
						foodGroups: ["Grains"]
					}
				}
			},
			{
				id: "4",
				texture: { key: "day4", image: "images/day4.png", data: "images/day4.json" },
				meals: [
					{
						id: "BREAKFAST",
						choices: [
							{
								healthy: {
									name: "Egg",
									image: { texture: "day4", key: "Egg.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Egg.jpg" },
									foodGroups: ["Protein"]
								},
								unhealthy: {
									name: "Bacon",
									image: { texture: "day4", key: "Bacon.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Bacon.jpg" },
									foodGroups: ["Protein"]
								}
							},
							{
								healthy: {
									name: "Apple",
									image: { texture: "day4", key: "Apple.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Apple.jpg" },
									foodGroups: ["Fruits"]
								},
								unhealthy: {
									name: "Apple Juice",
									image: { texture: "day4", key: "Apple juice.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Apple juice.jpg" },
									foodGroups: ["Fruits"]
								}
							},
							{
								healthy: {
									name: "Plain Oatmeal",
									image: { texture: "day4", key: "Plain oatmeal.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Plain oatmeal.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "Blueberry Muffin",
									image: { texture: "day4", key: "Blueberry muffin.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Blueberry muffin.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "Fruit Flavored Water",
									image: { texture: "day4", key: "Fruit flavored water.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Fruit flavored water.jpg" },
									foodGroups: []
								},
								unhealthy: {
									name: "Fruit Flavored Soda",
									image: { texture: "day4", key: "Fruit flavored soda.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Fruit flavored soda.jpg" },
									foodGroups: []
								}
							}
						]
					},
					{
						id: "LUNCH",
						choices: [
							{
								healthy: {
									name: "Black Bean Burrito",
									image: { texture: "day4", key: "Black bean burrito.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Black bean burrito.jpg" },
									foodGroups: ["Protein", "Grains"]
								},
								unhealthy: {
									name: "Beef Burrito",
									image: { texture: "day4", key: "Beef burrito.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Beef burrito.jpg" },
									foodGroups: ["Protein", "Grains"]
								}
							},
							{
								healthy: {
									name: "Peach",
									image: { texture: "day4", key: "Peach.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Peach.jpg" },
									foodGroups: ["Fruits"]
								},
								unhealthy: {
									name: "Canned Peaches in Syrup",
									image: { texture: "day4", key: "Canned peaches in syrup.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Canned peaches in syrup.jpg" },
									foodGroups: ["Fruits"]
								}
							},
							{
								healthy: {
									name: "Pea Pods",
									image: { texture: "day4", key: "Pea pods.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Pea pods.jpg" },
									foodGroups: ["Vegetables"]
								},
								unhealthy: {
									name: "Frozen Peas with Butter",
									image: { texture: "day4", key: "Frozen peas with butter.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Frozen peas with butter.jpg" },
									foodGroups: ["Vegetables"]
								}
							},
							{
								healthy: {
									name: "Flavored Water",
									image: { texture: "day4", key: "Flavored water.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Flavored water.jpg" },
									foodGroups: []
								},
								unhealthy: {
									name: "Fruit Punch",
									image: { texture: "day4", key: "Fruit punch.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Fruit punch.jpg" },
									foodGroups: ["Fruits"]
								}
							}
						]
					},
					{
						id: "DINNER",
						choices: [
							{
								healthy: {
									name: "Broccoli",
									image: { texture: "day4", key: "Broccoli.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Broccoli.jpg" },
									foodGroups: ["Vegetables"]
								},
								unhealthy: {
									name: "Broccoli with Cheese",
									image: { texture: "day4", key: "Broccoli with cheese.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Broccoli with cheese.jpg" },
									foodGroups: ["Vegetables", "Dairy"]
								}
							},
							{
								healthy: {
									name: "Chicken Breast",
									image: { texture: "day4", key: "Chicken breast.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Chicken breast.jpg" },
									foodGroups: ["Protein"]
								},
								unhealthy: {
									name: "Chicken Nuggets",
									image: { texture: "day4", key: "Chicken nuggets.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Chicken nuggets.jpg" },
									foodGroups: ["Protein"]
								}
							},
							{
								healthy: {
									name: "Brown Rice",
									image: { texture: "day4", key: "Brown rice.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Brown rice.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "White Rice",
									image: { texture: "day4", key: "White rice.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "White rice.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "Water",
									image: { texture: "day4", key: "Water.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Water.jpg" },
									foodGroups: []
								},
								unhealthy: {
									name: "Root Beer",
									image: { texture: "day4", key: "Root beer.png", scale: { x: .75, y: .75 } },
									label: { texture: "day4", key: "Root beer.jpg" },
									foodGroups: []
								}
							}
						]
					}
				],
				snackChoices: {
					correct: {
						name: "Non-fat Greek Yogurt",
						image: { texture: "day4", key: "Nonfat Greek Yogurt Snack.png" },
						foodGroups: ["Dairy"]
					},
					incorrect: {
						name: "Granola Bar",
						image: { texture: "day4", key: "Granola bar snack.png" },
						foodGroups: ["Grains"]
					}
				}
			},
			{
				id: "5",
				texture: { key: "day5", image: "images/day5.png", data: "images/day5.json" },
				meals: [
					{
						id: "BREAKFAST",
						choices: [
							{
								healthy: {
									name: "Whole Grain English Muffin",
									image: { texture: "day5", key: "Whole grain English muffin.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Whole grain English muffin.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "Biscuit",
									image: { texture: "day5", key: "Biscuit.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Biscuit.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "Turkey Sausage",
									image: { texture: "day5", key: "Turkey sausage.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Turkey sausage.jpg" },
									foodGroups: ["Protein"]
								},
								unhealthy: {
									name: "Regular Sausage",
									image: { texture: "day5", key: "Regular sausage.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Regular sausage.jpg" },
									foodGroups: ["Protein"]
								}
							},
							{
								healthy: {
									name: "Red Grapes",
									image: { texture: "day5", key: "Red grapes.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Red grapes.jpg" },
									foodGroups: ["Fruits"]
								},
								unhealthy: {
									name: "Grape Juice",
									image: { texture: "day5", key: "Grape juice.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Grape juice.jpg" },
									foodGroups: ["Fruits"]
								}
							},
							{
								healthy: {
									name: "Water",
									image: { texture: "day5", key: "Water.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Water.jpg" },
									foodGroups: []
								},
								unhealthy: {
									name: "Sweetened Iced Tea",
									image: { texture: "day5", key: "Sweetened iced tea.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Sweetened iced tea.jpg" },
									foodGroups: []
								}
							}
						]
					},
					{
						id: "LUNCH",
						choices: [
							{
								healthy: {
									name: "Whole Wheat Bread",
									image: { texture: "day5", key: "Whole wheat bread.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Whole wheat bread.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "White Bread",
									image: { texture: "day5", key: "White bread.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "White bread.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "Lean Turkey",
									image: { texture: "day5", key: "Lean turkey.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Lean turkey.jpg" },
									foodGroups: ["Protein"]
								},
								unhealthy: {
									name: "Salami",
									image: { texture: "day5", key: "Salami.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Salami.jpg" },
									foodGroups: ["Protein"]
								}
							},
							{
								healthy: {
									name: "Baby Carrots",
									image: { texture: "day5", key: "Baby carrots.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Baby carrots.jpg" },
									foodGroups: ["Vegetables"]
								},
								unhealthy: {
									name: "Potato Chips",
									image: { texture: "day5", key: "Potato chips.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Potato chips.jpg" },
									foodGroups: ["Vegetables"]
								}
							},
							{
								healthy: {
									name: "White Skim Milk",
									image: { texture: "day5", key: "White skim milk.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "White skim milk.jpg" },
									foodGroups: ["Dairy"]
								},
								unhealthy: {
									name: "Strawberry Milk",
									image: { texture: "day5", key: "Strawberry milk.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Strawberry milk.jpg" },
									foodGroups: ["Dairy"]
								}
							}
						]
					},
					{
						id: "DINNER",
						choices: [
							{
								healthy: {
									name: "Roasted Potatoes",
									image: { texture: "day5", key: "Roasted potatoes.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Roasted potatoes.jpg" },
									foodGroups: ["Vegetables"]
								},
								unhealthy: {
									name: "French Fries",
									image: { texture: "day5", key: "French fries.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "French fries.jpg" },
									foodGroups: ["Vegetables"]
								}
							},
							{
								healthy: {
									name: "Lean Pork Chop",
									image: { texture: "day5", key: "Lean pork chop.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Lean pork chop.jpg" },
									foodGroups: ["Protein"]
								},
								unhealthy: {
									name: "Pork Ribs",
									image: { texture: "day5", key: "Pork ribs.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Pork ribs.jpg" },
									foodGroups: ["Protein"]
								}
							},
							{
								healthy: {
									name: "Whole Grain Roll",
									image: { texture: "day5", key: "Whole grain roll.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Whole grain roll.jpg" },
									foodGroups: ["Grains"]
								},
								unhealthy: {
									name: "White roll",
									image: { texture: "day5", key: "White roll.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "White roll.jpg" },
									foodGroups: ["Grains"]
								}
							},
							{
								healthy: {
									name: "White Skim Milk",
									image: { texture: "day5", key: "White skim milk.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "White skim milk.jpg" },
									foodGroups: ["Dairy"]
								},
								unhealthy: {
									name: "Chocolate Milk",
									image: { texture: "day5", key: "Chocolate milk.png", scale: { x: .75, y: .75 } },
									label: { texture: "day5", key: "Chocolate milk.jpg" },
									foodGroups: ["Dairy"]
								}
							}
						]
					}
				],
				snackChoices: {
					correct: {
						name: "Apple",
						image: { texture: "day5", key: "Apple snack.png" },
						foodGroups: ["Fruits"]
					},
					incorrect: {
						name: "Peanut Butter on Wheat Bread",
						image: { texture: "day5", key: "Peanut butter on wheat snack.png" },
						foodGroups: ["Grains", "Protein"]
					}
				}
			}
		]
	},

	sfx: {
		key: "sfx",
		urls: [ "audio/bhm-sfx.ogg", "audio/bhm-sfx.m4a" ],
		data: {
			spritemap: {
				"mouseclick03": {
			      "start": 0,
			      "end": 0.18,
			      "loop": false
			    },
			    "service_bell_01": {
			      "start": 1,
			      "end": 4.297233560090703,
			      "loop": false
			    }
			}
		}
	},

	voiceOver: {
		key: "vo",
		urls: [ "audio/bhm.ogg", "audio/bhm.m4a" ],
		data: {
			spritemap: {
				"Breakfast Intro": {
			      "start": 0,
			      "end": 5.4924489795918365,
			      "loop": false
			    },
			    "Breakfast Summary One Wrong": {
			      "start": 6,
			      "end": 13.756507936507937,
			      "loop": false
			    },
			    "Breakfast Summary Perfect": {
			      "start": 14,
			      "end": 20.624489795918368,
			      "loop": false
			    },
			    "Breakfast Summary Two or More Wrong": {
			      "start": 21,
			      "end": 30.131746031746033,
			      "loop": false
			    },
			    "Choice Correct": {
			      "start": 31,
			      "end": 33.43179138321995,
			      "loop": false
			    },
			    "Choice Incorrect": {
			      "start": 34,
			      "end": 36.758820861678004,
			      "loop": false
			    },
			    "Day Summary Good": {
			      "start": 37,
			      "end": 41.796462585034014,
			      "loop": false
			    },
			    "Day Summary Intro": {
			      "start": 42,
			      "end": 56.83800453514739,
			      "loop": false
			    },
			    "Day Summary Ok": {
			      "start": 57,
			      "end": 63.85927437641723,
			      "loop": false
			    },
			    "Dinner Summary  Perfect": {
			      "start": 64,
			      "end": 70.07945578231292,
			      "loop": false
			    },
			    "Dinner Summary One Wrong": {
			      "start": 71,
			      "end": 78.4546485260771,
			      "loop": false
			    },
			    "Dinner Summary Two or More Wrong": {
			      "start": 79,
			      "end": 85.0878231292517,
			      "loop": false
			    },
			    "Instructions": {
			      "start": 86,
			      "end": 98.85904761904762,
			      "loop": false
			    },
			    "Lunch Dinner Intro 01": {
			      "start": 99,
			      "end": 101.01251700680272,
			      "loop": false
			    },
			    "Lunch Dinner Intro 02": {
			      "start": 102,
			      "end": 104.29761904761905,
			      "loop": false
			    },
			    "Lunch Dinner Intro 03": {
			      "start": 105,
			      "end": 107.10471655328799,
			      "loop": false
			    },
			    "Lunch Dinner Intro": {
			      "start": 108,
			      "end": 110.29761904761905,
			      "loop": false
			    },
			    "Lunch Summary One Wrong": {
			      "start": 111,
			      "end": 118.09408163265306,
			      "loop": false
			    },
			    "Lunch Summary Perfect": {
			      "start": 119,
			      "end": 126.46303854875283,
			      "loop": false
			    },
			    "Lunch Summary Two or More Wrong": {
			      "start": 127,
			      "end": 133.85927437641723,
			      "loop": false
			    },
			    "Snack Choice Correct Dairy": {
			      "start": 134,
			      "end": 136.85943310657598,
			      "loop": false
			    },
			    "Snack Choice Correct Fruits": {
			      "start": 137,
			      "end": 139.88460317460317,
			      "loop": false
			    },
			    "Snack Choice Correct Grains": {
			      "start": 140,
			      "end": 143.01038548752834,
			      "loop": false
			    },
			    "Snack Choice Correct Protein": {
			      "start": 144,
			      "end": 147.12775510204082,
			      "loop": false
			    },
			    "Snack Choice Correct Vegetables": {
			      "start": 148,
			      "end": 150.91814058956916,
			      "loop": false
			    },
			    "Snack Choice Incorrect Dairy": {
			      "start": 151,
			      "end": 155.41074829931972,
			      "loop": false
			    },
			    "Snack Choice Incorrect Fruits": {
			      "start": 156,
			      "end": 160.45265306122448,
			      "loop": false
			    },
			    "Snack Choice Incorrect Grains": {
			      "start": 161,
			      "end": 165.5029931972789,
			      "loop": false
			    },
			    "Snack Choice Incorrect Protein": {
			      "start": 166,
			      "end": 170.49460317460318,
			      "loop": false
			    },
			    "Snack Choice Incorrect Vegetables": {
			      "start": 171,
			      "end": 175.51975056689344,
			      "loop": false
			    }
			}
		}
	}

}