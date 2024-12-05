import React, {useState, useEffect} from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useIsFocused, useRoute } from '@react-navigation/native';
import styles from '../style/styles';
import StarRating from '../style/5stars';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PropertyDetailsScreen({ route, navigation }) {
  const { item, favoritesUpdated, fromFavorites = false } = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkIfFavorite();
    }
  }, [isFocused, route.params?.favoritesUpdated]);

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

      // Update the favorites screen
      if (navigation.getParent()) {
        navigation.getParent().setParams({ favoritesUpdated: Date.now() });
      }

      // If removing from favorites while in favorites view, navigate back
      if (fromFavorites && isFavorite) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
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
        </View>
      </ScrollView>
    </View>
  );
}

