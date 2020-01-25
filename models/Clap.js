const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Clap Schema
const ClapSchema = new Schema({
    clapper_email: {
        type: String,
        required: true
    },
    story_id: {
        type: String,
        required: true
    },
    clap_count: {
        type: Number,
        required: true
    }
});

module.exports = Clap = mongoose.model('clap', ClapSchema);