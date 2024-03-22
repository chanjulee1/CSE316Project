// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const Prerequisite = require("../models/Prerequisite");

exports.getPrerequisites = async (req, res, next) => {
  try {
    const { courseIds } = req.query;
    const courseIdsArray = courseIds.split(",");

    const [rows, _] = await Prerequisite.getPrerequisites(courseIdsArray);

    // Convert rows to the desired format
    const prerequisites = {};
    rows.forEach((row) => {
      if (!prerequisites[row.courseId]) {
        prerequisites[row.courseId] = [];
      }
      prerequisites[row.courseId].push(row.requiredCourseId);
    });

    res.status(200).json(prerequisites);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
