import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/profileStyles';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { logoutUser } from '../services/auth';

/**
 * Profile Screen Component that displays user information and reviews
 * @module ProfileScreen
 * @returns {JSX.Element} Rendered ProfileScreen component
 */
export default function ProfileScreen() {
  
  /**
   * Navigation object for screen transitions
   * @type {object}
   */
  const navigation = useNavigation();

  /**
   * State for user email
   * @type {[string, function]} userEmail - Email state and setter
   */
  const [userEmail, setUserEmail] = useState('');

  /**
   * State for loading indicator
   * @type {[boolean, function]} isLoading - Loading state and setter
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * State for user reviews
   * @type {[Array, function]} userReviews - Array of user reviews and setter
   */
  const [userReviews, setUserReviews] = useState([]);

  /**
   * State for reviews loading indicator
   * @type {[boolean, function]} isLoadingReviews - Reviews loading state and setter
   */
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  /**
   * Effect hook to initialize user data and fetch reviews
   * @function
   */
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email || '');
      fetchUserReviews(user.uid);
      setIsLoading(false);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  }, []);

  /**
   * Fetches user reviews from Firestore
   * @async
   * @param {string} userId - The ID of the current user
   * @returns {Promise<void>}
   */
  const fetchUserReviews = async (userId) => {
    try {
      setIsLoadingReviews(true);
      const reviewsRef = collection(db, 'reviews');
      const q = query(reviewsRef, where('userId', '==', userId));
      
      const snapshot = await getDocs(q);
      const reviews = [];
      snapshot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
      });
      setUserReviews(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Alert.alert('Error', 'Failed to load reviews');
    } finally {
      setIsLoadingReviews(false);
    }
  };

  /**
   * Handles user logout
   * @async
   * @returns {Promise<void>}
   */
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  /**
   * Generates user initials from email address
   * @returns {string} User initials or default value
   */
  const getInitials = () => {
    if (!userEmail) return 'CS';
    return userEmail
      .split('@')[0]
      .split('.')
      .map((part) => part[0]?.toUpperCase() || '')
      .join('');
  };

  /**
   * Generates display name from email address
   * @returns {string} Formatted display name or default value
   */
  const getDisplayName = () => {
    if (!userEmail) return 'Calvin Student';
    return userEmail
      .split('@')[0]
      .split('.')
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(' ');
  };


  return (
    <View style={styles.container}>
      {/* Help Button */}
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate('Help')}
      >
        <Ionicons name="help-circle-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.profileImageSection}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitials}>{getInitials()}</Text>
          </View>
          <Text style={styles.displayName}>{getDisplayName()}</Text>
        </View>

        <View style={styles.emailSectionContainer}>
          <View style={styles.emailRow}>
            <Ionicons name="mail-outline" size={24} color="#000" marginTop={-3} />
            <Text style={styles.emailLabel}> Email:</Text>
            <Text style={styles.emailValue}>{userEmail}</Text>
          </View>
        </View>

{/* Reviews Section */}
<View style={styles.sectionContainer}>
  <View style={styles.reviewHeaderContainer}>
    <Text style={styles.sectionTitle}>Your Reviews</Text>
  </View>

  <View style={styles.reviewsContainer}>
    {isLoadingReviews ? (
      <Text style={styles.noReviewsText}>Loading reviews...</Text>
    ) : userReviews && userReviews.length > 0 ? (
      userReviews.map((review) => (
        <View key={review.id} style={styles.reviewItem}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewTitle}>
              {review.businessName || 'Property'}
            </Text>
            <Text style={styles.reviewDate}>
              {review.timestamp
                ? new Date(review.timestamp).toLocaleDateString()
                : 'No date'}
            </Text>
          </View>
          <View style={styles.reviewRating}>
            <Text style={styles.reviewText}>Rating: {review.rating || 0}/5</Text>
          </View>
          <Text style={styles.reviewContent}>{review.content || 'No content'}</Text>
        </View>
      ))
    ) : (
      <Text style={styles.noReviewsText}>No reviews yet</Text>
    )}
  </View>
</View>

        <TouchableOpacity
          style={[styles.logoutButton, { opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleLogout}
          disabled={isLoading}
        >
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
