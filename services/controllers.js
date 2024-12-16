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

export async function studentExists(email) {
  const response = await fetch('https://cs262-webapp.azurewebsites.net/students');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const students = await response.json();
  return students.some((student) => student.email === email);
}

export async function createReview(studentId, propertyId, rating, reviewText) {
  try {
    const response = await fetch('https://cs262-webapp.azurewebsites.net/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentID: studentId, propertyID: propertyId, rating: rating, reviewText: reviewText }),
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