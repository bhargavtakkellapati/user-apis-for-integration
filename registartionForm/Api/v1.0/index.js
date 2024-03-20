const express = require("express");
const router = express.Router();

router.use("/createUser", require("./createUser"));
router.use("/getUsers",require("./getUsers"));
router.use("/getUsersById",require("./getUserById"));
router.use("/deleteUser",require("./deleteUser"));
router.use("/updateUser",require("./updateUser"));

module.exports = router;
