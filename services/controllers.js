/**
 * Creates a new student record in the database
 * @async
 * @function createStudent
 * @param {string} email - Student's email address
 * @throws {Error} When network response is not ok
 * @returns {Promise<void>}
 * @description Sends a POST request to create a new student record with the provided email
 */
export async function createStudent(email) {
  try {
    const response = await fetch('https://cs262-webapp.azurewebsites.net/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${errorData.error || response.statusText}`);
    }

    const data = await response.json();
    console.log('Student created with ID:', data.id);
  } catch (error) {
    console.error('Error Creating Student:', error);
  }
}

/**
 * Checks if a student exists in the database
 * @async
 * @function studentExists
 * @param {string} email - Student's email address to check
 * @throws {Error} When network response is not ok
 * @returns {Promise<boolean>} True if student exists, false otherwise
 * @description Fetches all students and checks if the provided email exists
 */
export async function studentExists(email) {
  const response = await fetch('https://cs262-webapp.azurewebsites.net/students');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const students = await response.json();
  return students.some((student) => student.email === email);
}

/**
 * Creates a new review in the database
 * @async
 * @function createReview
 * @param {number} studentId - ID of the student creating the review
 * @param {number} propertyId - ID of the property being reviewed
 * @param {number} rating - Rating score for the property
 * @param {string} reviewText - Text content of the review
 * @throws {Error} When network response is not ok
 * @returns {Promise<void>}
 * @description Sends a POST request to create a new review with the provided details
 */
export async function createReview(studentId, propertyId, rating, reviewText) {
  try {
    const response = await fetch('https://cs262-webapp.azurewebsites.net/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        studentID: studentId, 
        propertyID: propertyId, 
        rating: rating, 
        reviewText: reviewText 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${errorData.error || response.statusText}`);
    }

    console.log('Review created with studentID:' + studentId + " propertyID: " +  propertyId);
  } catch (error) {
    console.error('Error Creating Review:', error);
  }
}

/**
 * Checks if a review exists for a specific student and property
 * @async
 * @function reviewExists
 * @param {number} studentId - ID of the student
 * @param {number} propertyId - ID of the property
 * @throws {Error} When network response is not ok
 * @returns {Promise<boolean>} True if review exists, false otherwise
 * @description Fetches all reviews and checks if a review exists for the given student and property
 */
export async function reviewExists(studentId, propertyId) {
  const response = await fetch('https://cs262-webapp.azurewebsites.net/reviews');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const reviews = await response.json();
    
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].studentid === studentId && reviews[i].propertyid === propertyId) {
      return true;
    }
  }

  return false;
}
