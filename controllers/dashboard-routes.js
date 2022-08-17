const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Review, Likes } = require('../models');
const withAuth = require('../utils/auth');

// get all recipes for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Recipe.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'recipe_desc',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE recipe.id = likes.recipe_id)'), 'likes_count']
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
      const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
      res.render('dashboard', { recipes, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Recipe.findByPk(req.params.id, {
    attributes: [
      'id',
      'recipe_desc',
      'recipe_text',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE recipe.id = likes.recipe_id)'), 'likes_count']
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
      if (dbRecipeData) {
        const recipe = dbRecipeData.get({ plain: true });
        
        res.render('edit-recipe', {
          recipe,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;