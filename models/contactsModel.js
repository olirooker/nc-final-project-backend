const connection = require('../db/connection');
const { queryBuilder } = require('../db/connection');

const fetchContactsByUid = (req) => {
  const uid = req.params.uid;
  return connection
    .select('contacts.*')
    .from('contacts')
    .leftJoin('users', 'contacts.uid', '=', 'users.uid')
    .groupBy('contacts.contact_id')
    .where('users.uid', '=', uid)
    .then((contacts) => {
      return contacts;
    });
};
const sendNewContactByUid = (req) => {
  const uid = req.params.uid;
  const newContact = req.body.newContact;
  newContact.uid = uid;

  return connection
    .insert(newContact)
    .into('contacts')
    .returning('*')
    .then((contact) => {
      return contact[0];
    });
};

const fetchContactByContactId = (req) => {
  const uid = req.params.uid;
  const contact_id = req.params.contact_id;

  return connection
    .select('*')
    .from('contacts')
    .modify((queryBuilder) => {
      if (uid && contact_id) {
        queryBuilder.where('contacts.uid', '=', uid);
        queryBuilder.where('contacts.contact_id', '=', contact_id);
      }
    })
    .then((contact) => {
      if (contact.length === 0) {
        return Promise.reject({ status: 404, msg: 'Contact not found' });
      }

      return contact[0];
    });
};

const editContactByContactId = (req) => {
  const contact_id = req.params.contact_id;
  const newData = req.body.editContact;
  // newData.uid = uid

  return connection
    .select('*')
    .from('contacts')
    .where('contacts.contact_id', '=', contact_id)
    .update(newData)
    .returning('*')
    .then((contact) => {
      return contact[0];
    });
};

const removeContactByContactId = (req) => {
  const uid = req.params.uid;
  const contact_id = req.params.contact_id;
  return connection
    .del()
    .from('contacts')
    .where('contacts.contact_id', '=', contact_id)
    .then((delCount) => {
      if (delCount === 0) {
        return Promise.reject({ status: 404, msg: 'User not found' });
      } else {
        return 'deleted';
      }
    });
};
module.exports = {
  fetchContactsByUid,
  sendNewContactByUid,
  fetchContactByContactId,
  removeContactByContactId,
  editContactByContactId,
};
