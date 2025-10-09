const express = require('express');
const userRouter = require('./user');
const app = express();

const router = express.Router();

router.use("/user", userRouter);


router.get('/', function (req, res, next) {
    console.log("Router Working");
    res.end();
})

module.exports = router;