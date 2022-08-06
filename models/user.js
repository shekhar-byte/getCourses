const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMoongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    proffesion: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    courses: [{
        type: Schema.Types.String,
        ref: 'Course'
    }]
})

userSchema.plugin(passportLocalMoongoose)

module.exports = mongoose.model('User', userSchema)