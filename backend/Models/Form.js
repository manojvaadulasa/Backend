const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:false,
    },
    gender:{
        type:String,
        require:false,
    },
    address:{
        type:String,
        require:false,
    }
},{timestamps: true});


mongoose.models = {}
const Details = mongoose.model('User Detail', UserSchema)

module.exports = Details;