const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });
const Grades = {
    rating: String,
    titleTask: String,
    textarea: String,
    genus: String
}
const schema = mongoose.Schema({
    nameSubject: String,
    grades: [Grades]
})

module.exports = mongoose.model('Subject', schema);