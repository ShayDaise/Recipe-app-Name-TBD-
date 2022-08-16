const { Likes } = require("../models");

const seedLikes = function () {
  Review.bulkCreate(reviewData);
};

// Export to sync it in the index.js
module.exports = seedLikes;
