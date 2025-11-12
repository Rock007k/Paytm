const express = require('express');
const router = express.Router();
const zod = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');


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

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.get('/signin',async function (req, res, next) {
    console.log("Start sign up");
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

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })

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




router.put('/changePassword',authMiddleware, async function (req, res, next) {
    console.log("Change passowrd start")
    const body = req.body;

    const response = updateBody.safeParse(body);
    if(!response){
        return res.status(411).json({
                msg:"Incorrect inputs"
            }
        )
    };

    await User.updateOne({_id: req.userId}, req.body);

    res.json({
        message:"Updated Successfully"
    })

});

router.get('/bulb', async function(req, res){

    try{
    const body = req.body;
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]

    });
    res.json({
        user: users.map((user) => ({
            username:user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        })
    )
    });


    console.log("End paramter");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;