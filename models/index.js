// imports all models
const Recipe = require('./Recipe');
const User = require('./User');
const Like = require('./Like');
const Review = require('./Review');

// create associations
//users can have many recipes under them
User.hasMany(Recipe, {
    foreignKey: 'user_id'
  });
  
  //recipes belong to a single user on creation
  Recipe.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  //associates user to recipes through likes
  User.belongsToMany(Recipe, {
    through: Like,
    as: 'liked_recipes',
  
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  //associates recipes to users through likes
  Recipe.belongsToMany(User, {
    through: Like,
    as: 'liked_recipes',
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
  });
  
  //sets a users id to the like to identify who liked
  Like.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  //makes it so that each user gets one like per post
  Like.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
  });
  
  //users can leave likes
  User.hasMany(Like, {
    foreignKey: 'user_id'
  });
  
  //each recipe can have multiple likes
  Recipe.hasMany(Like, {
    foreignKey: 'recipe_id'
  });
  
  //associates a review with a user
  Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  //allows reviews to be put on recipes
  Review.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'SET NULL'
  });
  
  //users can leave reviews on posts
  User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
  //recipes can have multiple reviews
  Recipe.hasMany(Review, {
    foreignKey: 'recipe_id'
  });





module.exports = { User, Recipe, Like, Review };