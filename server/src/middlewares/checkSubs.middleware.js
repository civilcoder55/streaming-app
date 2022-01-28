// required models
const Subscription = require('../models/subscription.model')
const Plan = require('../models/plan.model')

module.exports = async function (req, res, next) {
  if (req.isAuthenticated()) {
    const today = new Date()
    if (req?.user?.subscription?.end && req.user.subscription.end < today) {
      const plan = await Plan.findOne({ raw: true, where: { price: 0 } })
      await Subscription.update({ planId: plan.id, end: null }, { where: { userId: req.user.id } })
    }
  }
  next()
}
