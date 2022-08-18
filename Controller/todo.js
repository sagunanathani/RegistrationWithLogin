const todo = require("../Models/Todo");

// get todo_details
exports.getTodo = async (req, res) => {
    try {
        const todo_user = await todo.find();
        res.status(200).json({
            status: "success",
            data: todo_user
        })
    } catch (error) {
        console.log(error);
    }
};

 // post todo_details
exports.postTodo = async (req, res) => {
    console.log("todo details------------>", req.body);
        try {
            const todo_details = await todo.create(req.body);
            try {
                await todo_details.save().then(() => res.status(201).json({ newUser: todo_details }));
            } catch (error) {
                res.send(`cant save new user: ${error.message}`);
            }
        }catch(error) {
            console.log(error);
        }
};

exports.patchTodo = async (req, res) => {
    console.log("patchTodo---->",req.params.id);
    try {
        const update_todo = await todo.findByIdAndUpdate(req.params.id, req.body,{ new: true });
        res.status(201).json({
            status: "success",
            data: update_todo
        })
    } catch (error) {
        console.log(error);
    }
};

exports.deleteTodo = async (req, res) => {
    console.log("deleteTodo-------->",req.params.id);
    try {
        const delete_todo = await todo.findByIdAndDelete(req.params.id);
        res.send('deleted data by id successfully');
        res.status(204).json({
            status:"success",
            data:delete_todo
        })
    }catch(error) {
        console.log(error);
    }
};











