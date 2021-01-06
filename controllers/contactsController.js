const {
  fetchContactsByUid,
  sendNewContactByUid,
  fetchContactByContactId,
  removeContactByContactId,
  editContactByContactId,
} = require('../models/contactsModel.js');

const getContactsByUid = (req, res, next) => {
  fetchContactsByUid(req)
    .then((contacts) => {
      res.status(200).send({ contacts });
    })
    .catch(next);
};

const postNewContactByUid = (req, res, next) => {
  sendNewContactByUid(req)
    .then((contact) => {
      res.status(201).send({ newContact: contact });
    })
    .catch(next);
};

const getContactByContactId = (req, res, next) => {
  fetchContactByContactId(req)
    .then((contact) => {
      res.status(200).send({ contact });
    })
    .catch(next);
};

const patchContactByContactId = (req, res, next) => {
  editContactByContactId(req)
    .then((contact) => {
      res.status(202).send({ editedContact: contact });
    })
    .catch(next);
};

const deleteContactByContactId = (req, res, next) => {
  removeContactByContactId(req)
    .then((response) => {
      if (response === 'deleted') {
        res.sendStatus(204);
      }
    })
    .catch(next);
};
module.exports = {
  getContactsByUid,
  postNewContactByUid,
  getContactByContactId,
  deleteContactByContactId,
  patchContactByContactId,
};
