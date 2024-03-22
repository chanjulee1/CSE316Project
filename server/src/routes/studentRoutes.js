// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

router.route("/:id").get(studentController.fetchStudent);

module.exports = router;
