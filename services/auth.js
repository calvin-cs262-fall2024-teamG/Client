import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const validateCalvinEmail = (email) => {
  return email.toLowerCase().endsWith('@calvin.edu');
};

const validatePassword = (password) => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  if (!/\d/.test(password)) {
    throw new Error('Password must contain at least one number');
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error('Password must contain at least one uppercase letter');
  }
};

export const createAccount = async (email, password) => {
  if (!validateCalvinEmail(email)) {
    throw new Error('Only @calvin.edu email addresses are allowed');
  }
  validatePassword(password);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered');
    }
    throw error;
  }
};

export const loginUser = async (email, password) => {
  if (!validateCalvinEmail(email)) {
    throw new Error('Only @calvin.edu email addresses are allowed');
  }
  // try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  // } catch (error) {
  //   throw error;
  // }
};

export const logoutUser = async () => {
  // try {
    await signOut(auth);
  // } catch (error) {
  //   throw error;
  // }
};


