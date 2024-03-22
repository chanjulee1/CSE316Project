// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const Course = require("../models/Course");


exports.getAllCourses = async (req, res, next) => {
  try {
    const [rows, _] = await Course.getAllCourses();
    res.status(200).json({ courses: rows });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
