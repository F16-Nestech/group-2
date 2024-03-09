const stripe = require('stripe')

exports.processPayment = async (req, res) => {
    const paymentIntent = await stripe.paymentIntent.create({
        amount: req.body.amount,
        currency: "vnd",
        automatic_payment_methods: {
            enabled: true,
        }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    })
}
