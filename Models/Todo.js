const mongoose =require('mongoose');

const todo_schema = new mongoose.Schema({
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
    User_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

const todo= mongoose.model("todo_details",todo_schema);
module.exports = todo;