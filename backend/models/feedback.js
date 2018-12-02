var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new mongoose.Schema({
    lessonid: String,
    description: String,
    type: String,
    votes: {type: Number, default: 0}
});

export default mongoose.model('Feedback', feedbackSchema);