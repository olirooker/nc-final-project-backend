const connection = require('../db/connection');
const fetchAllUsers = () => {
  return connection
    .select('*')
    .from('users')
    .then((users) => {
      return users;
    });
};

const fetchUserByUid = (req) => {
  const uid = req.params.uid;
  return connection
    .select('*')
    .from('users')
    .where('uid', '=', uid)
    .then((user) => {
      if (user.length === 0) {
        return Promise.reject({ status: 404, msg: 'User not found' });
      }
      return user[0];
    });
};

const sendNewUser = (req) => {
  const newUser = req.body.newUser;
  return connection
    .insert(newUser)
    .into('users')
    .returning('*')
    .then((user) => {
      return user[0];
    });
};

editUserByUid = (req) => {
  const uid = req.params.uid;
  const newData = req.body.editUser;
  // newData.uid = uid

  return connection
    .select('*')
    .from('users')
    .where('users.uid', '=', uid)
    .update(newData)
    .returning('*')
    .then((user) => {
      return user[0];
    });
};

const removeUser = (req) => {
  const uid = req.params.uid;
  return connection
    .del()
    .from('users')
    .where('users.uid', '=', uid)
    .then((delCount) => {
      if (delCount === 0) {
        return Promise.reject({ status: 404, msg: 'User not found' });
      } else {
        return 'deleted';
      }
    });
};

// const updateUser = (req) => {
//   const uid = req.params;
//   const whatDoWeWantToUpdate = req.body;

//   return connection.select().from("users").where("uid", "=", uid);
//   // select columns
//   // from users table
//   // modify if first name, if last name, etc... data to update
// };

module.exports = {
  fetchAllUsers,
  fetchUserByUid,
  sendNewUser,
  removeUser,
  editUserByUid,
};
