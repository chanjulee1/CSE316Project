// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const Instructions = () => {
  return (
    <div
      className="flex justify-center items-start"
      style={{ marginTop: "10px" }}
    >
      <div className="max-w-[900px] p-5 bg-sky-300 border-2 border-gray-400">
        <p className="text-center">
          First, proceed to 'Login' page and enter your 9 digit student id and
          your password. Click the 'Login' button to verify your password and
          save your student id for the session.
        </p>
        <br></br>
        <div className="text-center">
          Next, proceed to 'Enter Previous Courses'. Click on each course you
          have completed with a C or better grade. Click Set Previous Courses.
        </div>
        <br></br>
        <p className="text-center">
          Return to the home page and click 'Select Courses'. Enter your name
          and any search term to restrict course selections with the provided
          string the course name. This can be left blank to see all CSE courses.
        </p>
        <br></br>
        <p className="text-center">
          Click the checkbox by each course for which you would like to
          register. Click the Register button to register. If you are missing
          prerequisites, you must go back and select a different set of courses.
          In this case, click 'ok' on the alert box and try again.
        </p>
        <br></br>
        <p className="text-center">
          On success, an alert box will indicate the courses for which you have
          registered.
        </p>
      </div>
    </div>
  );
};

export default Instructions;
