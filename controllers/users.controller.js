const User = require('../models/users.model.js');
const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    try {
        // Codigo para o login do user
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
    try {
       // codigo para o register do user
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
        // codigo para os admin terem acesso a lista de user
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
        // codigo para encontrar um user em especifico (como o userID)
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
        // codigo para fazer alterações no user
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
        // codigo para eliminar um user
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