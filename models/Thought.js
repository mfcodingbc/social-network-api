const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    // a custom id to avoid confusion with parent `thought _id`
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: 'Enter in your reaction'
    },
    username: {
      type: String,
      required: 'Enter your username so others know who reacted.'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: `Please let others know what's on your mind.`,
      validate: [({ length }) => length >= 1],
      validate: [({ length }) => length <= 280, `You've got a lot on your mind, but please shorten your thought.`]
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: 'Please let others know who made this thought.'
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of reactions to thought
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;