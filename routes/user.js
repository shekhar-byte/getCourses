const express = require('express')
const passport = require('passport')
const router = express.Router()
const users = require('../controller/user')

router.route('/register')
    .get(users.renderRegisterForm)
    .post(users.register)

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

router.get('/users', users.viewAllUsers)

module.exports = router