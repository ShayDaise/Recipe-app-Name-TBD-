// Seed the user table

const { User } = require("../models");

const userData = [
  {
    username: "Joh",
    email: "joh@gmail.com",
    password: 123,
  },
  {
    username: "Tom",
    email: "tom@gmail.com",
    password: 123,
  },
  {
    username: "Lee",
    email: "lee@gmail.com",
    password: 123,
  },
  {
    username: "Bob",
    email: "bob@gmail.com",
    password: 123,
  },
  {
    username: "Vanessa",
    email: "vanessa@gmail.com",
    password: 123,
  },
];

const seedUser = function () {
  User.bulkCreate(userData);
};

// Export to sync it in the index.js
module.exports = seedUser;
