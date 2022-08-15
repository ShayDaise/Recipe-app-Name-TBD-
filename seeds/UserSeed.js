// Seed the user table

const { User } = require("../models");

const userData = [
  {
    username: "John",
    email: "john@gmail.com",
    password: 123,
  },
  {
    username: "Tom",
    email: "tom@gmail.com",
    password: 123,
  },
  {
    username: "Mark",
    email: "Mark@gmail.com",
    password: 123,
  },
  {
    username: "Bob",
    email: "bob@gmail.com",
    password: 123,
  },
  {
    username: "Emily",
    email: "Emily@gmail.com",
    password: 123,
  },
  {
    username: "Steve",
    email: "Steve@gmail.com",
    password: 123,
  },
  {
    username: "Frank",
    email: "Frank@gmail.com",
    password: 123,
  },
  {
    username: "Jenna",
    email: "Jenna@gmail.com",
    password: 123,
  },
  {
    username: "Kyle",
    email: "Kyle@gmail.com",
    password: 123,
  },
  {
    username: "Jack",
    email: "Jack@gmail.com",
    password: 123,
  },
];

const seedUser = function () {
  User.bulkCreate(userData);
};

// Export to sync it in the index.js
module.exports = seedUser;
