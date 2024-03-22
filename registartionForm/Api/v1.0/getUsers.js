const express = require("express");
const router = express.Router();
const cors = require('cors');
const userschema = require('../../model/user');

router.use(cors({ origin: 'http://localhost:3000' }));

router.get("/", async (req, res) => {
  try {
    const users = await userschema.find({});
    return res.status(200).json({ status: 200, message: "success", data: users });
  } catch (error) {
    return res.status(404).json({ status: 404, message: "error", error: error });
  }
});

module.exports = router;
