const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const cors = require('cors');
const mongoose = require('mongoose');
// const ObjectId = require("mongodb").ObjectId;
const userschema = require("../../model/user");

router.use(cors({ origin: 'http://localhost:3000' }));

router.put("/:id", async (req, res) => {
  try {
    const reqBody = req.body;
    const reqParams = req.params;

    const existingUser = await userschema.findById(reqParams.id);
    if (!existingUser) {
      return res.status(404).json({ status: 404, message: "No user found" });
    }

    // Update the user object properties
    if (reqBody.firstName) {
      existingUser.firstName = reqBody.firstName;
    }
    if (reqBody.lastName) {
      existingUser.lastName = reqBody.lastName;
    }
    if (reqBody.email) {
      existingUser.email = reqBody.email;
    }
    if (reqBody.phone) {
      existingUser.phone = reqBody.phone;
    }
    if (reqBody.username) {
      existingUser.username = reqBody.username;
    }
    if (reqBody.DOB) {
      existingUser.DOB = reqBody.DOB;
    }
    if (reqBody.age) {
      existingUser.age = reqBody.age;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Save the updated user object
    const updatedUser = await existingUser.save();

    return res.status(200).json({
      status: 200,
      message: "Successfully updated",
      response: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ status: 500, message: "Internal server error", error });
  }
});


module.exports = router;