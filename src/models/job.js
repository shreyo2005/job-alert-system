const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    skillsrequired: {
        type: [String],
        required: true
    },

    description: {
        type: String
    },

    location: {
        type: String
    },

    requiredexperience: {
        type: Number,
        default: 0
    },

    salary: {
        type: Number
    },

    education: {
        type: String
    },

    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open"
    }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);