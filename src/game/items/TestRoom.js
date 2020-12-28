
const WEAPONS = {
	FISTS: "fists",
	KNIFE: "knife",
	SWORD: "sword",
	GUN: "gun",
};

const PROTECTION = {
   WEARABLES : {
		 PIERCING_VEST : "stab-proof vest",
		 SLASHING_VEST : "slash-proof vest",
	   BALLISTIC_VEST : "bullet-proof vest",
  },
}

const DOCUMENTS = { 

 };

const CONSUMABLES = { 

 };

const DAMAGE_TYPES = {
	BLUNT: "blunt",
	PIERCING: "piercing",
	SLASHING: "slashing",
	BALLISTIC: "ballistic",
};

const ITEM_LIST = {
	weapons: {
		fists: {
			name: WEAPONS.FISTS,
			damage: "2",
			damage_value: 2,
			damage_type: DAMAGE_TYPES.BLUNT,
		},
		knife: {
			name: WEAPONS.KNIFE,
			damage: "4",
			damage_value: 4,
			damage_type: DAMAGE_TYPES.PIERCING,
		},
		sword: {
			name: WEAPONS.SWORD,
			damage: "6",
			damage_value: 6,
			damage_type: DAMAGE_TYPES.SLASHING,
		},
		gun: {
			name: WEAPONS.GUN,
			damage: "10",
			damage_value: 10,
			damage_type: DAMAGE_TYPES.BALLISTIC,
		},
	},

	protection: {
    piercing_vest : {
      name : PROTECTION.WEARABLES.PIERCING, uses : 1, damage_type : DAMAGE_TYPES.PIERCING 
    },
    slashing_vest : {
      name : PROTECTION.WEARABLES.SLASHING, uses : 1, damage_type : DAMAGE_TYPES.SLASHING 
    },
    ballistic_vest: {
      name : PROTECTION.WEARABLES.BALLISTIC, uses : 1, damage_type : DAMAGE_TYPES.BALLISTIC 
    },
  },

	documents: {},

	consumables: {},
};

const FLOORS = {
	FLOOR_ONE:{name : "1st Floor", rooms : },
	FLOOR_TWO: "2nd Floor",
	FLOOR_THREE: "3rd Floor",
};

const ROOMS = {};
