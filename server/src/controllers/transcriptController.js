// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const Transcript = require("../models/Transcript");

exports.getTranscript = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    const [rows, _] = await Transcript.getTranscript(studentId);
    if (rows.length === 0) {
      res.status(200).json({
        message: "No transcript found for this student",
        transcript: [],
      });
    } else {
      res.status(200).json({ transcript: rows });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postTranscript = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const { courseIds } = req.body;

    await Transcript.addCourses(studentId, courseIds);

    const [rows, _] = await Transcript.getTranscript(studentId);

    res.status(201).json({
      message: "Courses added to transcript successfully",
      transcript: rows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteTranscript = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    await Transcript.deleteTranscript(studentId);

    res.status(200).json({ message: "Transcript deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
