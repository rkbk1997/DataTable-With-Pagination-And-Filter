const mongoose = require('mongoose');

const Schema = mongoose.Schema

const storeSchema = new Schema({
    App: String,
    Category : String,
    Rating : String,
    Reviews : String,
    Size : String,
    Installs : String,
    Type : String,
    Price : String,
    'Content Rating':String,
    Genres: String,
    'Last Updated':String,
    'Current Ver': String,
    'Android Ver':String

})

module.exports= mongoose.model('playStore', storeSchema, 'playStore')
