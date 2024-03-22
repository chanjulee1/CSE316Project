// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const db = require("../config/db");

class Course {
  constructor(courseId, courseName, capacity) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.capacity = capacity;
  }

  static getAllCourses() {
    const sql = `
    SELECT *
    FROM courses
  `;
    return db.execute(sql);
  }

  static async findById(courseId) {
    const sql = `
      SELECT *
      FROM courses
      WHERE courseId = ?
    `;
    const [rows, _] = await db.execute(sql, [courseId]);
    if (rows.length > 0) {
      const { courseId, courseName, capacity } = rows[0];
      return new Course(courseId, courseName, capacity);
    }
    return null;
  }

  async decrement() {
    const sql = `
      UPDATE courses
      SET capacity = capacity - 1
      WHERE courseId = ?
    `;
    return db.execute(sql, [this.courseId]);
  }
}

module.exports = Course;
