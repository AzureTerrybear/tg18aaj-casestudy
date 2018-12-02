var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lessonSchema = new Schema({
    date: { type: Date, default: Date.now },
    title: String,
    department: String,
    description: String,
    hours: Number,
    targetlanguage: String,
    boxlink: String,
});

export default mongoose.model('Lesson', lessonSchema)