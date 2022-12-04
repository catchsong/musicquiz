const mongoose = require('mongoose');


const Schema = mongoose.Schema;
let music_Schema = new Schema({
    index: {
        type: String
    },
    url: {
        type: String
    },
    ans: {
        type: String
    },
    hint: {
        type: String
    }
}, {
        collection: 'quizdb'
    })
module.exports = mongoose.model('quizdb', music_Schema)