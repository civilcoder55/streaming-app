// required packages 
const Sequelize = require("sequelize");
const sequelizeClient = require("../database/sequelize");
const bcrypt = require("bcrypt");


// required models
const Subscription = require("./subscription.model");
const Plan = require("./plan.model");



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




// inject method to valid password hash used when login user
User.prototype.validPassword = function (password) {
  return bcrypt.compare(password, this.password());
};



// model hooks 


//method to hash password before user stored used when Register user
User.beforeCreate(async (user, options) => {
  hashedPassword = await bcrypt.hash(user.password(), 12);
  user.password = hashedPassword;
});


//create free subscription to user by default
User.afterCreate(async (user, options) => {
  const freePlan = await Plan.findOne({ where: { rank: 0 } });// consider free plan always ranked 0 
  const freeSub = await Subscription.create({ paid: "0", planId: freePlan.id });
  freeSub.setUser(user);
})


//method to hash password before user updated used when change/reset password
User.beforeUpdate(async (user, options) => {
  if (user.changed("password")) {
    hashedPassword = await bcrypt.hash(user.password(), 12);
    user.password = hashedPassword;
  }
});



module.exports = User;
