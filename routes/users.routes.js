const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js')
const { validationResult, body } = require('express-validator')
const utilities = require('../utilities/utilities.js')

router.post('/login', [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().escape(),
], (req, res) => {
    userController.login(req, res)
})

router.post('/register', [
    body('name').notEmpty().escape(),
    body('password').notEmpty().escape(),
    body('email').notEmpty().isEmail(),
    body('AccessibilityLvl').notEmpty().escape(),
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        userController.register(req, res);
    } else {
        res.status(404).json({ errors: errors.array() });
    }
})

router.get('/', utilities.validateToken, utilities.isAdmin, (req, res) => {
    // await utilities.isAdmin(req, res);
    userController.getAll(req, res);
})

router.get('/:userID', utilities.validateToken, (req, res) => {
    userController.findUser(req, res);
})

router.put('/:userID', utilities.validateToken, (req, res) => {
    userController.update(req, res);
})

router.delete('/:userID', utilities.validateToken, (req, res) => {
    userController.delete(req, res);
})

module.exports = router;