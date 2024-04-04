const express = require('express');
const router = express.Router();
const beaconsController = require('../controllers/beacons.controller.js')
const { validationResult, body } = require('express-validator')
const utilities = require('../utilities/utilities.js')

router.get('/', utilities.validateToken, (req, res) => {
    userController.getAll(req, res);
})

router.post('/', [
    body('position').notEmpty().escape(),
    body('floor').notEmpty().escape(),
    body('inDoor').notEmpty().escape(),
    body('locationType').notEmpty().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        await utilities.isAdmin;
        userController.register(req, res);
    } else {
        res.status(404).json({ errors: errors.array() });
    }
})

router.get('/:beacons', utilities.validateToken, (req, res) => {
    userController.findUser(req, res);
})

router.put('/:beacons', utilities.validateToken, (req, res) => {
    userController.update(req, res);
})

router.delete('/:beacons', utilities.validateToken, (req, res) => {
    userController.delete(req, res);
})

module.exports = router;