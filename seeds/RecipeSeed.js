const { Recipe } = require("../models");

// title text user id

const userRecipe = [
  {
    title: "",
    recipe_text:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    user_id: 1,
  },
  {
    title: "",
    recipe_text:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    user_id: 2,
  },
  {
    title: "",
    recipe_text:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    user_id: 3,
  },
  {
    title: "",
    recipe_text: "",
    user_id: 4,
  },
  {
    title: "",
    recipe_text: "",
    user_id: 5,
  },
  {
    title: "",
    recipe_text: "",
    user_id: 6,
  },
  {
    title: "",
    recipe_text: "",
    user_id: 7,
  },
  {
    title: "",
    recipe_text: "",
    user_id: 8,
  },
  {
    title: "",
    recipe_text: "",
    user_id: 9,
  },
  {
    title: "",
    recipe_text: "",
    user_id: 10,
  },
];

const seedRecipe = function () {
  Recipe.bulkCreate(userRecipe);
};

// Export to sync it in the index.js
module.exports = seedRecipe;
