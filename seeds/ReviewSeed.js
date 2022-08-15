const { Review } = require("../models");
const reviewData = [
  {
    user_id: 1,
    post_id: 3,
  },
];

const seedReview = function () {
  Review.bulkCreate(reviewData);
};

// Export to sync it in the index.js
module.exports = seedReview;
