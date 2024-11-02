const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('subscriptions/index.ejs', {
            subscriptions: currentUser.subscriptions,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('subscriptions/new.ejs');
});

router.get('/:subscriptionId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const subscription = currentUser.subscriptions.id(req.params.subscriptionId);
        res.render('subscriptions/show.ejs', {
            subscription: subscription,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.subscriptions.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/subscriptions`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:subscriptionId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const subscription = currentUser.subscriptions.id(req.params.subscriptionId);
        res.render('subscriptions/edit.ejs', {
            subscription: subscription,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:subscriptionId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const subscription = currentUser.subscriptions.id(req.params.subscriptionId);
        subscription.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/subscriptions/${req.params.subscriptionId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/:subscriptionId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.subscriptions.id(req.params.subscriptionId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/subscriptions`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;