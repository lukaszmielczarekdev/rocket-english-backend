import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString("en-GB"),
  },
  lastLogged: {
    type: String,
    default: new Date().toLocaleDateString("en-GB"),
  },
  external: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  progress: {
    tour: false,
    exp: {
      type: Number,
      default: 0,
    },
    characterLvl: {
      type: Number,
      default: 0,
    },
    rocketLvl: {
      type: Number,
      default: 0,
    },
    movement: {
      maxMovePoints: {
        type: Number,
        default: 15,
      },
      currentMovePoints: {
        type: Number,
        default: 15,
      },
    },
    currentPlanet: {
      type: String,
      default: "menu",
    },
    mercenaries: {
      hired: {
        type: [String],
        default: [],
      },
      selected: {
        type: [String],
        default: [],
      },
      dead: {
        type: [String],
        default: [],
      },
      sent: {
        type: [String],
        default: [],
      },
    },
    inventory: {
      credits: {
        type: Number,
        default: 500,
      },
      word: {
        type: Number,
        default: 1,
      },
      stardust: {
        type: Number,
        default: 0,
      },
      steel: {
        type: Number,
        default: 0,
      },
      aluminum: {
        type: Number,
        default: 0,
      },
      crystal: {
        type: Number,
        default: 0,
      },
    },
    turnNumber: {
      type: Number,
      default: 0,
    },
    prices: {
      word: {
        type: Number,
        default: 450,
      },
      stardust: {
        type: Number,
        default: 5000,
      },
      steel: {
        type: Number,
        default: 3500,
      },
      aluminum: {
        type: Number,
        default: 4000,
      },
    },
    taskQueue: [Object],
    favorities: [Object],
    expeditions: [Object],
    planets: { available: [String], discovered: [String] },
    ufoDefeated: [String],
    trophiesCollected: [String],
    dialoguesCompleted: {
      crion: [Number],
      therion: [Number],
      crystalia: [Number],
      thalia: [Number],
      bathea: [Number],
      axios: [Number],
      desertia: [Number],
      xillon: [Number],
      centuria: [Number],
    },
    narration: {
      completed: {
        type: [String],
        default: [],
      },
      unlocked: {
        type: [String],
        default: [
          "crion",
          "therion",
          "crystalia",
          "thalia",
          "bathea",
          "axios",
          "desertia",
          "xillon",
          "centuria",
        ],
      },
    },

    vortexAccess: {
      type: Boolean,
      default: false,
    },
    gameFinished: {
      type: Boolean,
      default: false,
    },
    eventsHappened: {
      findTheCrew: {
        type: Number,
        default: 0,
      },
      helpScientists: {
        type: Number,
        default: 0,
      },
      winAWar: {
        type: Number,
        default: 0,
      },
      expeditions: {
        type: Number,
        default: 0,
      },
      wordsRevealed: {
        type: Number,
        default: 0,
      },
      fillTheGapsCompleted: {
        type: Number,
        default: 0,
      },
      ufoDefeated: {
        type: Number,
        default: 0,
      },
      getRobbed: {
        type: Number,
        default: 0,
      },
    },
  },
});

export default mongoose.model("User", userSchema);
