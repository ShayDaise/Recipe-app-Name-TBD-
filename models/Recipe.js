const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// creates our Recipe model
class Recipe extends Model {
  static addlike(body, models) {
    return models.Like.create({
      user_id: body.user_id,
      recipe_id: body.recipe_id
    }).then(() => {
      return Recipe.findOne({
        where: {
          id: body.recipe_id
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
            model: models.Review,
            attributes: ['id', 'review_text', 'recipe_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}

// create fields/columns for Recipe model
Recipe.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipe_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    recipe_ingredients: {
        // type: DataTypes.ARRAY,
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe'
  }
);

module.exports = Recipe;