const fetchAllEndpoints = (req) => {
  const endpoints = {
    endpoints: {
      "/api": {
        methods: {
          GET: "get all endpoints in API",
        },
        "/users": {
          methods: {
            GET: "get all users",
            POST: {
              does: "post a new user",
              requestBody: {
                newUser: {
                  first_name: "firstname",
                  last_name: "lastname",
                  username: "username",
                  phone_number: "00000000000",
                  house_number: 0,
                  street_name: "street name",
                  postcode: "post code",
                  city: "city",
                  uid: "firebaseuid",
                },
              },
            },
          },
          "/users/:uid": {
            methods: {
              GET: "get users by uid (/users/string)",
              PATCH: {
                does: "patch an existing user",
                requestBody: {
                  editUser: {
                    first_name: "firstname",
                    last_name: "lastname",
                    username: "username",
                    phone_number: "00000000000",
                    house_number: 0,
                    street_name: "street name",
                    postcode: "post code",
                    city: "city",
                  },
                },
              },
              DELETE: "delete user by uid (/users/string)",
            },
          },
          "/users/:uid/contacts": {
            methods: {
              GET: "get all contacts for user by uid (/users/string/contacts)",
              POST: {
                does: "post a new contact to an existing user",
                requestBody: {
                  newContact: {
                    first_name: "jeff",
                    last_name: "chips",
                    phone_number: "666",
                    relationship_user: "lad",
                    house_number: 1,
                    street_name: "your mas house",
                    postcode: "M1 1Lad",
                    city: "ladchester",
                  },
                },
              },
            },
          },
          "/users/:uid/contacts/contact_id": {
            methods: {
              GET:
                "get individual contact for user by uid and contact_id (/users/string/contacts/integer)",
              PATCH: {
                does: "post a new contact to an existing user",
                requestBody: {
                  newContact: {
                    contact_id: 0,
                    first_name: "jeff",
                    last_name: "chips",
                    phone_number: "666",
                    relationship_user: "lad",
                    house_number: 1,
                    street_name: "your mas house",
                    postcode: "M1 1Lad",
                    city: "ladchester",
                  },
                },
              },
              DELETE:
                "deletes the contact for user by uid and contact_id (/users/string/contacts/integer)",
            },
          },
        },
      },
    },
  };
  return endpoints;
};
module.exports = { fetchAllEndpoints };
