// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");

router.route("/").get(courseController.getAllCourses);

module.exports = router;
