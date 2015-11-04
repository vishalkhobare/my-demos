var currentVideoStartTiming,currentVideoEndTiming;
var planeRotationRadiusinm=100;
var civilianPlaneRequestForAirstripForLanding=false;

var youTubeQueueObj;
var planeTypes = {
    "Sukhoi33": {
        image: "images/su33.png",
        afterburnwersimage: "images/su33afterburners.png",
        parkingWidth: 25,
        info: "images/Sukhoi_Su-30_inflight.jpg",
        flyWidth: 50,
		landingMessage:"<span class='warning'>Be advised, a Sukhoi 30 is returning to the base shortly.</span>",
		startedLandingMessage:"<span class='warning'>Be advised, a Sukhoi 30 is using airstrip for landing. Clear airstrip immediately.</span>",
		takeOffMessage:"<span class='warning'>Be advised, a Sukhoi 30 will take off shortly. Keep airstrip clear.</span>",
        flightPreparationYoutube: [
            {
                "link": "Vf6_vOND4gc",
                startTime: 0,
                endTime: 50
            }, {
                "link": "L2tzV9xtjM0",
                startTime: 0,
                endTime: 30
            }, {
                "link": "w4DCxJ8bEFg",
                startTime: 0,
                endTime: 90
            }, {
                "link": "w4DCxJ8bEFg",
                startTime: 270,
                endTime: 318
            }, {
                "link": "g9By6bPn3DM",
                startTime: 70,
                endTime: 120
            }, {
                "link": "d4lE6HcBPxw",
                startTime: 95,
                endTime: 190
            }, {
                "link": "iHsoo9B029o",
                startTime: 210,
                endTime: 320
            }, {
                "link": "gb-66a8ILyc",
                startTime: 100,
                endTime: 240
            }, {
                "link": "fPdnRmbcy_0",
                startTime: 0,
                endTime: 50
            }, {
                "link": "flhmRmro0o8",
                startTime: 5,
                endTime: 25
            }, {
                "link": "flhmRmro0o8",
                startTime: 5,
                endTime: 25
            }
        ],
        landingYoutube: [{
            "link": "d4lE6HcBPxw",
            startTime: 310,
            endTime: 400
        }, {
            "link": "ez34sKSye3Q",
            startTime: 20,
            endTime: 110
        }, {
            "link": "fPdnRmbcy_0",
            startTime: 424,
            endTime: 490
        }, {
            "link": "gb-66a8ILyc",
            startTime: 510,
            endTime: 590
        }, {
            "link": "gb-66a8ILyc",
            startTime: 510,
            endTime: 590
        }, {
            "link": "3q-1s-7hJqA",
            startTime: 174,
            endTime: 190
        }, {
            "link": "iHsoo9B029o",
            startTime: 732,
            endTime: 840
        }, {
            "link": "iHsoo9B029o",
            startTime: 732,
            endTime: 840
        }]

    },
    "passengerPlane": {
        image: "images/tanker.png",
        afterburnwersimage: "images/tanker.png",
        info: "images/Airbus_A380_blue_sky.jpg",
        parkingWidth: 40,
        flyWidth: 80,
		landingMessage:"A flight will be ready shortly to land.",
		startedLandingMessage:"The flight is descending for landing. Please clear airstrip.",
		takeOffMessage:"Started take-off...",
        flightPreparationYoutube: [{
                "link": "vi_6zkIl-EU",
                startTime: 125,
                endTime: 180
            },{
                "link": "vi_6zkIl-EU",
                startTime: 125,
                endTime: 180
            }/*, {
                "link": "BVeC5bVBcic",
                startTime: 54,
                endTime: 80
            }, {
                "link": "Ii0nUcm24Jw",
                startTime: 75,
                endTime: 120
            },  
			{
                "link": "UEbb0vSAEJs",
                startTime: 30,
                endTime: 50
            },{
                "link": "MKkQiKHeTgU",
                startTime: 105,
                endTime: 130
            }, {
                "link": "MKkQiKHeTgU",
                startTime: 105,
                endTime: 130
            }*/
			
			//

        ],
        landingYoutube: [{
                "link": "la-hSjKP2TU",
                startTime: 4,
                endTime: 50
            }, {
                "link": "aUnNXLzotBY",
                startTime: 12,
                endTime: 25
            }, {
                "link": "aUnNXLzotBY",
                startTime: 56,
                endTime: 77
            }, {
                "link": "aUnNXLzotBY",
                startTime: 56,
                endTime: 77
            }


        ]
    }/*,
    "f18": {
        image: "images/f18.png",
        parkingWidth: 25,
        flyWidth: 50
    },
    "f22": {
        image: "images/f22u.png",
        parkingWidth: 25,
        flyWidth: 50
    }*/
}

