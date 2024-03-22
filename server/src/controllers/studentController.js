// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const Student = require("../models/Student");

exports.fetchStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    console.log(studentId);

    const [rows, _] = await Student.getStudentById(studentId);
    if (rows.length === 0) {
      res.status(404).json({ message: "Student not found" });
    } else {
      const student = rows[0];
      res.status(200).json({ message: "successful", student });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
