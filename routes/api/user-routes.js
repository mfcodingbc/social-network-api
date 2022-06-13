const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

// GET all and POST users at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// GET, PUT, and DELETE users at /api/users/:userId
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// POST friends at /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// POST and DELETE friends at /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;