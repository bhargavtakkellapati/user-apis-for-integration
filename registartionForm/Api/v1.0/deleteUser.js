const express = require("express");
const router = express.Router();
const cors = require('cors'); 
const userschema = require("../../model/user");

router.use(cors());

router.delete("/:id", async (req, res) => {
  try {  
    const deleteUser = await userschema.findByIdAndDelete({_id:(req.params.id)});
    if (!deleteUser) {
      return res.status(404).json({ message: "record not found" });
    }
    return res.status(200).json({
        status: 201,
        message: " user deleted successfully",
        data: deleteUser,
      });

  } catch (error) {
    return res
      .status(404)
      .json({ status: 404, message: "error", error: error });
  }
});
module.exports = router;