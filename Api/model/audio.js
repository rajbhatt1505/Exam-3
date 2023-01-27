const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let audio = new Schema({
    name: {
        type: String,
        required:true
    },
    audioimage: {
        type: String,
        // required:true
    },
    description: {
        type: String,
        required:true
    },
    audioplayer: {
        type: String,
        // required:true
    },
    audioimage_path: {
        type: String
    },
    audioplayer_path:{
        type:String,
    }
},

)
module.exports = mongoose.model('audio', audio)