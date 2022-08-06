const User = require("../models/user")

module.exports.renderRegisterForm = (req, res) => {
    res.render('registerForm.ejs')
}

module.exports.register = async(req, res, next) => {
    try {
        const { email, username, password, age, proffesion, name } = req.body
        const user = new User({ email, username, age, proffesion, name })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'welcome to GetCourses')
            res.redirect('/')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('loginForm.ejs')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back')
    res.redirect('/')

}


module.exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Successfully logged out')
        res.redirect('/');
    })

}

module.exports.viewAllUsers = async(req, res) => {
    const allUser = await User.find({})
    res.render('viewAllUser.ejs', { allUser })
}