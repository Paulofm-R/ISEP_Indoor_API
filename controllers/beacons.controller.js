const User = require('../models/beacons.model.js');
const utilities = require('../utilities/utilities')

exports.create = async (req, res) => {
    try {
       // codigo para criar um novo beacom 
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
        // codigo para terem acesso a lista de beacons
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

exports.findUserInput = async (req, res) => {
    try {
        // codigo para encontrar um user em beacom (como o beacomID)
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
        // codigo para fazer alterações no beacom
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
        // codigo para eliminar um beacom
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