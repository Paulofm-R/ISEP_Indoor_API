const express = require('express');
const router = express.Router();
const beaconsController = require('../controllers/beacons.controller.js')
const { validationResult, body } = require('express-validator')
const utilities = require('../utilities/utilities.js')

/**
 * @route GET /beacons/
 * @group Beacons - Operations about beacons
 * @returns {Array.<Beacon>} 200 - An array of beacon objects
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
/**
 * Beacon object
 * @typedef {object} Beacon
 * @property {number} position - The position of the beacon [x, y]
 * @property {number} floor - The floor where the beacon is located
 * @property {string} locationType - The type of location
 * @property {boolean} indDoor - Indicates if it is an indoor beacon
 */
router.get('/', utilities.validateToken, (req, res) => {
    beaconsController.getAll(req, res);
})

/**
 * @route POST /beacons/
 * @group Beacons - Operations about beacons
 * @param {object} object.body - Form to create beacon - ex. {"position":[x, y], "floor": z, "locationType": "", "indDoor": true}
 * @param {number} position.body.required - Latitude and longitude of the beacon relative to the map
 * @param {number} floor.body.required - Floor where the beacon is located, if it is located outside, the floor must be 0
 * @param {string} locationType.body.required - Indicate whether it is an entrance, stairs, elevator, ...
 * @param {boolean} inDoor.body.required - true: Finds inside a building, false: Not located inside a building
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
 * @group Beacons - Operations about beacons
 * @param {object} id.path.required - Beacon ID
 * @returns {DetailedBeacon.model} 200 - Beacon information searched by id
 * Beacon information searched by id - ex. {"position":[x, y], "floor": z, "locationType": "", "indDoor": true}
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 404 - Beacon does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
/**
 * DetailedBeacon object
 * @typedef {object} DetailedBeacon
 * @property {number} position - The position of the beacon [x, y]
 * @property {number} floor - The floor where the beacon is located
 * @property {string} locationType - The type of location
 * @property {boolean} indDoor - Indicates if it is an indoor beacon
 */
router.get('/:beaconID', utilities.validateToken, (req, res) => {
    beaconsController.findBeacon(req, res);
})

/**
 * @route PUT /beacons/:beaconID
 * @group Beacons
 * @param {object} object.body - Change beacon information - ex. {"position":[x, y], "floor": z, "locationType": "", "indDoor": true}
 * @param {number} position.body - New latitude and longitude of the beacon relative to the map
 * @param {number} floor.body - New floor where the beacon is located, if it is located outside, the floor must be 0
 * @param {string} locationType.body - New indicate whether it is an entrance, stairs, elevator, ...
 * @param {boolean} inDoor.body - true: Finds inside a building, false: Not located inside a building
 * @param {object} id.path.required - Beacon ID
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
 * @param {object} id.path.required - Beacon ID
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