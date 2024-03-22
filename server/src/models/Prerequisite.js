// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const db = require("../config/db");

class Prerequisite {
  constructor(prerequisiteId, courseId, requiredCourseId) {
    this.prerequisiteId = prerequisiteId;
    this.courseId = courseId;
    this.requiredCourseId = requiredCourseId;
  }

  static getPrerequisites(courseIds) {
    const placeholders = courseIds.map(() => "?").join(",");
    const sql = `
    SELECT courseId, requiredCourseId
    FROM prerequisites
    WHERE courseId IN (${placeholders})
  `;
    return db.execute(sql, [...courseIds]);
  }
}

module.exports = Prerequisite;
