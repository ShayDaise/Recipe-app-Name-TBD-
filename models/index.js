// imports all models
// import all models
const Recipe = require('./Recipe');
const User = require('./User');
const Likes = require('./Likes');
const Review = require('./Review');

// create associations
User.hasMany(Recipe, {
  foreignKey: 'user_id'
});

Recipe.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Recipe, {
  through: Likes,
  as: 'liked_recipes',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Recipe.belongsToMany(User, {
  through: Likes,
  as: 'liked_recipes',
  foreignKey: 'recipe_id',
  onDelete: 'SET NULL'
});

Likes.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Likes.belongsTo(Recipe, {
  foreignKey: 'recipe_id',
  onDelete: 'SET NULL'
});

User.hasMany(Likes, {
  foreignKey: 'user_id'
});

Recipe.hasMany(Likes, {
  foreignKey: 'recipe_id'
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Review.belongsTo(Recipe, {
  foreignKey: 'recipe_id',
  onDelete: 'SET NULL'
});

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Recipe.hasMany(Review, {
  foreignKey: 'recipe_id'
});


module.exports = { User, Recipe, Likes, Review };