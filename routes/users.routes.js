const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller.js");
const { validationResult, body, query } = require("express-validator");
const utilities = require("../utilities/utilities.js");

/**
 * @route POST /users/login
 * @group Users
 * @param {object} object.body - User credentials - ex. {"email":"admin@email.com" "password":"12345"}
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
 * @group Users
 * @param {object} object.body - Form to create user - ex. {"name":"admin", "email": "user@example.com", "password":"1234", "AccessibilityLvl": '0'}
 * @param {enum} object.body.AccessibilityLvl - Level of accessibility - possible values: 0 (without disability), 1 (Visual Impairment), 2 (Motor Disability)
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
 * @group Users
 * @returns {object} 200 - User list - ex. [{"name":"admin", "type":"admin", "image": "url image", "AccessibilityLvl": "0", "actived": "true"}, {...}]
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - User without permission
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.get("/", utilities.validateToken, utilities.isAdmin, (req, res) => {
  userController.getAll(req, res);
});

/**
 * @route GET /users/:userID
 * @group Users
 * @param {object} id.path - User ID
 * @returns {object} 200 - User information searched by id - ex. {"name":"admin", "type":"admin", "image": "url image", "AccessibilityLvl": "0", "actived": "true"}
 * @returns {Error} 401 - You need to be authenticated
 * @returns {Error} 403 - User without permission
 * @returns {Error} 404 - User does not exist/found
 * @returns {Error} 500 - Something went wrong
 * @security Bearer
 */
router.get("/:userID", utilities.validateToken, (req, res) => {
  userController.findUser(req, res);
});

/**
 * @route PUT /users/:userID
 * @group Users
 * @param {object} object.body - Change user information - ex. {"password": "123456", "email": "adim@example.com", "image": "image.jpg", "type": "admin", "AccessibilityLvl": 1, "actived": "false"}
 * @param {object} id.path - User ID
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
 * @group Users
 * @param {object} id.path - User ID
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
 * @group Users
 * @param {object} object.body - Change user password - ex. {"name": "usarname", "password": "new password"}
 * @param {object} email.query - User email
 * @param {object} name.body - Username
 * @param {object} password.body - New password
 * @returns {object} 200 - Password changed
 * @returns {Error} 401 - teste
 * @returns {Error} 403 - teste
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
