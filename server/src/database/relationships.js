// required models
const Plan = require('../models/plan.model')
const Subscription = require('../models/subscription.model')
const User = require('../models/user.model')

// subscriptions One to many relationship with plans
Subscription.belongsTo(Plan, {
  foreignKey: {
    allowNull: false,
    defaultValue: 1
  }
})
Plan.hasMany(Subscription)

// users One to one relationship with Subscription table
Subscription.belongsTo(User, { onDelete: 'CASCADE', hooks: true })
User.hasOne(Subscription)
