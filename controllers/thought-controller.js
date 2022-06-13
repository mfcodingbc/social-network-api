const { User, Thought } = require('../models');

const thoughtController = {
  // THOUGHT METHODS
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get a single Thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        // if no thought is found...
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!'});
        }
        // ...otherwise, retrieve thought data
        res.status(200).json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },

  // create new thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!'});
        }
        res.status(200).json(dbUserData);
      })
      .catch(err => {
        res.status(400).json(err);
      })
  },

  // update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!'});
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!'});
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  },

  // REACTION METHODS
  // add a new reaction to thought's reaction array field
  addReaction({ params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId},
      { $push: { reactions: body } },
      { new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!'});
      }
      res.status(200).json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  },

  // remove a Reaction from a thought's Reaction list
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;