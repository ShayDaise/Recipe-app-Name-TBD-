const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const recipeRoutes = require('./recipe-routes');
const reviewRoutes = require('./review-routes');


router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;