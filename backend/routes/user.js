const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');


const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
});

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
});

router.get('/signin',async function (req, res, next) {

    const body = req.body;

    const response = signinBody.safeParse(body);

    if(!response.success){
        return res.status(411).json({
            msg: "Incorrect inputs" 
        });
    }
    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    
    if (!existingUser) {
        return res.status(411).json({
            message: "Invalid Email/Passowrd"
        });
    }
    
    const token =  jwt.sign({
        userId: existingUser._id
    }, JWT_SECRET);

    res.json({
        message: "User login successfully",
        token: token
    })
    return;
});


router.post('/signup', async function (req, res, next) {
    console.log("Start sign up");
    const body = req.body;

    const response = signupBody.safeParse(body);

    if(!response.success){
        return res.status(411).json({
            msg: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username,
    })

    if(existingUser){
        return res.status(411).json({
            msg:"User already exists."
        })     
    }


    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    

    const userId = user._id;

    if (user) {
        const token = jwt.sign({userId}, JWT_SECRET);
  
        return res.json({
            msg:"User Created Successfully",
            token: token
        })
    }

    res.status(411).json({
        message: "Error while logging in"
    })

});




// router.put('/changePassword', function (req, res, next) {
//     console.log("Router Working");
//     res.end();
// });

module.exports = router;