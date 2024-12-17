import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { useIsFocused } from '@react-navigation/native';
import styles from '../style/styles';
import tabStyles from '../style/tabStyles';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


/**
 * FavoritesScreen component
 * Displays a list of favorite properties
 * Allows removing properties from favorites
 *
 * @export
 * @param {{ navigation: any; route: any; }} param0
 * @param {*} param0.navigation
 * @param {*} param0.route
 * @returns
 */
export default function FavoritesScreen({ navigation, route }) {
  const [favorites, setFavorites] = React.useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadFavorites();
  }, [isFocused, route.params?.favoritesUpdated]); // Reload when screen is focused or favorites are updated

  
  /**
   * loadFavorites
   * Loads favorites from AsyncStorage
   *
   * @async
   * @returns {*}
   */
  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  
  /**
   * removeFromFavorites
   * Removes a property from favorites
   *
   * @async
   * @param {*} propertyId
   * @returns {*}
   */
  const removeFromFavorites = async (propertyId) => {
    try {
      const updatedFavorites = favorites.filter(prop => prop.id !== propertyId);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      
      // Update the favorites status in case PropertyDetails screen is open
      if (navigation.getParent()) {
        navigation.getParent().setParams({ favoritesUpdated: Date.now() });
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <View style={[styles.propertiesContainer, tabStyles.container]}>
      <ScreenHeader title="Favorites" />
            {/* Help Button */}
            <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate('Help')}
      >
        <Ionicons name="help-circle-outline" size={24} color="#fff" />
      </TouchableOpacity>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {favorites.length === 0 ? (
          <Text style={[styles.propertyItem, { textAlign: 'center', marginTop: 20 }]}>
            No favorites yet
          </Text>
        ) : (
          favorites.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.propertyList}
              onPress={() => navigation.navigate('PropertyDetails', { 
                item: item,
                favoritesUpdated: Date.now(), 
                fromFavorites: true
              })}
            >
              <View>
                <Text style={styles.propertyItem}>{item.address}</Text>
                <Text style={styles.propertyItem}>${item.estimated_cost}/month</Text>
                <TouchableOpacity 
                  style={styles.editFavoritesButton}
                  onPress={() => removeFromFavorites(item.id)}
                >
                  <Text style={styles.editFavoritesButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

FavoritesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParent: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      favoritesUpdated: PropTypes.bool,
    }),
  }).isRequired,
};