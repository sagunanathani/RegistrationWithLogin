const user = require("../Models/User");
const todo = require("../Models/Todo");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//post data register
exports.register = async function (req, res) {
    console.log("Register------>", req.body);
    // hash password middleware concept ----- bcrypt change it
    const user_email = await user.findOne({Email: req.body.Email}, {MobileNo: req.body.MobileNo});
    const new_user = await user.create(req.body);
    // new_user.Password = bcrypt.hashSync(req.body.Password, 8);
    new_user.Password = await bcrypt.hash(new_user.Password, 10);
    console.log("bcrypt password------->", new_user.Password);
    new_user.save();
    if (user_email) {
        res.send('This email address and mobile num is already being used! Try another one')
    } else {
        res.status(201).json({newUser: new_user});
        console.log("new_user------", new_user)
    }
};

//get data register
exports.getRegister = async function (req, res) {
    try {
        const all_data = await user.find();
        res.status(200).json({
            status: "success",
            data: all_data
        })
    } catch (error) {
        console.log(error);
    }
};

//post login validation
exports.login = async (req, res) => {
    console.log("login details------------>", req.body);
    try {
        const Email = req.body.Email;
        const Password = req.body.Password;
        const user_email = await user.findOne({Email});
        console.log('user_email',user_email);

        if (user_email) {
            const passwordMatch = await bcrypt.compare(Password, user_email.Password);
            if (passwordMatch) {
                const Token = jwt.sign({user: user_email},'sagu');
                const response = await user.findOneAndUpdate({Email: Email}, {Token: Token}, {
                    returnOriginal: false
                });
                console.log('response',response);
                res.status(201).json({
                    User: response
                });
                console.log("token--------->", Token);
            } else {
                res.send("Invalid Password details");
            }
        } else {
            res
                .status(401)
                .json({message: "User does not exist plz check mail_id"});
        }
    }catch (e) {
        res.status(400).send({error:e});
    }
};

// get login validation
exports.getLogin = async (req, res) => {
    try {
        const all_user = await user.find();
        res.status(200).json({
            status: "success",
            data: all_user
        })
    } catch (error) {
        console.log(error);
    }
};

 // post todo_details
exports.todo = async (req, res) => {
    console.log("todo details------------>", req.body);
        try {
            const todo_details = await user.create(req.body);
            try {
                await todo_details.save().then(() => res.status(201).json({ newUser: todo_details }));
            } catch (error) {
                res.send(`cant save new user: ${error.message}`);
            }
        }catch(error) {
            console.log(error);
        }
};

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

// exports.register = async function(req, res) {
//     console.log("Register------>", req.body);
//     try {
//         const new_user = await user.create(req.body);
//         try {
//             await new_user.save().then(() => res.status(201).json({ newUser: new_user }));
//         } catch (error) {
//             res.send(`cant save new user: ${error.message}`);
//         }
//     }catch(error) {
//         console.log(error);
//     }
// };








