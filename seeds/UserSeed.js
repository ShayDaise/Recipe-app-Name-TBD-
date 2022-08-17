// Seed the user table

const { User } = require("../models");

const userData = [
  {
    username: "John-1",
    email: "john-1@gmail.com",
    password: 1234,
  },
  {
    username: "Greg-1",
    email: "greg-1@gmail.com",
    password: 1234,
  },
  {
    username: "Mark-1",
    email: "Mark-1@gmail.com",
    password: 1234,
  },
  {
    username: "Bob-1",
    email: "bob-1@gmail.com",
    password: 1234,
  },
  {
    username: "Emily-1",
    email: "Emily-1@gmail.com",
    password: 1234,
  },
  {
    username: "Steve-1",
    email: "Steve-1@gmail.com",
    password: 1234,
  },
  {
    username: "Frank-1",
    email: "Frank-1@gmail.com",
    password: 1234,
  },
  {
    username: "Jenna-1",
    email: "Jenna-1@gmail.com",
    password: 1234,
  },
  {
    username: "Kyle-1",
    email: "Kyle-1@gmail.com",
    password: 1234,
  },
  {
    username: "Jack-1",
    email: "Jack-1@gmail.com",
    password: 1234,
  },
];

const seedUser = async function () {
  // await User.sync({ force: true });
  // ignoreduplicates
  User.bulkCreate(userData, { ignoreDuplicates: true });
};

// Export to sync it in the index.js
module.exports = seedUser;
