var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    name: String,
    department: String,
    email: String,
    lessons: String,
});

export default mongoose.model('Teacher', teacherSchema)