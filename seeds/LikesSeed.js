const { Likes } = require("../models");

const userLikes = [
  {
    user_id: 1,
    recipe_id: 1,
  },
  {
    user_id: 2,
    recipe_id: 2,
  },
  {
    user_id: 3,
    recipe_id: 3,
  },
  {
    user_id: 4,
    recipe_id: 4,
  },
  {
    user_id: 5,
    recipe_id: 5,
  },
  {
    user_id: 6,
    recipe_id: 6,
  },
  {
    user_id: 7,
    recipe_id: 7,
  },
  {
    user_id: 8,
    recipe_id: 8,
  },
  {
    user_id: 9,
    recipe_id: 9,
  },
  {
    user_id: 10,
    recipe_id: 10,
  },
];
const seedLikes = function () {
  Likes.bulkCreate(userLikes);
};

// Export to sync it in the index.js
module.exports = seedLikes;
