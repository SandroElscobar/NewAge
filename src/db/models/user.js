const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true, max: 20},
    level: {type: String},
    email: {type: String}
})

module.exports = mongoose.model("User", userSchema)