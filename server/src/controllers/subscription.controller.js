// required packages
const config = require('../config')

// required services
const subscriptionService = new (require('../services/subscription.service'))()

module.exports = class SubscriptionController {
  async index (req, res) {
    const plans = await subscriptionService.getAllPlans()
    return res.render('user/plans', { plans, title: 'Plans' })
  }

  async subscribe (req, res) {
    const id = req.params.id
    const plan = await subscriptionService.getPlanById(id)

    if (!plan) {
      req.flash('error', 'Plan not found')
    }

    const { isSuccess, error, sessionId } = await subscriptionService.subscribeUserToPlan({ user: req.user, plan })

    if (isSuccess) {
      return res.render('general/wait', { sessionId })
    } else {
      req.flash(error.type, error.message)
    }

    return res.redirect('/plans')
  }

  async hook (req, res) {
    const secret = config.stripe.secret
    const sig = req.headers['stripe-signature']
    const bodyData = req.rawBody
    try {
      await subscriptionService.completeSubscriptionHook({ secret, sig, bodyData })
    } catch (err) {
      return res.status(400)
    }
    return res.sendStatus(200)
  }
}
