// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

import { createContext, useState } from "react";
import { login } from "../api/apiCalls";
import { hashutil } from "../hashutil/hashutil.mjs";

const AuthContext = createContext();
const baseUrl = "http://localhost:3000";

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userDataString = localStorage?.getItem("userData");
    if (userDataString) {
      return JSON.parse(userDataString);
    } else {
      return null;
    }
  });

  const [courses, setCourses] = useState(() => {
    const coursesDataString = localStorage?.getItem("coursesData");
    if (coursesDataString) {
      return JSON.parse(coursesDataString);
    } else {
      return null;
    }
  });
  
  const [transcript, setTranscript] = useState(() => {
    const transcriptDataString = localStorage?.getItem("transcriptData");
    if (transcriptDataString) {
      return JSON.parse(transcriptDataString);
    } else {
      return null;
    }
  });

  // Login provider that fetches StudentData if student data exists in the database
  const loginUser = async ({ studId, studPassword }) => {
    let errorMessage;
    try {
      const dataToSend = { studId };
      const { success, data } = await login(dataToSend);

      if (success) {
        const { studentId, firstName, lastName, password } = data;

        const studentHashedPassword = hashutil(
          firstName,
          lastName,
          studPassword
        );

        const isPasswordCorrect = studentHashedPassword === password;

        if (isPasswordCorrect) {
          setUser({ studentId, firstName, lastName });
          localStorage.setItem(
            "userData",
            JSON.stringify({ studentId, firstName, lastName })
          );
        } else {
          errorMessage = "Password error";
          throw new Error(errorMessage);
        }
      } else {
        errorMessage = data;
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw new Error(errorMessage);
    }
  };

  // Logout provider logs user out
  const logOut = async () => {
    setUser(null);
    setCourses(null);
    setTranscript(null);
    localStorage?.removeItem("userData");
    localStorage?.removeItem("coursesData");
    localStorage?.removeItem("transcriptData");
  };

  const contextData = {
    user,
    loginUser,
    logOut,
    courses,
    setCourses,
    transcript,
    setTranscript,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
