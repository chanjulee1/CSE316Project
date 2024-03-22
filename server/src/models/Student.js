// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const db = require("../config/db");

class Student {
  constructor(studentId, firstName, lastName, password) {
    this.studentId = studentId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

  static getStudentById(studentId) {
    const sql = `
    SELECT *
    FROM students
    WHERE studentId = ?
  `;
    return db.execute(sql, [studentId]);
  }
}

module.exports = Student;
