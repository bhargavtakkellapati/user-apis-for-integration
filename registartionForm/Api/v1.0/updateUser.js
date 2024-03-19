const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userschema = require("../../model/user");

router.put("/:id", async (req, res) => {
  try {
    const reqBody = req.body;
    const reqParams = req.params;
    const update = {};
    if (req.get("Content-Type") != "application/json") {
      return res
        .status(400)
        .json({ status: 404, message: "Invalid header format" });
    }
    const Update = await userschema.findOne({ _id:(reqParams.id)})
    if(!Update){
      return res
        .status(400)
        .json({ status: 404, message: "no user found" });
    }
   

    if (reqBody.firstName !== null && reqBody.firstName !== undefined) {
        update.firstName = reqBody.firstName;
      }
      if (reqBody.lastName !== null && reqBody.lastName !== undefined) {
        update.lastName = reqBody.lastName;
      }
      if (reqBody.email !== null && reqBody.email !== undefined) {
        update.email = reqBody.email;
      }
      if (reqBody.phone !== null && reqBody.phone !== undefined) {
        update.phone = reqBody.phone;
      }
      if (reqBody.username !== null && reqBody.username !== undefined) {
        update.username = reqBody.username;
      }
      if (reqBody.DOB !== null && reqBody.DOB !== undefined) {
        update.DOB = reqBody.DOB;
      }
      if (reqBody.age !== null && reqBody.age !== undefined) {
        update.age = reqBody.age;
      }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    if (errors.isEmpty()) {
      const updateUser = await userschema.findByIdAndUpdate(
        { _id:(reqParams.id) },
        update,
        { new: true }
      );
      return res.status(200).json({
        status: 200,
        message: "successfully updated",
        response: updateUser,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "internal server error",error });
  }
});
module.exports = router;