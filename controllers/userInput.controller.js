//const Beacon = require('../models/beacons.model.js');
const UserInput = require('../models/usersInput.model.js');
const utilities = require('../utilities/utilities')

exports.create = async (req, res) => {
    
    // Create mew User input
    const userInput = new UserInput({
        userId: req.body.userId,
        Comment: req.body.Comment,
        satafetionLvl: req.body.satafetionLvl,
        answers: [],
        type: req.body.type,
        date: new Date (),
        resolved: req.body.resolved
    });

    try {
       // Save user input in database
       await userInput.save();
       return res.status(201).json({
        success: true,
        msg: "user input was added successfully.",
        URL: `/userInput/${userInput._id}`
       });

    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach((key) => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msgs: errors });
        } else {
            return res.status(500).json({
                success: false, msg: err.message || "An error occurred while creating the user input."
            });
        }
    }
}

exports.getAll = async (req, res) => {
    try {
        // codigo terem acesso a lista de userInputs
        let data = await UserInput
        .find()
        .select('userId Comment satafetionLvl answers type date resolved')
        .exec();

        return res.status(200).json({success: true, userInput: data});

    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: err.message || "An error occurred while retrieving user Inputs." })
        }
    }
}

exports.findUserInput = async (req, res) => {
    try {
        // codigo para encontrar um userInput em especifico (como o userInputID)
        const userInput = await UserInput.findById(req.params.userInputID).exec();

        if (userInput === null)
            return res.status(404).json({ success: false, msg: `Could not find any user input with the ID ${req.params.userInputID}.`});

        return res.json({success: true, userInput: userInput});
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: `Error retrieving user input ID ${req.params.userInputID}.` })
        }
    }
}

exports.update = async (req, res) => {
    try {
        // codigo para fazer alterações no userInput (como responder, considerar )
        const userInput = await UserInput.findById(req.params.userInputID).exec();

        if (userInput === null)
            return res.status(404).json({ success: false, msg: `Could not find any user input with the ID ${req.params.userInputID}.`});

        return res.json({success: true, userInput: userInput});
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: `Error when changing user input with the ID ${req.params.userInputID}.` })
        }
    }
}

exports.delete = async (req, res) => {
    try {
        // codigo para eliminar um userInputs
        const userInput = await UserInput.findByIdAndRemove(req.params.userInputID).exec();

        if(!userInput){
            return res.status(404).json({ message: `It is not possible to delete the user input with id=${req.params.userInputID}. Perhaps the user input was not found!` });
        } else {
            return res.status(200).json({ message: `User input with id=${req.params.userInputID} was successfully deleted` })
        }
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: `Error deleting user input with ID ${req.params.userInputID}.` })
        }
    }
}