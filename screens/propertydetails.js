import React, {useState, useEffect} from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useIsFocused, useRoute } from '@react-navigation/native';
import styles from '../style/styles';
import StarRating from '../style/5stars';
import StarRatingReview from '../style/starsRating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal, TextInput } from 'react-native';

export default function PropertyDetailsScreen({ route, navigation }) {
  const { item, fromFavorites = false } = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);


  // Check favorite status when screen is focused or when favorites are updated
  useEffect(() => {
    if (isFocused) {
      checkIfFavorite();
    }
  }, [isFocused]);

  const handleBackPress = () => {
    if (route.params?.fromFavorites) {
      navigation.goBack(); // This will go back to FavoritesList
    } else {
      navigation.goBack(); // This will go back to PropertiesList
    }
  };

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
  
  
  
  const handleSubmitReview = async () => {
    if (!rating || !reviewText.trim()) {
      // Add validation
      alert('Please provide both a rating and review text');
      return;
    }
  
    const newReview = {
      id: Date.now(), // temporary ID
      propertyId: item.id,
      rating: rating,
      text: reviewText,
      date: new Date().toISOString(),
      // Add user information if available
       userId: currentUser.id,
       userName: currentUser.name,
    };
  
    try {
      // Get existing reviews from AsyncStorage
      const savedReviews = await AsyncStorage.getItem('propertyReviews');
      let allReviews = savedReviews ? JSON.parse(savedReviews) : [];
      
      // Add new review
      allReviews.push(newReview);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('propertyReviews', JSON.stringify(allReviews));
      
      // Update local state
      setReviews(prevReviews => [...prevReviews, newReview]);
      
      // Reset form and close modal
      setReviewText('');
      setRating(0);
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving review:', error);
      alert('Failed to save review. Please try again.');
    }
  };

  const loadReviews = async () => {
    try {
      const savedReviews = await AsyncStorage.getItem('propertyReviews');
      if (savedReviews) {
        const allReviews = JSON.parse(savedReviews);
        // Filter reviews for this specific property
        const propertyReviews = allReviews.filter(review => review.propertyId === item.id);
        setReviews(propertyReviews);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };
  
  // Add this to your useEffect
  useEffect(() => {
    if (isFocused) {
      checkIfFavorite();
      loadReviews(); // Load reviews when screen is focused
    }
  }, [isFocused]);
  
  

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
              <Text style={styles.detailLabel}>Beds:</Text>
              <Text style={styles.detailValue}>{item.beds}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Baths:</Text>
              <Text style={styles.detailValue}>{item.baths}</Text>
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
  {reviews.length === 0 ? (
    <Text style={styles.noReviewsText}>No reviews yet</Text>
  ) : (
    reviews.map(review => (
      <View key={review.id} style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          {/* Add user name here if available */}
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