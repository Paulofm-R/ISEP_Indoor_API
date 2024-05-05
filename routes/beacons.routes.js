const express = require('express');
const router = express.Router();
const beaconsController = require('../controllers/beacons.controller.js')
const { validationResult, body } = require('express-validator')
const utilities = require('../utilities/utilities.js')

/**
 * @route GET /beacons/
 * @group Beacons
 * @returns {object} 200 - beacon list - ex. [{"position":[x, y], "floor": z, "locationType": "", "indDoor": true}, {...}]
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.get('/', utilities.validateToken, (req, res) => {
    beaconsController.getAll(req, res);
})

/**
 * @route POST /beacons/
 * @group Beacons
 * @param {object} object.body - Form to create beacon - ex. {"position":[x, y], "floor": z, "locationType": "", "indDoor": true}
 * @returns {object} 201 - New Beacon created successfully
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - User without permission
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.post('/', [
    body('position').notEmpty().escape(),
    body('floor').notEmpty().escape(),
    body('inDoor').notEmpty().escape(),
    body('locationType').notEmpty().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        await utilities.isAdmin;
        beaconsController.create(req, res);
    } else {
        res.status(404).json({ errors: errors.array() });
    }
})

/**
 * @route GET /beacons/:beaconID
 * @group Beacons
 * @param {object} id.path - Beacon ID
 * @returns {object} 200 - Beacon information searched by id - ex. {"position":[x, y], "floor": z, "locationType": "", "indDoor": true}
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 404 - Beacon does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.get('/:beaconID', utilities.validateToken, (req, res) => {
    beaconsController.findBeacon(req, res);
})

/**
 * @route PUT /beacons/:beaconID
 * @group Beacons
 * @param {object} object.body - Change beacon information - ex. {"position":[x, y], "floor": z, "locationType": "", "indDoor": true}
 * @param {object} id.path - Beacon ID
 * @returns {object} 200 - Beacon changed
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - User without permission
 * @returns {Error} 404 - Beacon does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.put('/:beaconID', utilities.validateToken, utilities.isAdmin, (req, res) => {
    beaconsController.update(req, res);
})

/**
 * @route DELETE /beacons/:beaconID
 * @group Beacons
 * @param {object} id.path - Beacon ID
 * @returns {object} 204 - Beacon deleted
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - Beacon without permission
 * @returns {Error} 404 - Beacon does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.delete('/:beaconID', utilities.validateToken, utilities.isAdmin, (req, res) => {
    beaconsController.delete(req, res);
})

module.exports = router;