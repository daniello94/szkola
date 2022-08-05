const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });

const messageSchema = new mongoose.Schema({
    content: String,
    name: String,
    classNr:String
}, {
    timestamps: true
});
module.exports = mongoose.model("Message", messageSchema);