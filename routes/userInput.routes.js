const express = require('express');
const router = express.Router();
const userInputController = require('../controllers/userInput.controller.js')
const { validationResult, body } = require('express-validator')
const utilities = require('../utilities/utilities.js')

/**
 * @route GET /userInput/
 * @group User Input - Operations about user inputs
 * @returns {Array.<UserInput>} 200 - An array of User Input objects
 * user input list - ex. [{"userID": 123243243, "comment": "Hello world!", "satafetionLvl": "Neutral", "answers": ["Hello."], "type": "Feedback", "date": "02/02/2024", "resolved": false}, {...}]
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - User without permission
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
/**
 * UserInput object
 * @typedef {object} UserInput
 * @property {object} userID - Identification of the user who provided the feedback
 * @property {string} comment - User comment
 * @property {enum} satafetionLvl - Satisfaction level: Neutral, Not satisfied, Satisfied
 * @property {enum} type - Problem or Feedback
 * @property {string} date - Feedback date
 * @property {boolean} resolved - true: has already been resolved, false: has not yet been resolved
 */
router.get('/', utilities.validateToken, utilities.isAdmin, (req, res) => {
    userInputController.getAll(req, res);
})

/**
 * @route POST /userInput/
 * @group User Input - Operations about user inputs
 * @param {object} object.body - Form to create user input - ex. {"userID": 123243243, "comment": "Hello world!", "satafetionLvl": "Neutral", "answers": ["Hello."], "type": "Feedback", "date": "02/02/2024", "resolved": false}
 * @param {object} userID.body.required - Identification of the user who provided the feedback
 * @param {object} comment.body.required - User comment
 * @param {enum} satafetionLvl.body.required - Satisfaction level: Neutral, Not satisfied, Satisfied
 * @param {enum} type.body.required - Problem or Feedback
 * @param {string} answers.body - Array of responses given to feedback, defaults: []
 * @param {string} date.body.required - Feedback date
 * @param {boolean} resolved.body.required - true: has already been resolved, false: has not yet been resolved, default: false
 * @returns {object} 201 - New user input created successfully
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.post('/', [
    body('userId').notEmpty().escape(),
    body('comment').notEmpty().escape(),
    body('type').notEmpty().escape(),
    body('satafetionLvl').notEmpty().escape()
], utilities.validateToken, (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        userInputController.create(req, res);
    } else {
        res.status(404).json({ errors: errors.array() });
    }
})

/**
 * @route GET /userInput/:userInputID
 * @group User Input - Operations about user inputs
 * @param {object} id.path - User Input ID
 * @returns {DetailedUserInput.model} 200 - User input information searched by id 
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 404 - User input does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
/**
 * DetailedUserInput object
 * @typedef {object} DetailedUserInput
 * @property {object} userID - Identification of the user who provided the feedback
 * @property {string} comment - User comment
 * @property {enum} satafetionLvl - Satisfaction level: Neutral, Not satisfied, Satisfied
 * @property {enum} type - Problem or Feedback
 * @property {string} date - Feedback date
 * @property {boolean} resolved - true: has already been resolved, false: has not yet been resolved
 * @property {string} answers - Array of responses given to feedback
 */
router.get('/:userInputID', utilities.validateToken, (req, res) => {
    userInputController.findUserInput(req, res);
})

/**
 * @route PUT /userInput/:userInputID
 * @group User Input - Operations about user inputs
 * @param {object} object.body - Change user input information - ex. {"userID": 123243243, "comment": "Hello world!", "satafetionLvl": "Neutral", "answers": ["Hello.", "Hi!"], "type": "Feedback", "date": "02/02/2024", "resolved": true}
 * @param {object} userID.body - Identification of the user who provided the feedback
 * @param {object} comment.body - User comment
 * @param {enum} satafetionLvl.body - Satisfaction level: Neutral, Not satisfied, Satisfied
 * @param {enum} type.body.required - Problem or Feedback
 * @param {string} answers.body - Array of responses given to feedback, defaults: []
 * @param {string} date.body - Feedback date
 * @param {boolean} resolved.body - true: has already been resolved, false: has not yet been resolved, default: false
 * @param {object} id.path.required - User Input ID
 * @returns {object} 200 - User input changed
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 404 - User input does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.put('/:userInputID', utilities.validateToken, (req, res) => {
    userInputController.update(req, res);
})

/**
 * @route DELETE /userInput/:userInputID
 * @group User Input - Operations about user inputs
 * @param {object} id.path.required - User Input ID
 * @returns {object} 204 - User Input deleted
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - User without permission
 * @returns {Error} 404 - User input does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.delete('/:userInputID', utilities.validateToken, utilities.isAdmin, (req, res) => {
    userInputController.delete(req, res);
})

module.exports = router;