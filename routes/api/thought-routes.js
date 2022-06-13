const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// GET all thoughts at /api/thoughts
router.route('/').get(getAllThoughts);

// POST thoughts at /api/thoughts/:userId
router.route('/:userId').post(createThought);

// GET and PUT thoughts at /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById)

// PUT and DELETE thoughts at /api/thoughts/:userId/:thoughtId
router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(deleteThought);

// POST reactions at /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// DELETE reactions at /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;