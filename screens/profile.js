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

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userReviews, setUserReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

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

  const fetchUserReviews = async (userId) => {
    try {
      setIsLoadingReviews(true);
      const reviewsRef = collection(db, 'reviews');
      const q = query(reviewsRef, where('userId', '==', userId)); // Filter by userId
  
      const snapshot = await getDocs(q);
      const reviews = [];
      snapshot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
      });
      setUserReviews(reviews); // Set the fetched reviews in state
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Alert.alert('Error', 'Failed to load reviews');
    } finally {
      setIsLoadingReviews(false);
    }
  };  

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

  const getInitials = () => {
    if (!userEmail) return 'CS';
    return userEmail
      .split('@')[0]
      .split('.')
      .map((part) => part[0]?.toUpperCase() || '')
      .join('');
  };

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
