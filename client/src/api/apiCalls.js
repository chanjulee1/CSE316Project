// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

const baseUrl = "http://localhost:3000";

// Login function below
export const login = async ({ studId }) => {
  try {
    const response = await fetch(`${baseUrl}/login/${studId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, data: responseData.student };
    } else {
      return { success: false, data: responseData.message };
    }
  } catch (error) {
    return { success: false, data: error.message };
  }
};

// Fetch Courses function below
export const fetchCourses = async () => {
  try {
    const response = await fetch(`${baseUrl}/courses/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      return { success: true, data: responseData.courses };
    } else {
      return { success: false, data: responseData.message };
    }
  } catch (error) {
    return { success: false, data: error.message };
  }
};

// fetch, add, and delete  transcript functions below
export const fetchTranscripts = async ({ studentId }) => {
  try {
    const response = await fetch(`${baseUrl}/transcript/${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      return { success: true, data: responseData.transcript };
    } else {
      return { success: false, data: responseData.message };
    }
  } catch (error) {
    return { success: false, data: error.message };
  }
};

export const addCoursesToTranscript = async ({ studentId, courseIds }) => {
  try {
    const response = await fetch(`${baseUrl}/transcript/${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseIds }),
    });

    const responseData = await response.json();
    if (response.ok) {
      return { success: true, data: responseData.transcript };
    } else {
      return { success: false, data: responseData.message };
    }
  } catch (error) {
    return { success: false, data: error.message };
  }
};

export const deleteTranscript = async ({ studentId }) => {
  try {
    const response = await fetch(`${baseUrl}/transcript/${studentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete transcript: ${response.statusText}`);
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    console.error("Error deleting transcript", error);
    return { success: false, data: error.message };
  }
};

// fetch Prerequsities of list of courseId values
export const fetchPrerequisites = async ({ courseIds }) => {
  try {
    const params = new URLSearchParams({
      courseIds: courseIds.join(","),
    });
    const response = await fetch(
      `${baseUrl}/prerequisites?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    if (response.ok) {
      return { success: true, data: responseData };
    } else {
      return {
        success: false,
        data: "Something went wrong while fetching Prerequisites",
      };
    }
  } catch (error) {
    return { success: false, data: error.message };
  }
};

// registers user to selected Courses
export const sendSelectedCourses = async ({ studentId, courseIds }) => {
  try {
    const response = await fetch(`${baseUrl}/register/${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseIds }),
    });

    const responseData = await response.json();
    if (response.ok) {
      return { success: true, data: responseData.transcript };
    } else {
      return { success: false, data: responseData.message };
    }
  } catch (error) {
    return { success: false, data: error.message };
  }
};
