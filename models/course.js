const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CourseSchema = new Schema({
    courseName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.String,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Course', CourseSchema)