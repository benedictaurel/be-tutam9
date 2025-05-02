const userRepository = require("../repositories/user.repository");
const baseResponse = require("../utils/baseResponse.util");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.registerUser = async (req, res) => {
  if (!req.query.email || !req.query.password || !req.query.name) {
    return baseResponse(
      res,
      false,
      400,
      "Email, password, and name are required",
      "null"
    );
  }
  try {
    const existingUser = await userRepository.getUserByEmail(req.query.email);
    if (existingUser) {
      return baseResponse(
        res,
        false,
        400,
        "Email already used",
        "null"
      );
    }

    const hashedPassword = await bcrypt.hash(req.query.password, saltRounds);

    const user = await userRepository.registerUser({
      email: req.query.email,
      password: hashedPassword,
      name: req.query.name,
    });
    baseResponse(res, true, 201, "User created successfully", user);
  } catch (error) {
    baseResponse(
      res,
      false,
      500,
      error.message || "Error creating user",
      error
    );
  }
};

exports.loginUser = async (req, res) => {
  if (!req.query.email || !req.query.password) {
    return baseResponse(
      res,
      false,
      400,
      "Email and password are required",
      "null"
    );
  }
  try {
    const user = await userRepository.getUserByEmail(req.query.email);
    if (!user) {
      return baseResponse(res, false, 401, "Invalid email or password", "null");
    }

    const passwordMatch = await bcrypt.compare(req.query.password, user.password);
    if (!passwordMatch) {
      return baseResponse(res, false, 401, "Invalid email or password", "null");
    }

    baseResponse(res, true, 200, "User logged in successfully", {
      id: user.id,
      email: user.email,
      name: user.name
    });
  } catch (error) {
    baseResponse(
      res,
      false,
      500,
      error.message || "Error logging in user",
      error
    );
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await userRepository.getUserByEmail(req.params.email);
    if (!user) {
      return baseResponse(res, false, 404, "User not found", "null");
    }
    baseResponse(res, true, 200, "User retrieved successfully", user);
  } catch (error) {
    baseResponse(res, false, 500, "Error retrieving user", error);
  }
};