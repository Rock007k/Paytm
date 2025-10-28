const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:PpcRUSmd3dlqalnD@codex.tn6oewx.mongodb.net/");

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const accountSchema = new mongoose.Schema({
	userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
	balance: {
        type: Number,
        required: true
    }
});


const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model("User", userSchema);

module.exports= {
    User,
    Account
};


// // backend/db.js
// const mongoose = require('mongoose');

// // Create a Schema for Users
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         minLength: 3,
//         maxLength: 30
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 6
//     },
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     }
// });

// // Create a model from the schema
// const User = mongoose.model('User', userSchema);

// module.exports = {
// 	User
// };