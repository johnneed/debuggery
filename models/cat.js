var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CatSchema = new Schema({
    name: String,
    url : String,
    createDate: Date,
    coffee : String
});

module.exports = mongoose.model('Cat', CatSchema);