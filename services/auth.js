import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Validates if an email address belongs to Calvin University
 * @function validateCalvinEmail
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email ends with '@calvin.edu', false otherwise
 */
export const validateCalvinEmail = (email) => {
  return email.toLowerCase().endsWith('@calvin.edu');
};

/**
 * Validates password strength requirements
 * @function validatePassword
 * @param {string} password - Password to validate
 * @throws {Error} If password doesn't meet minimum requirements:
 * - At least 8 characters long
 * - Contains at least one number
 * - Contains at least one uppercase letter
 */
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

/**
 * Creates a new user account with email and password
 * @async
 * @function createAccount
 * @param {string} email - User's email address (must be @calvin.edu)
 * @param {string} password - User's password
 * @throws {Error} If email is not a Calvin email address
 * @throws {Error} If password doesn't meet requirements
 * @throws {Error} If email is already registered
 * @returns {Promise<Object>} Firebase user object
 */
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

/**
 * Authenticates user with email and password
 * @async
 * @function loginUser
 * @param {string} email - User's email address (must be @calvin.edu)
 * @param {string} password - User's password
 * @throws {Error} If email is not a Calvin email address
 * @returns {Promise<Object>} Firebase user object
 */
export const loginUser = async (email, password) => {
  if (!validateCalvinEmail(email)) {
    throw new Error('Only @calvin.edu email addresses are allowed');
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Signs out the current user
 * @async
 * @function logoutUser
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  await signOut(auth);
};


