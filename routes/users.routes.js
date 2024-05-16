const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller.js");
const { validationResult, body, query } = require("express-validator");
const utilities = require("../utilities/utilities.js");

/**
 * @route POST /users/login
 * @group Users - Operations about users
 * @param {object} object.body - User credentials - ex. {"email":"admin@email.com" "password":"12345"}
 * @param {string} email.body.required - User email
 * @param {string} password.body.required - User password
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - Missing credentials
 * @returns {Error} 401 - Incorrect credentials
 * @returns {Error} 500 - Something went wrong
 */
router.post(
  "/login",
  [body("email").notEmpty().isEmail(), body("password").notEmpty().escape()],
  (req, res) => {
    userController.login(req, res);
  }
);

/**
 * @route POST /users/register
 * @group Users - Operations about users
 * @param {object} object.body - Form to create user - ex. {"name":"admin", "email": "user@example.com", "password":"1234", "AccessibilityLvl": '0'}
 * @param {string} name.body.required - User name
 * @param {string} email.body.required - User email
 * @param {string} password.body.required - User password
 * @param {enum} AccessibilityLvl.body.required - Level of accessibility - possible values: 0 (without disability), 1 (Visual Impairment), 2 (Motor Disability)
 * @returns {object} 201 - New User created successfully.
 * @returns {Error} 400 - Missing data
 * @returns {Error} 500 - Something went wrong
 */
router.post(
  "/register",
  [
    body("name").notEmpty().escape(),
    body("password").notEmpty().escape(),
    body("email").notEmpty().isEmail(),
    body("AccessibilityLvl").notEmpty().escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      userController.register(req, res);
    } else {
      res.status(404).json({ errors: errors.array() });
    }
  }
);

/**
 * @route GET /users/
 * @group Users - Operations about users
 * @returns {Array.<BasicUser>} 200 - An array of user objects
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - User without permission
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
/**
 * BasicUser object
 * @typedef {object} BasicUser
 * @property {string} name - The user's name
 * @property {string} type - The user's type (e.g., admin, user)
 * @property {string} image - URL of the user's image
 * @property {number} AccessibilityLvl - The user's accessibility level
 * @property {boolean} actived - Whether the user is active
 */
router.get("/", utilities.validateToken, utilities.isAdmin, (req, res) => {
  userController.getAll(req, res);
});

/**
 * @route GET /users/:userID
 * @group Users - Operations about users
 * @param {string} userID.path.required - The ID of the user to retrieve
 * @returns {DetailedUser.model} 200 - User information searched by id
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - User without permission
 * @returns {Error} 404 - User does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
/**
 * DetailedUser object
 * @typedef {object} DetailedUser
 * @property {string} name - The user's name
 * @property {string} type - The user's type (e.g., admin, user)
 * @property {string} image - URL of the user's image
 * @property {string} password - The user's password
 * @property {number} AccessibilityLvl - The user's accessibility level
 * @property {boolean} actived - Whether the user is active
 */
router.get("/:userID", utilities.validateToken, (req, res) => {
  userController.findUser(req, res);
});

/**
 * @route PUT /users/:userID
 * @group Users - Operations about users
 * @param {object} object.body - Change user information - ex. {"password": "123456", "email": "adim@example.com", "image": "image.jpg", "type": "admin", "AccessibilityLvl": 1, "actived": "false"}
 * @param {string} password.body - New user password
 * @param {string} email.body - New user email
 * @param {string} image.body - New user image
 * @param {enum} type.body - New user type - possible values: admin, user
 * @param {enum} AccessibilityLvl.body - New level of accessibility - possible values: 0 (without disability), 1 (Visual Impairment), 2 (Motor Disability)
 * @param {boolean} actived.body - New user status - true (Active), false (Disable)
 * @param {object} id.path.required - User ID
 * @returns {object} 200 - User changed
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - User without permission
 * @returns {Error} 404 - User does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.put("/:userID", utilities.validateToken, (req, res) => {
  userController.update(req, res);
});

/**
 * @route DELETE /users/:userID
 * @group Users - Operations about users
 * @param {object} id.path.required - User ID
 * @returns {object} 204 - User deleted
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - User without permission
 * @returns {Error} 404 - User does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.delete("/:userID", utilities.validateToken, (req, res) => {
  userController.delete(req, res);
});

/**
 * @route PATCH /users?email
 * @group Users - Operations about users
 * @param {object} object.body - Change user password - ex. {"name": "usarname", "password": "new password"}
 * @param {object} email.query.required - User email
 * @param {string} name.body.required - Username
 * @param {string} password.body.required - New password
 * @returns {object} 200 - Password changed
 * @returns {Error} 400 - Unexpected error
 * @returns {Error} 404 - User does not exist/found
 * @returns {Error} 500 - Something went wrong
 */
router.patch('/',
  [
    query('email').isEmail().notEmpty(),
    body('name').notEmpty().escape(),
    body('password').notEmpty().escape()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      userController.changePassword(req, res);
    } else {
      res.status(400).json({ errors: errors.array() });
    }
  }
);

module.exports = router;