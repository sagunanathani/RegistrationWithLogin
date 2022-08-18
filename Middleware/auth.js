const user = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//post login validation
module.exports = async (req, res, next) => {
    console.log("login details------------>", req.body);
    try {
        const bearerHeader = req.body.token || req.query.token || req.headers['authorization'];
        console.log("bearerHeader in validator----->", bearerHeader);
        if (typeof bearerHeader !== 'undefined') {
            // const bearer = bearerHeader.split(' ');
            // const token=bearer[1];
            const token = bearerHeader;
            console.log("token in validator--->", token);

            // sagu is a key and also I have pass in login routes for jwt token
            jwt.verify(token, "sagu", (err, authData) => {
                if (err) {
                    // res.json({result:err})
                    console.log("error of jwt verify--->", err);
                    return res.json({
                        success: false,
                        message: "Failed to authenticate token.",
                    });
                } else {
                    next();
                }
            })
        } else {
            res.send({"result": "Token not provided"});
        }
    } catch (e) {
        res.status(400).send({error: e});
    }
};