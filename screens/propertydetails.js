import React, { useState, useEffect } from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from '../style/styles';
import StarRating from '../style/5stars';
import StarRatingReview from '../style/starsRating';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal, TextInput } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { reviewExists, createReview } from '../services/controllers';
import { auth } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons';

/**
 * Property Details Screen Component
 * Displays detailed information about a specific property including images, details, and reviews
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.route - Route object containing navigation parameters
 * @param {Object} props.navigation - Navigation object for screen transitions
 * @returns {JSX.Element} Rendered PropertyDetailsScreen component
 */
export default function PropertyDetailsScreen({ route, navigation }) {
  /**
   * Current user's email from Firebase authentication
   * @type {string}
   */
  const email = auth.currentUser?.email;

  /**
   * Property item data from navigation parameters
   * @type {Object}
   */
  const { item } = route.params || {};

  /**
   * State for tracking if property is in user's favorites
   * @type {[boolean, function]} isFavorite state and setter
   */
  const [isFavorite, setIsFavorite] = useState(false);

  /**
   * Hook to check if screen is currently focused
   * @type {boolean}
   */
  const isFocused = useIsFocused();

  /**
   * State for review modal visibility
   * @type {[boolean, function]} modalVisible state and setter
   */
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * State for review text input
   * @type {[string, function]} reviewText state and setter
   */
  const [reviewText, setReviewText] = useState('');

  /**
   * State for review rating
   * @type {[number, function]} rating state and setter
   */
  const [rating, setRating] = useState(0);

  /**
   * State for property reviews
   * @type {[Array, function]} reviews state and setter
   */
  const [reviews, setReviews] = useState([]);

  /**
   * State for review loading status
   * @type {[boolean, function]} reviewLoading state and setter
   */
  const [reviewLoading, setReviewLoading] = useState(true);

  /**
   * Fetches reviews for the property
   * @async
   * @function getReviews
   * @returns {Promise<void>}
   */
  const getReviews = async () => {
    try {
      const propertyID = parseInt(item.id, 10) + 1;

      const responseReviews = await fetch('https://cs262-webapp.azurewebsites.net/reviews/' + propertyID);
      const responseStudents = await fetch('https://cs262-webapp.azurewebsites.net/students');

      const jsonReviews = await responseReviews.json();
      const jsonStudents = await responseStudents.json();

      const dataReviews = jsonReviews;
      const dataStudents = jsonStudents;

      let tempReviews = [];

      for (let i = 0; i < dataReviews.length; i++) {
        tempReviews[i] = {
          id: i,
          propertyId: dataReviews[i].propertyId,
          rating: dataReviews[i].rating,
          text: dataReviews[i].reviewtext,
          date: new Date(Date.now() - Math.random() * 3 * 365 * 24 * 60 * 60 * 1000), // Random date in the past 3 years
          userId: dataReviews[i].studentid,
          userName: dataStudents[dataReviews[i].studentid - 1].email,
        }
      }

      setReviews(tempReviews);
    } catch (error) {
      console.error(error);
    } finally {
      setReviewLoading(false);
    }
  }

  /**
   * Effect hook to fetch reviews on component mount
   */
  useEffect(() => {
    getReviews();
  }, []);

  /**
   * Effect hook to check favorite status when screen is focused
   */
  useEffect(() => {
    if (isFocused) {
      checkIfFavorite();
    }
  }, [isFocused]);

  /**
   * Handles navigation back to previous screen
   * @function handleBackPress
   */
  const handleBackPress = () => {
    if (route.params?.fromFavorites) {
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  /**
   * Checks if property is in user's favorites
   * @async
   * @function checkIfFavorite
   * @returns {Promise<void>}
   */
  const checkIfFavorite = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        setIsFavorite(favorites.some(fav => fav.id === item.id));
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error checking favorites:', error);
      setIsFavorite(false);
    }
  };

  /**
   * Toggles property favorite status
   * @async
   * @function toggleFavorite
   * @returns {Promise<void>}
   */
  const toggleFavorite = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

      if (isFavorite) {
        favorites = favorites.filter(fav => fav.id !== item.id);
      } else {
        if (!favorites.some(fav => fav.id === item.id)) {
          favorites.push(item);
        }
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);

      // Update favorites list without navigation
      // Notify favorites screen of changes without navigation side effects
      if (navigation.getState().routes.find(route => route.name === 'Favorites')) {
        navigation.getState().routes.find(route => route.name === 'Favorites').params = {
          favoritesUpdateTimestamp: Date.now(),
          source: 'propertyDetails'
        };
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  /**
   * Handles submission of a new review
   * @async
   * @function handleSubmitReview
   * @returns {Promise<void>}
   */
  const handleSubmitReview = async () => {
    const responseStudents = await fetch('https://cs262-webapp.azurewebsites.net/students');
    const jsonStudents = await responseStudents.json();
    const dataStudents = jsonStudents;

    let studentID = -1;
    for(let i = 0; i < dataStudents.length; i++) {
      if(dataStudents[i].email === email) {
        studentID = dataStudents[i].id;
        break;
      }
    }

    if (studentID === -1) {
      alert('Login error: try logging out and back in');
      return;
    }

    if(await reviewExists(studentID, parseInt(item.id, 10) + 1)) {
      alert('You have already reviewed this property');
      return;
    }
    
    if (!rating || !reviewText.trim()) {
      alert('Please provide both a rating and review text');
      return;
    }

    await createReview(studentID, parseInt(item.id, 10) + 1, rating, reviewText);
    setModalVisible(false);
    getReviews();
  };


  return (
    <View style={styles.container}>

      {/* Header Banner */}
      <View style={styles.titleBanner}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={[styles.headerButton, { position: 'absolute', left: 10, bottom: 40 }]}
        >
          <Text style={[styles.headerButtonText, { color: '#F3CD00' }]}>&lt; Back</Text>
        </TouchableOpacity>
        <Text style={styles.propertiesTitle}>Details</Text>
      </View>

      {/* Help Button */}
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate('Help')}
      >
        <Ionicons name="help-circle-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView style={styles.detailsContainer}>
        <StatusBar backgroundColor="#8C2131" barStyle="light-content" />

        {item.banner_image && (
          <Image
            source={{ uri: item.banner_image }}
            style={styles.propertyImage}
          />
        )}

        <View style={styles.detailsContent}>
          <View style={styles.sectionContainer}>
            {/* Rating and Favorites Button Row */}
            <View style={styles.ratingFavoriteRow}>
              <View style={styles.ratingContainer}>
                <Text style={styles.detailLabel}>Rating:</Text>
                <View style={styles.starContainer}>
                  <StarRating rating={item.rating} />
                </View>
              </View>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={toggleFavorite}
              >
                <Text style={styles.favoriteButtonText}>
                  {isFavorite ? 'Remove Favorites' : 'Add Favorites'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Property Details Section */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Address:</Text>
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>{item.address}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Bedrooms:</Text>
              <Text style={styles.detailValue}>{item.bedrooms}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Bathrooms:</Text>
              <Text style={styles.detailValue}>{item.bathrooms}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Estimated Cost:</Text>
              <Text style={styles.detailValue}>${item.estimated_cost}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Distance from Campus:</Text>
              <Text style={styles.detailValue}>{item.distance_from_campus} miles</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Distance from Bus Stop:</Text>
              <Text style={styles.detailValue}>{item.distance_from_bus_stop} miles</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Pet Friendly:</Text>
              <Text style={styles.detailValue}>{item.pet_friendly ? 'Yes' : 'No'}</Text>
            </View>
          </View>

          {/* Contact Information Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Landlord Name:</Text>
              <Text style={styles.detailValue}>{item.landlord_name}</Text>
            </View>

            {item.contact_phone && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.detailValue}>{item.contact_phone}</Text>
              </View>
            )}

            {item.contact_email && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailValue}>{item.contact_email}</Text>
              </View>
            )}
          </View>

          {/* Reviews Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.reviewHeaderContainer}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity
                style={styles.leaveReviewButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.leaveReviewButtonText}>Leave Review</Text>
              </TouchableOpacity>

            </View>

            {/* Reviews list */}
            <View style={styles.reviewsContainer}>
              {reviewLoading ? (
                <ActivityIndicator size="large" color="#8C2131" />
              ) : (
                <>
                  {reviews.length === 0 ? (
                    <Text style={styles.noReviewsText}>No reviews yet</Text>
                  ) : (
                    reviews.map(review => (
                      <View key={review.id} style={styles.reviewItem}>
                        <View style={styles.reviewHeader}>
                          {/* Add user name here if available */}
                          <Text style={styles.reviewUser}>{review.userName}</Text>
                          <Text style={styles.reviewDate}>
                            {new Date(review.date).toLocaleDateString()}
                          </Text>
                        </View>
                        <View style={styles.reviewRating}>
                          <StarRating rating={review.rating} />
                        </View>
                        <Text style={styles.reviewText}>{review.text}</Text>
                      </View>
                    ))
                  )}
                </>
              )}

            </View>

          </View>

        </View>

        {/* Review Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Leave a Review</Text>

              {/* Star Rating */}
              <View style={styles.starRatingContainer}>
                <Text style={styles.starRatingLabel}>Your Rating:</Text>
                <View style={styles.starStarContainer}>
                  <StarRatingReview
                    rating={rating}
                    onRatingChange={setRating}
                    starSize={30}
                    interactive={true}
                  />
                </View>
              </View>



              {/* Review Text Input */}
              <TextInput
                style={styles.reviewInput}
                multiline
                numberOfLines={4}
                placeholder="Write your review here..."
                value={reviewText}
                onChangeText={setReviewText}
              />

              {/* Buttons */}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setModalVisible(false);
                    setReviewText('');
                    setRating(0);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={() => handleSubmitReview()}  // Make sure this is properly bound
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

PropertyDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        banner_image: PropTypes.string,
        rating: PropTypes.number,
        address: PropTypes.string,
        bedrooms: PropTypes.number,
        bathrooms: PropTypes.number,
        estimated_cost: PropTypes.number,
        distance_from_campus: PropTypes.number,
        distance_from_bus_stop: PropTypes.number,
        pet_friendly: PropTypes.bool,
        landlord_name: PropTypes.string,
        contact_phone: PropTypes.string,
        contact_email: PropTypes.string,
      }).isRequired,
      email: PropTypes.string,
      fromFavorites: PropTypes.bool,
      favoritesUpdated: PropTypes.bool,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    getParent: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
};