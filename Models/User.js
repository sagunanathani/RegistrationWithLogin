const mongoose =require('mongoose');

const register_schema = new mongoose.Schema({
    Name:{
        type: String,
        require: true,
    },
    MobileNo:{
        type: Number,
        require: true,
    },
    Email:{
        type: String,
        require: true,
        unique: true
    },
    Gender:{
        type: String,
        require: true,
    },
    Hobby:{
        type: String,
        require: true,
    },
    Password:{
        type: String,
        require: true,
        unique: true
    },
    Token:{
        type: String
    }
});

const user = mongoose.model("Register_details",register_schema);
module.exports = user;