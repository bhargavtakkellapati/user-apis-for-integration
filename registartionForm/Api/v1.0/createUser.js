const express = require("express");
const router = express.Router();
const cors = require('cors'); 
const { body, validationResult } = require("express-validator");
const userschema = require("../../model/user");

router.use(cors());

router.post("/",[
  body("id").isString().notEmpty(),
    body("firstName").isString().notEmpty(),
    body("lastName").isString().notEmpty(),
    body("email").isString().optional(),
    body("phone").isString().notEmpty(),
    body("username").isString().notEmpty(),
    body("DOB").isString().notEmpty(),
    body("age").isString().notEmpty(),
],
async(req,res)=>{
    try{
    let reqBody = req.body;
    if (req.get("Content-Type") != "application/json") {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid header format" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (errors.isEmpty()) {
      const newUser = new userschema();
      newUser.id = reqBody.id; 
      newUser.firstName = reqBody.firstName;   
      newUser.lastName = reqBody.lastName;
      newUser.email = reqBody.email;
      newUser.phone = reqBody.phone;
      newUser.username = reqBody.username;
      newUser.DOB = reqBody.DOB;
      newUser.age = reqBody.age;


      const results = await newUser.save();



return res.status(201).json({
    status: 201,
    message: "user created successfully",
    data: results,
});
    }
} catch (error) {
    console.error("Error creating appointment:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
}
)
  module.exports=router;