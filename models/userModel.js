import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  progress: {
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
    ufoDefeated: [String],
    trophiesCollected: [Number],
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
      menu: {
        completed: {
          type: Boolean,
          default: false,
        },
        unlocked: {
          type: Boolean,
          default: false,
        },
      },
      crion: {
        completed: {
          type: Boolean,
          default: false,
        },
        unlocked: {
          type: Boolean,
          default: true,
        },
      },
      therion: {
        completed: {
          type: Boolean,
          default: false,
        },
        unlocked: {
          type: Boolean,
          default: true,
        },
      },
      crystalia: {
        completed: {
          type: Boolean,
          default: false,
        },
        unlocked: {
          type: Boolean,
          default: true,
        },
      },
      thalia: {
        completed: {
          type: Boolean,
          default: false,
        },
        unlocked: {
          type: Boolean,
          default: true,
        },
      },
      bathea: {
        completed: {
          type: Boolean,
          default: false,
        },
        unlocked: {
          type: Boolean,
          default: true,
        },
      },
      axios: {
        completed: {
          type: Boolean,
          default: false,
        },
        unlocked: {
          type: Boolean,
          default: true,
        },
      },
      desertia: {
        completed: {
          type: Boolean,
          default: false,
        },
        unlocked: {
          type: Boolean,
          default: true,
        },
      },
      xillon: {
        completed: {
          type: Boolean,
          default: false,
        },
        unlocked: {
          type: Boolean,
          default: true,
        },
      },
      centuria: {
        completed: {
          type: Boolean,
          default: false,
        },
        unlocked: {
          type: Boolean,
          default: true,
        },
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
  newsletter: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
