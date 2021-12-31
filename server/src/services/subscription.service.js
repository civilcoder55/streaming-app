// required packages
const config = require("../config");
const stripeClient = require("../utils/stripe.util")

// required models
const Plan = require("../models/plan.model")


module.exports = class SubscriptionService {

    async getAllPlans() {
        return await Plan.findAll({ raw: true });
    }

    async getPlanById(id) {
        return await Plan.findOne({ raw: true, where: { id } });
    }

    async subscribeUserToPlan({ user, plan }) {
        let amount = plan.price * 100

        if (user.subscription.plan.id == plan.id) {
            return { error: { type: "warning", message: `You already subscribed to ${plan.type} Package` } }
        } else if (user.subscription.plan.rank > plan.rank) {
            return { error: { type: "error", message: `You can't downgrade your Package` } }
        } else if (user.subscription.plan.rank < plan.rank && user.subscription.plan.rank != 0) {
            const dayCost = +(plan.price / 30).toFixed(4)
            const remainingDays = Math.floor((+user.subscription.end - Date.now()) / (1000 * 60 * 60 * 24))
            const discount = +(dayCost * remainingDays).toFixed(2)
            amount = (plan.price - discount) * 100
        }

        const session = await stripeClient.checkout.sessions.create({
            customer_email: user.email,
            payment_method_types: ["card"],
            line_items: [
                {
                    name: plan.type + " Package",
                    amount,
                    currency: "usd",
                    quantity: 1,
                },
            ],
            metadata: {
                customer: user.id,
                plan: plan.id,
            },
            success_url: config.stripe.success_url,
            cancel_url: config.stripe.cancel_url
        });

        return { isSuccess: true, session }
    }


    async completeSubscriptionHook({ secret, sig, bodyData }) {
        try {
            const event = stripeClient.webhooks.constructEvent(bodyData, sig, secret);
            if (event.type === "checkout.session.completed") {
                const metadata = event.data.object.metadata;
                const now = new Date();
                await Subscription.update(
                    { planId: metadata.plan, start: now, end: new Date(now.setMonth(now.getMonth() + 1)) },
                    { where: { userId: metadata.customer } }
                );
            }
        } catch (err) {
            throw new Error()
        }
    }
}