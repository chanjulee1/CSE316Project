// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const express = require("express");
const router = express.Router();

const prerequisiteController = require("../controllers/prerequisiteController");

router.route("/").get(prerequisiteController.getPrerequisites);

module.exports = router;
