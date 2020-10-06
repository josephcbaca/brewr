module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [280]
        }
      }
    });
  
    Post.associate = function(models) {
      Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Post;
  };
  