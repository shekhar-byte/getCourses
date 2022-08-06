const Course = require('../models/course')
const User = require('../models/user')

module.exports.renderCourseForm = (req, res) => {
    res.render('course/createCourse.ejs')
}

module.exports.createCourse = async(req, res) => {
    const newCourse = new Course(req.body)
    await newCourse.save()
    req.flash('success', "New Course Created Sucessfully")
    res.redirect('/')
}

module.exports.showAllCourses = async(req, res) => {
    const allCourses = await Course.find({})
    res.render('course/allCourses.ejs', { allCourses })
}

module.exports.joinCourse = async(req, res) => {
    const { id } = req.params
    const course = await Course.findByIdAndUpdate(id)
    const activeUser = req.user

    const todaysDate = new Date()
    if (!req.user) {
        req.flash('error', 'Need to login first')
        res.redirect('/')
    } else if (course.users.indexOf(req.user.username) !== -1) {
        req.flash('error', 'User already Present')
        res.redirect('/allCourse')
    } else {
        const foundedUser = await User.findByIdAndUpdate(req.user.id)
        if (todaysDate > course.startDate && todaysDate < course.endDate) {
            foundedUser.courses.push(course.courseName)
            course.users.push(activeUser.username)
            course.save()
            foundedUser.save()
            req.flash('success', 'Successfully joined the course')
            res.redirect('/')
        } else if (todaysDate < course.startDate) {
            req.flash('error', 'Course has not been started yet')
            res.redirect('/allCourse')
        } else {
            req.flash('error', 'Course has been expired')
            res.redirect('/allCourse')
        }

    }
}