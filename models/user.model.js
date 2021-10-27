const Sequelize = require("sequelize");
const sequelizeClient = require("../database/sequelize");
const bcrypt = require("bcrypt");

const User = sequelizeClient.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  username: { type: Sequelize.STRING, unique: true },
  email: { type: Sequelize.STRING, unique: true },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("password");
    },
  },
  firstname: { type: Sequelize.STRING },
  lastname: { type: Sequelize.STRING },
  resetToken: { type: Sequelize.STRING },
  isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false },
});


//inject useful methods to user model

//method to valid password hash used when login user
User.prototype.validPassword = function (password) {
  return bcrypt.compare(password, this.password());
};
//method to hash password before user stored used when Register user
User.beforeCreate(async (user, options) => {
  hashedPassword = await bcrypt.hash(user.password(), 12);
  user.password = hashedPassword;
});
//method to hash password before user updated used when change/reset password
User.beforeUpdate(async (user, options) => {
  if (user.changed("password")) {
    hashedPassword = await bcrypt.hash(user.password(), 12);
    user.password = hashedPassword;
  }
});



module.exports = User;
