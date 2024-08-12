const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    }
}, {
    timestamps: true
});

const User = mongoose.model("Users", userSchema);

// Function to check if a user with a given email exists
const checkValidUser = async (email) => {
    try {
        const response = await User.findOne({ email });
        return response;
    } catch (error) {
        throw new Error('Error fetching user by email');
    }
};

// Function to check if a user with a given ID exists, excluding the _id and password fields
const checkValidId = async (_id) => {
    try {
        const response = await User.findById(_id).select('-_id -password');
        if(!response){
            return "Invalid User Id"
        }
        return response;
    } catch (error) {
        throw error;
    }
};

// Function to update user details by ID
const updateUser = async (_id, data) => {
    try {
        const { password,email, ...keys } = data;
        const result = await User.findByIdAndUpdate(_id, keys, {
            new: true,
            runValidators: true,
        });
        return result;
    } catch (error) {
        throw error
    }
};

module.exports = {
    User,
    checkValidUser,
    checkValidId,
    updateUser
};
