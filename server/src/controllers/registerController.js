// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const Course = require("../models/Course");
const Transcript = require("../models/Transcript");

exports.setRegister = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const { courseIds } = req.body;

    // Decrement the capacity of each course by 1
    await Promise.all(
      courseIds.map(async (courseId) => {
        const course = await Course.findById(courseId);
        if (course) {
          await course.decrement();
        }
      })
    );

    await Transcript.addCourses(studentId, courseIds);

    const [rows, _] = await Transcript.getTranscript(studentId);

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
