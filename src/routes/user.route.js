const userController = require("../controllers/user.controller");
const { validateUser } = require("../middleware/userValidation");
const express = require("express");
const router = express.Router();

router.post("/register", validateUser, userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/:email", userController.getUserByEmail);

module.exports = router;