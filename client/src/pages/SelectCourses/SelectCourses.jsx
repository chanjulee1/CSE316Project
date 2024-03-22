// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {
  fetchCourses,
  fetchPrerequisites,
  sendSelectedCourses,
  fetchTranscripts,
} from "../../api/apiCalls";

const SelectCourses = () => {
  const { user, courses, setCourses, transcript, setTranscript } =
    useContext(AuthContext);

  const [showCourses, setShowCourses] = useState(false);
  const [name, setName] = useState(user.firstName ?? "");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  // fetching courses
  useEffect(() => {
    (async () => {
      const { success, data } = await fetchCourses();
      if (success) {
        setCourses(data);
        localStorage.setItem("coursesData", JSON.stringify(data));
      }
    })();
  }, []);

  // the name of below small functions tells its functionality
  const handleShowCourses = (e) => {
    e.preventDefault();
    setShowCourses(!showCourses);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function handleNavLinkClick(e) {
    e.target.style.color = "black";
  }

  function handleNavLinkBlur(e) {
    e.target.style.color = "grey";
  }

  const handleCourseSelect = (courseId) => {
    setSelectedCourses((prevCourses) => {
      if (prevCourses.includes(courseId)) {
        return prevCourses.filter((course) => course !== courseId);
      } else {
        return [...prevCourses, courseId];
      }
    });
  };

  // 1. checks if there are courses selected
  // 2. checks for previoulsy taken courses
  // 3. fetchs prerequisites of selected courses
  // 4. checks for missingPrerequisites
  // 5. registers to selected courses by decrementing
  //    course capacity and adds into transcript
  // 6. fetches transcript
  const handleRegister = async (e) => {
    e.preventDefault();
    if (selectedCourses.length > 0) {
      const transcriptCourses = transcript
        ? transcript.map((course) => course.courseId)
        : [];
      // Check if any of the selected courses are already in the transcript
      const duplicateCourses = selectedCourses.filter((course) =>
        transcriptCourses.includes(course)
      );

      if (duplicateCourses.length > 0) {
        alert(
          `You have already completed the following courses: ${duplicateCourses.join(
            ", "
          )}`
        );
        return;
      }
      const { success, data } = await fetchPrerequisites({
        courseIds: selectedCourses,
      });
      if (success) {
        let alertMessages = [];
        for (let courseId in data) {
          // Find the prerequisites for this course that are not in the transcript
          let missingPrerequisites = data[courseId].filter(
            (prerequisiteCourseId) =>
              !transcriptCourses.includes(prerequisiteCourseId)
          );
          if (missingPrerequisites.length > 0) {
            // Create a message for this course and add it to the list of messages
            alertMessages.push(
              `${courseId} requires ${missingPrerequisites.join(", ")}`
            );
          }
        }

        if (alertMessages.length === 0) {
          const { success, data } = await sendSelectedCourses({
            studentId: user.studentId,
            courseIds: selectedCourses,
          });
          if (success) {
            alert(`Courses Selected: \n${selectedCourses.join(", ")}`);
            fetchTranscriptAfterRegister();
          } else {
            alert(
              `Error: unable save those courses into database. \n${selectedCourses.join(
                ", "
              )}`
            );
          }
        } else {
          alert(alertMessages.join(". "));
        }

        // Handle the returned data here
      } else {
        console.error("Failed to fetch prerequisites:", data);
      }
    } else {
      console.error("No courses selected");
    }
  };

  // fetches transcript
  const fetchTranscriptAfterRegister = async () => {
    const { success, data } = await fetchTranscripts({
      studentId: user.studentId,
    });
    if (success) {
      setTranscript(data);
      localStorage.setItem("transcriptData", JSON.stringify(data));
    }
  };

  return (
    <div>
      <ul
        className="hidden sm:flex justify-center mx-auto py-2"
        style={{
          background:
            "linear-gradient(to left, rgba(128, 128, 128, 0) 0%, rgba(128, 128, 128, 1) 10%, rgba(128, 128, 128, 1) 90%, rgba(128, 128, 128, 0) 100%)",
          width: "92.6vw",
        }}
      >
        <li style={{ margin: "0 calc(4% + 2px)" }}>
          <NavLink to="/" className="">
            Home
          </NavLink>
        </li>
        <li style={{ margin: "0 calc(4% + 2px)" }}>
          <NavLink to="../instructions" className="">
            Instructions
          </NavLink>
        </li>
        <li style={{ margin: "0 calc(4% + 2px)" }}>
          <NavLink to="../login" className="">
            Login
          </NavLink>
        </li>
        <li style={{ margin: "0 calc(4% + 2px)" }}>
          <NavLink to="../previous-courses" className="">
            PreviousCourses
          </NavLink>
        </li>
        <li style={{ margin: "0 calc(4% + 2px)" }}>
          <NavLink
            to="../select-courses"
            className="font-bold"
            onFocus={handleNavLinkClick}
            onBlur={handleNavLinkBlur}
            style={{ color: "black" }}
          >
            SelectCourses
          </NavLink>
        </li>
      </ul>
      <div className="flex justify-center items-start">
        <div className="max-w-[95%] w-full bg-blue-500 p-5 ">
          <div className="max-w-[400px]">
            <h1 className="text-3xl">Search Form</h1>
            <form className="pt-12">
              <div className="flex justify-between items-center">
                <span>Name:</span>
                <input
                  className="px-2 rounded-md"
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="flex justify-between items-center mt-8">
                <span>Search For:</span>
                <input
                  className="px-2 rounded-md"
                  type="search"
                  placeholder="search"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                />
              </div>
              <div className="mt-12">
                <button
                  className="bg-sky-300 px-3 rounded-lg"
                  type="submit"
                  onClick={handleShowCourses}
                >
                  {showCourses ? "Hide Courses" : "Show Courses"}
                </button>
              </div>
            </form>
          </div>
          {showCourses && (
            <div className="border-gray-300 mt-8 border-t-2 ">
              <h3 className="text-xl font-bold mt-5 mb-3">
                {name
                  ? `${name}, here are the courses you may select.`
                  : "Here are the courses you may select."}
              </h3>
              <ul>
                {courses
                  .filter(
                    (course) =>
                      course.courseName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      course.courseId
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  ?.map((course) => (
                    <li className="my-1" key={course.courseId}>
                      <input
                        id={course.courseId}
                        type="checkbox"
                        onChange={() => handleCourseSelect(course.courseId)}
                      />
                      <label className="ml-2" htmlFor={course.courseId}>
                        {`${course.courseId}: ${course.courseName} - ${course.capacity} of 40`}
                      </label>
                    </li>
                  ))}
              </ul>
              <div className="mt-6">
                <button
                  className="bg-sky-300 px-3 rounded-lg"
                  type="submit"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectCourses;
