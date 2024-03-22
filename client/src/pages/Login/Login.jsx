// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

import { useForm } from "react-hook-form";
import React, { useContext } from "react";
import { useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";
import { fetchCourses, fetchTranscripts } from "../../api/apiCalls";

const Login = () => {
  const { loginUser, user, logOut, setCourses, setTranscript } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {}, [errorMessage]);

  // fetching courses
  useEffect(() => {
    (async () => {
      const { success, data } = await fetchCourses();
      if (success) {
        setCourses(data);
        localStorage.setItem("coursesData", JSON.stringify(data));
      }
    })();
  }, [localStorage.getItem("coursesData")]);

  // fetching transcripts
  useEffect(() => {
    (async () => {
      if (user) {
        const { success, data } = await fetchTranscripts({
          studentId: user.studentId,
        });
        if (success) {
          setTranscript(data);
          localStorage.setItem("transcriptData", JSON.stringify(data));
        }
      }
    })();
  }, [user]);

  
  const resetErrorMessage = () => {
    if (errorMessage) setErrorMessage(null);
  };

  // log in 
  const onSubmit = async (data) => {
    try {
      await loginUser({ studId: data.id, studPassword: data.password });
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-start">
      <div className="max-w-[700px] w-full bg-blue-500 px-5 sm:px-12 py-5 rounded-md">
        {user ? (
          <div className="w-full">
            <h1 className="text-3xl text-center">Welcome</h1>
            <br />
            <div>
              <p>
                Student Name: {user.firstName} {user.lastName}
              </p>
              <p>Student ID: {user.studentId}</p>
            </div>
            <br />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 border-[1px] bg-white rounded cursor-pointer"
                onClick={() => logOut()}
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl text-center">Login Form</h1>
            <form className="pt-12" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between items-center">
                <span>ID:</span>
                <div className="flex flex-col ">
                  <input
                    className="px-2 rounded-md"
                    type="number"
                    placeholder="id"
                    {...register("id", {
                      required: "required field",
                      minLength: {
                        value: 9,
                        message: "Enter a value of at least 9 characters.",
                      },
                      maxLength: {
                        value: 9,
                        message:
                          "Enter a value not exceeding 9 characters in length.",
                      },
                    })}
                    onChange={resetErrorMessage}
                  />
                  {errors.id && (
                    <p
                      role="alert"
                      className="text-[#ff0000] font-light text-sm flex items-center"
                    >
                      {errors.id?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <span>Password:</span>
                <div className="flex flex-col ">
                  <input
                    className="px-2 rounded-md"
                    id="password"
                    type={"password"}
                    placeholder="Password"
                    {...register("password", {
                      required: "required field",
                      minLength: {
                        value: 6,
                        message: "Enter a value of at least 6 characters.",
                      },
                    })}
                    onChange={resetErrorMessage}
                  />
                  {errors.password && (
                    <p
                      role="alert"
                      className="text-[#ff0000] font-light text-sm flex items-center"
                    >
                      {errors.password?.message}
                    </p>
                  )}
                  {errorMessage && (
                    <span className="error-message">{errorMessage}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-12">
                <button className="bg-sky-300 px-3 rounded-lg" type="submit">
                  Login
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
