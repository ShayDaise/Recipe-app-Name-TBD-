const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Recipe, User, Review, Likes } = require('../../models');
const withAuth = require('../../utils/auth');

// get all recipes
router.get('/', (req, res) => {
    console.log('======================');
    Recipe.findAll({
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
      .then(dbRecipeData => res.json(dbRecipeData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/:id', (req, res) => {
    Recipe.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'recipe_text',
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
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipe found with this id' });
          return;
        }
        res.json(dbRecipeData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.post('/', withAuth, (req, res) => {
    // expects {title: 'Grandma's cookies', recipe_text: 'best cookies ever', user_id: 1}
    Recipe.create({
      title: req.body.title,
      recipe_desc: req.body.recipe_desc,
      recipe_text: req.body.recipe_text,
      recipe_desc: req.body.recipe_desc,
      user_id: req.session.user_id
    })
      .then(dbRecipeData => res.json(dbRecipeData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.put('/addlike', withAuth, (req, res) => {
    // custom static method created in models/Post.js
    Recipe.addlike({ ...req.body, user_id: req.session.user_id }, { Likes, Review, User })
      .then(updatedLikesData =>{ res.json(updatedLikesData)
      console.log(updatedLikesData) })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.put('/:id', withAuth, (req, res) => {
    Recipe.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbRecipeData => {
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipe found with this id' });
          return;
        }
        res.json(dbRecipeData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Recipe.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbRecipeData => {
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipe found with this id' });
          return;
        }
        res.json(dbRecipeData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;