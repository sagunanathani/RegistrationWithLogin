const express = require('express');
const router = express.Router();
const todo = require("../Controller/todo");
const auth = require("../Middleware/auth");

router.get('/get_data/todo',auth, todo.getTodo);
router.post('/post_data/todo',auth, todo.postTodo);
router.patch('/update_Data/:id',auth, todo.patchTodo);
router.delete('/delete_data/:id',auth, todo.deleteTodo);

module.exports = router;