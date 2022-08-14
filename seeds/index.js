const seedUser = require("../seeds/UserSeed");
const seedLikes = require("../seeds/LikesSeed");
const seedRecipe = require("../seeds/RecipeSeed");
const seedReview = require("../seeds/ReviewSeed");

const sequelize = require("../config/connection");

const seedAll = () => {
  // This is to handle the referencing problem
  //  when inserting records to tables
  sequelize.sync({ force: true });
  console.log("Seeding user ");
  seedUser();
};

seedAll();
