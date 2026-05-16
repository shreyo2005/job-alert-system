const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    skills: {
        type: [String],
        default: []
    },

    role: {
        type: String,
        default: "candidate"
    },

    location: {
        type: String
    },

    experience: {
        type: Number,
        default: 0
    },

    expectedSalary: {
        type: Number
    },

    education: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);