const express = require('express');
const router = express.Router();
const userInputController = require('../controllers/userInput.controller.js')
const { validationResult, body } = require('express-validator')
const utilities = require('../utilities/utilities.js')

router.get('/', utilities.validateToken, (req, res) => {
    userInputController.getAll(req, res);
})

router.post('/', [
    body('userId').notEmpty().escape(),
    body('comment').notEmpty().escape(),
    body('type').notEmpty().escape()
], utilities.validateToken, (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        userInputController.create(req, res);
    } else {
        res.status(404).json({ errors: errors.array() });
    }
})

router.get('/:userInputID', utilities.validateToken, (req, res) => {
    userInputController.findUserInput(req, res);
})

router.put('/:userInputID', utilities.validateToken, (req, res) => {
    userInputController.update(req, res);
})

router.delete('/:userInputID', utilities.validateToken, (req, res) => {
    userInputController.delete(req, res);
})

module.exports = router;