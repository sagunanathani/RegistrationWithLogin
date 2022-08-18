const user = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//post login validation
module.exports = async (req, res,next) => {
    console.log("login details------------>", req.body);
    try {
        // const token = req.headers.authorization.split(' ')[1];
        // const decodedToken = jwt.verify(token, 'sagu');

        const bearerHeader = req.body.token || req.query.token || req.headers['authorization'];

        console.log("bearerHeader in validetior----->",bearerHeader)

        if(typeof bearerHeader !== 'undefined')
        {

            // const bearer = bearerHeader.split(' ');
            // const token=bearer[1];
            const token = bearerHeader;
            console.log("token in validatior--->",token)

            jwt.verify(token, "sagu" ,(err,authData)=>{
                if(err)
                {
                    // res.json({result:err})
                    console.log("error of jwt verify--->",err);
                    return res.json( {
                        success: false,
                        message: "Failed to authenticate token.",
                    } );
                }else{
                    next();
                }
            })
        }
        else{
            res.send({"result":"Token not provied"});
        }

    }catch (e) {
        res.status(400).send({error:e});
    }
};