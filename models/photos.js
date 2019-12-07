'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photos = sequelize.define('Photos', {
    originalPhotoUrl: DataTypes.STRING,
    transformedPhotoUrl: DataTypes.STRING,
    datePrinted: DataTypes.DATE,
    dateTransformed: DataTypes.DATE
  }, {});
  Photos.associate = function(models) {
    // associations can be defined here
  };
  return Photos;
};