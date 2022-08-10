const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Review, Like } = require('../models');

// get all posts for homepage sorted by most liked
router.get('/', (req, res) => {
    console.log('======================');
    Recipe.findAll({
      attributes: [
        'id',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM like WHERE recipe.id = like.recipe_id)'), 'like_count']
      ],
      include: [
        {
          model: Review,
          attributes: ['id', 'review_text', 'recipe_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbRecipeData => {
        const recipes = dbRecipeData.map(recipes => recipes.get({ plain: true }));
  
        res.render('homepage', {
          recipes,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // get single recipe
  router.get('/recipe/:id', (req, res) => {
    Recipe.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'recipe_text',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM like WHERE recipe.id = like.recipe_id)'), 'like_count']
      ],
      include: [
        {
          model: Review,
          attributes: ['id', 'review_text', 'recipe_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbRecipeData => {
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipe found with this id' });
          return;
        }
  
        const recipe = dbRecipeData.get({ plain: true });
  
        res.render('single-recipe', {
          recipe,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;