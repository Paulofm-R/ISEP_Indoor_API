const User = require('../models/users.model.js');
const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, msg: "Invalid email" });
        }

        const check = bcrypt.compareSync(req.body.password, user.password);

        if (!check) {
            return res.status(401).json({
                success: false,
                accessToken: null,
                msg: "Password is incorrect"
            })
        }

        const token = utilities.generateToken({ id: user._id, type: user.type })

        console.log(token);

        return res.status(200).json({
            success: true,
            accessToken: token,
            id: user._id,
            type: user.type,
        })
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach((key) => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msgs: errors });
        }
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred while logging in." });
    }
}

exports.register = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        AccessibilityLvl: req.body.AccessibilityLvl
    });

    try {
        await user.save();
        return res.status(201).json({ success: true, msg: "New User created successfully.", URL: `/user/${user._id}` })
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach((key) => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msgs: errors });
        } else {
            return res.status(500).json({
                success: false, msg: err.message || "An error occurred while creating the user."
            });
        }
    }
}

exports.getAll = async (req, res) => {
    try {
        let data = await User
            .find()
            .select('name image type type active AccessibilityLvl')
            .exec();
        
        return res.status(200).json({ success: true, user: data });
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: err.message || "An error occurred while retrieving users." })
        }
    }
}

exports.findUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userID).exec();

        if (user === null) 
            return res.status(404).json({ success: false, msg: `Could not find any user with the ID ${req.params.userID}` })

        if (user._id == req.userID || req.userType == 'admin')
            return res.json({ success: true, user: user })

        return res.status(404).json({ success: false, msg: `You do not have permission to view this user's information` })
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: `Error retrieving user ID ${req.params.userID}.` })
        }
    }
}

exports.update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userID, req.body).exec();

        if (!user) {
            return res.status(404).json({ success: false, msg: `Cannot update user with id=${req.params.userID}. Check if user exists!` });
        }
        return res.status(200).json({ success: true, msg: `User id=${req.params.userID} has been updated successfully!` });
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: `Error when changing user ID ${req.params.userID}.` })
        }
    }
}

exports.delete = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.userID).exec()

        if (!user) {
            return res.status(404).json({ message: `It is not possible to delete the user with id=${req.params.userID}. Perhaps the user was not found!` });
        } else {
            return res.status(200).json({ message: `User with id=${req.params.userID} was successfully deleted` })
        }
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: `Error deleting user with ID ${req.params.userID}.` })
        }
    }
}