'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photos = sequelize.define('Photos', {
    originalPhotoUrl: DataTypes.STRING
  }, {});
  Photos.associate = function(models) {
    // associations can be defined here
  };
  return Photos;
};