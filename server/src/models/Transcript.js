// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const db = require("../config/db");

class Transcript {
  constructor(transcriptId, studentId, courseId) {
    this.transcriptId = transcriptId;
    this.studentId = studentId;
    this.courseId = courseId;
  }

  static getTranscript(studentId) {
    const sql = `
    SELECT transcripts.transcriptId, courses.courseId, courses.courseName
    FROM transcripts
    JOIN courses ON transcripts.courseId = courses.courseId
    WHERE transcripts.studentId = ?
  `;
    return db.execute(sql, [studentId]);
  }

  static addCourses(studentId, courseIds) {
    const sql = `
    INSERT IGNORE INTO transcripts (studentId, courseId)
    VALUES ${courseIds.map(() => `(?, ?)`).join(", ")}
  `;
    // Flatten array of parameters for SQL query
    const params = courseIds.flatMap((courseId) => [studentId, courseId]);
    return db.execute(sql, params);
  }

  static deleteTranscript(studentId) {
    const sql = `
    DELETE FROM transcripts
    WHERE studentId = ?
  `;
    return db.execute(sql, [studentId]);
  }
}

module.exports = Transcript;
