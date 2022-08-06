const express = require('express')
const router = express.Router()
const courses = require('../controller/course')

router.route('/course')
    .get(courses.renderCourseForm)
    .post(courses.createCourse)

router.route('/allCourse')
    .get(courses.showAllCourses)

router.route('/joinCourse/:id')
    .post(courses.joinCourse)

module.exports = router