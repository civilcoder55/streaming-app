// required models
const Plan = require('../models/plan.model')

const plans = [
  { type: 'Basic', price: 0, rank: 0 },
  { type: 'Premium', price: 20, rank: 1 },
  { type: 'Cinematic', price: 40, rank: 2 }
]

module.exports = function () {
  plans.forEach(plan => {
    Plan.findOrCreate({
      where: {
        type: plan.type
      },
      defaults: { ...plan }
    })
  })
}
