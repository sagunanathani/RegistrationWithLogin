const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// middleware
// const middleware = (res, req, next) => {
//     console.log('middleware calling');
//     next();
// };

// alag folder banavi to mukvu pade
const login = require('./Routes/login_routes');
app.use('/', login);

const todo_details = require('./Routes/todo_routes');
app.use('/', todo_details);

const mongoUrl = "mongodb://127.0.0.1:27017/login";
console.log("connection successfully");
mongoose.connect(mongoUrl, {useUnifiedTopology: true}).then(() => {
    console.log('success');
}).catch(e => {
    console.error("e--->", e);
    process.exit(1);
});

//connection to PORT
app.listen(8000, () => {
    console.log(`Listening on port ${8000}`);
});

module.exports = app;