var fightersParkingSlots = {
    0: {
        parkingDot: 22,
        occupant: null,
        takeoffpath: [23, 1, 2, 24, 0, 1],
        parkingpath: [1, 2, 21, 22], // starts from path point 1
		
    },
    1: {
        parkingDot: 19,
        occupant: null,
        takeoffpath: [20, 1, 2, 24, 0, 1],
        parkingpath: [1, 2, 18, 19]
    },
    2: {
        parkingDot: 16,
        occupant: null,
        takeoffpath: [17, 1, 2, 24, 0, 1],
        parkingpath: [1, 2, 15, 16]
    },
    3: {
        parkingDot: 13,
        occupant: null,
        takeoffpath: [14, 1, 2, 24, 0, 1],
        parkingpath: [1, 2, 12, 13]
    },
    4: {
        parkingDot: 10,
        occupant: null,
        takeoffpath: [11, 1, 2, 24, 0, 1],
        parkingpath: [1, 2, 9, 10]
    },
    5: {
        parkingDot: 7,
        occupant: null,
        takeoffpath: [8, 1, 2, 24, 0, 1],
        parkingpath: [1, 2, 6, 7]
    },
    6: {
        parkingDot: 4,
        occupant: null,
        takeoffpath: [5, 1, 2, 24, 0, 1],
        parkingpath: [1, 2, 3, 4]
    }
}
/*var fightersParkingSlots1={
	0:{
		parkingDot:27,
		occupant:null,
		takeoffpath:[23,1,2,24,0],
		parkingpath:[45,26,27]
	},
	1:{
		parkingDot:40,
		occupant:null,
		takeoffpath:[20,1,2,24,0],
		parkingpath:[45,28,40]
	},
	2:{
		parkingDot:29,
		occupant:null,
		takeoffpath:[17,1,2,24,0],
		parkingpath:[45,30,29]
	},
	3:{
		parkingDot:31,
		occupant:null,
		takeoffpath:[14,1,2,24,0],
		parkingpath:[45,32,31]
	},
	4:{
		parkingDot:33,
		occupant:null,
		takeoffpath:[11,1,2,24,0],
		parkingpath:[45,34,33]
	},
	5:{
		occupant:null,
		parkingDot:35,
		takeoffpath:[8,1,2,24,0],
		parkingpath:[45,36,35]
	},
	6:{		
		occupant:null,
		parkingDot:39,
		takeoffpath:[5,1,2,24,0],
		parkingpath:[45,38,39]
	}
}*/

var passengerParkingSlots = {
    0: {
        parkingDot: 40,
        occupant: null,
        initialRotation: 180,
        takeoffpath: [20, 1, 2, 24, 0, 1],
        parkingpath: [1, 45, 28, 40],name:"AI 120"
    },
    1: {
        parkingDot: 35,
        occupant: null,
        initialRotation: 180,
        takeoffpath: [8, 1, 2, 24, 0, 1],
        parkingpath: [1, 45, 36, 35],name:"LH 750"
    },
    2: {
        parkingDot: 32,
        occupant: null,
        initialRotation: 180,
        takeoffpath: [14, 1, 2, 24, 0, 1],
        parkingpath: [1, 45, 31, 32],name:"UA 120"
    }
}

var pathPoints = {
    0: {
        x: 55,
        y: 150
    },
    1: {
        x: 345,
        y: 150
    },
    2: {
        x: 345,
        y: 55
    },
    3: {
        x: 285,
        y: 55
    },
    4: {
        x: 285,
        y: 100
    },
    5: {
        x: 285,
        y: 150
    },
    6: {
        x: 255,
        y: 55
    },
    7: {
        x: 255,
        y: 100
    },
    8: {
        x: 255,
        y: 150
    },
    9: {
        x: 225,
        y: 55
    },
    10: {
        x: 225,
        y: 100
    },
    11: {
        x: 225,
        y: 150
    },
    12: {
        x: 195,
        y: 55
    },
    13: {
        x: 195,
        y: 100
    },
    14: {
        x: 195,
        y: 150
    },
    15: {
        x: 165,
        y: 55
    },
    16: {
        x: 165,
        y: 100
    },
    17: {
        x: 165,
        y: 150
    },
    18: {
        x: 135,
        y: 55
    },
    19: {
        x: 135,
        y: 100
    },
    20: {
        x: 135,
        y: 150
    },
    21: {
        x: 105,
        y: 55
    },
    22: {
        x: 105,
        y: 100
    },
    23: {
        x: 105,
        y: 150
    },
    24: {
        x: 55,
        y: 55
    },
    25: {
        x: 55,
        y: 275
    },
    /*26:{
		x:105,
		y:250
	},
	27:{
		x:105,
		y:195
	},*/
    28: {
        x: 135,
        y: 275
    },
    /*29:{
		x:165,
		y:195
	},
	30:{
		x:165,
		y:250
	},*/
    31: {
        x: 195,
        y: 275
    },
    32: {
        x: 195,
        y: 215
    },
    /*33:{
		x:225,
		y:215
	},
	34:{
		x:225,
		y:275
	},*/
    35: {
        x: 255,
        y: 215
    },
    36: {
        x: 255,
        y: 275
    },
    /*37:{
		x:285,
		y:195
	},
	/*38:{
		x:285,
		y:250
	},
	39:{
		x:285,
		y:195
	},*/
    40: {
        x: 135,
        y: 215
    },
    /*41:{
		x:105,
		y:310
	},
	42:{
		x:165,
		y:310
	},
	43:{
		x:225,
		y:310
	},
	44:{
		x:285,
		y:310
	},*/
    45: {
        x: 345,
        y: 275
    }
}