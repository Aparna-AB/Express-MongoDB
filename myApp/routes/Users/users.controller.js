const { default: mongoose } = require("mongoose");
const { UserModel } = require("./users.model");

// User Signup
//We use async because DB interactions are time consuming

const createUser = async (req, res) => {
    try {
        const { name, contact, address, email, password } = req.body;
        if (!name || !contact || !address || !email || !password) {
            return res.status(400).json({ message: "Please provide all the fields" });
        }
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email has already been taken" });
        }

        const newUser = new UserModel({
            name, contact, address, email, password
        });
        await newUser.save();
        return res.status(200).json({ message: "Sign up successful", data: newUser });
    } catch (error) {
        console.error("Error in createUser:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

// User Login----------------------------------------------------------------------------------
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password" });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        if (password !== user.password) {
            return res.status(404).json({ message: "Couldn't find the user" })
        }
        return res.status(200).json({ message: "Login successful", data: user });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
};

//find user with id---------------------------------------------------------------------------------
const userId = async (req, res) => {
    try {
        const id = req.params.userId;
        console.log("id", id);
        const users = await UserModel.findById(id);

        if (!users) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json({ message: "its an authorised user", data: users });

    } catch (error) {
        return res.status(500).json({ message: "server failed" });
    }
}

// Get all users-admin-------------------------------------------------------------------------------
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json({ message: "All users list fetched successfully", data: users });
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


//CRUD=>Create(POST) Read(GET) Update(Patch) Delete(Delete)-----------------------------------------------------------------
//Update the info of user

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("all fields are required");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("invalid id");
        }
        const users = await UserModel.findById(id);
        if (!users) {
            return res.status(404).send("User Not found");
        }

        const { name, password } = req.body;
        let updatingField = {};

        if (name) {
            updatingField.name=name;
        }
        if(password){
            updatingField.password=password;
        }

        const updatedUserInfo = await UserModel.findByIdAndUpdate(
            id,
           updatingField,
            { new: true }
        );
        return res.status(200).json({
            message: "User details updated succesfully",
            data: updatedUserInfo,
        });

    } catch (err) {
        console.error("error in the updated info", err);
        return res.status(500).send({ message: "Server Down" });
    }
};

//Delete the user---------------------------------------------------------------------------------------------------
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("All fields are required");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid user id");
        }
        const users = await UserModel.findById(id);
        if (!users) {
            return res.status(404).send("User Not found");
        }
        await UserModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "user deleted succesfully" });

    } catch (error) {
        console.error("error", error);
        return res.status(500).send({ message: "Server Failed" });

    }
};

module.exports = { createUser, userLogin, getAllUsers, userId, updateUser, deleteUser };
