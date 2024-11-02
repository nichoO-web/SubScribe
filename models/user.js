const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    logo: { type: String, required: true },
    name: { type: String, required: true },
    paymentAmount: { type: String, required: true },
    billingCycle: { type: String, required: true },
    renewalDate: { type: String, required: true },
    type: {
        type: String,
        enum: ['Content', 'Goods', 'Software', 'Memberships'],
        required: true,
    }
});

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    subscriptions: [subscriptionSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;