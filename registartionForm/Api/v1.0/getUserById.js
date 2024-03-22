const express = require("express");
const router = express.Router();
const cors = require('cors'); 

const userschema = require("../../model/user");


router.use(cors());

router.get("/:id", async (req, res) => {
  try {
    const userData = await userschema.findById(req.params.id);

    if (!userData) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({
        status: 200,
        message: "get user successfully",
        data: userData,
      });
  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "error", error: error });
  }
});

module.exports = router;
