const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUserByUid,
  postNewUser,
  deleteUser,
  patchUserByUid,
} = require('../controllers/usersController');

const {
  getContactsByUid,
  postNewContactByUid,
  getContactByContactId,
  deleteContactByContactId,
  patchContactByContactId,
} = require('../controllers/contactsController');

usersRouter.route('/').get(getAllUsers).post(postNewUser);

usersRouter
  .route('/:uid')
  .get(getUserByUid)
  .patch(patchUserByUid)
  .delete(deleteUser);
usersRouter
  .route('/:uid/contacts')
  .get(getContactsByUid)
  .post(postNewContactByUid);

usersRouter
  .route('/:uid/contacts/:contact_id')
  .get(getContactByContactId)
  .patch(patchContactByContactId)
  .delete(deleteContactByContactId);

module.exports = usersRouter;
