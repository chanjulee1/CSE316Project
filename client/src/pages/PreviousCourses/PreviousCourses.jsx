// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

import {
  fetchCourses,
  fetchTranscripts,
  addCoursesToTranscript,
  deleteTranscript,
} from "../../api/apiCalls";

const PreviousCourses = () => {
  const { user, courses, setCourses, transcript, setTranscript } =
    useContext(AuthContext);
  const [selectedCourses, setSelectedCourses] = useState(
    transcript?.map((obj) => obj.courseId) || []
  );

  // fetching initial data: courses and user transcript
  useEffect(() => {
    (async () => {
      if (!courses) {
        const { success, data } = await fetchCourses();
        if (success) {
          localStorage.setItem("coursesData", JSON.stringify(data));
        }
      }
      if (user) {
        const { success, data } = await fetchTranscripts({
          studentId: user.studentId,
        });
        if (success) {
          setSelectedCourses(data?.map((obj) => obj.courseId));
          localStorage.setItem("transcriptData", JSON.stringify(data));
        }
      }
    })();
  }, [courses]);

  // fetching transcript 
  useEffect(() => {
    (async () => {
      if (user) {
        const { success, data } = await fetchTranscripts({
          studentId: user.studentId,
        });
        if (success) {
          localStorage.setItem("transcriptData", JSON.stringify(data));
        }
      }
    })();
  }, [transcript]);


  // handling checkbox changes
  const handleCheckboxChange = (courseId) => {
    setSelectedCourses((prevCourses) => {
      // user cannot uncheck previously taken courses
      if (transcript && transcript.some((obj) => obj.courseId === courseId)) {
        if (prevCourses.includes(courseId)) {
          alert("Previously taken courses cannot be removed!");
        }
        return prevCourses;
      } else if (prevCourses.includes(courseId)) {
        return prevCourses.filter((id) => id !== courseId);
      } else {
        return [...prevCourses, courseId];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedCourses.length > 0) {
      const existingCourseIds = transcript
        ? transcript.map((t) => t.courseId)
        : [];

      // Check if any of the selected courses are not already in the transcript
      const newCourses = selectedCourses.filter(
        (courseId) => !existingCourseIds.includes(courseId)
      );
      if (newCourses.length === 0) {
        alert("No new courses selected.");
        return;
      }

      const { success, data } = await addCoursesToTranscript({
        studentId: user.studentId,
        courseIds: newCourses,
      });
      if (success) {
        setTranscript(data);
        localStorage.setItem("transcriptData", JSON.stringify(data));
        alert("Courses added successfully!");
      } else {
        alert(`Failed to add courses: ${data}`);
      }
    } else {
      alert("No new courses selected.");
    }
  };

  const handleClearTranscript = async () => {
    try {
      if (selectedCourses.length > 0) {
        const { success, data } = await deleteTranscript({
          studentId: user.studentId,
        });

        if (success) {
          setTranscript([]);
          localStorage.removeItem("transcriptData");
          setSelectedCourses([]);
          alert("Transcript cleared successfully!");
        } else {
          alert(`Failed to clear transcript: ${data}`);
        }
      } else {
        alert("You haven't set Previous Courses");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="">
      <p className="text-center text-2xl">Previous Courses</p>
      <div className="flex justify-center items-start overflow-auto">
        <div className="md:max-w-[80%] w-full bg-blue-500 px-12 pb-4 rounded-md">
          <div className="text-center">Student ID: {user.studentId}</div>
          <br></br>
          <div className="text-center">
            Check off the courses you have completed with a C or better.
          </div>
          <br></br>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {courses?.map((course) => {
              if (!course) return null;
              return (
                <div key={course.courseId} className="flex items-center my-2">
                  <input
                    type="checkbox"
                    id={`course-${course.courseId}`}
                    checked={
                      selectedCourses.includes(course.courseId) //||
                      //transcript.find((obj) => obj.courseId === course.courseId)
                    }
                    onChange={() => handleCheckboxChange(course.courseId)}
                    className="mr-2 h-2.5 w-2.5"
                  />
                  <label htmlFor={`course-${course.courseId}`}>
                    {course.courseId}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end mt-6 space-x-12">
            <button
              className="bg-sky-300 px-3 rounded-lg"
              onClick={handleSubmit}
            >
              {" "}
              Set Previous Courses
            </button>

            <button
              className="bg-red-500 px-3 rounded-lg"
              onClick={handleClearTranscript}
            >
              {" "}
              Clear Transcript
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousCourses;
