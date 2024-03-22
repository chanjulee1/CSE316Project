// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

router.route("/:id").post(registerController.setRegister);

module.exports = router;
