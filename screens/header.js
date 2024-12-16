import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../style/styles';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleHelpPress = () => {
    // Navigate to a Help screen or show a help modal
    navigation.navigate('Help'); // You'll need to create this screen
  };

  const renderHeaderContent = () => {
    switch (route.name) {
      case 'Properties':
        return (
          <>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Favorites')} 
              style={styles.favoriteButtonProperties}
            >
              <Text style={styles.favoriteButtonText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleHelpPress}
              style={styles.helpButton}
            >
              <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
          </>
        );

      case 'PropertyDetails':
        return (
          <>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.headerButton}
            >
              <Text style={styles.headerButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Favorites')} 
              style={styles.favoriteButton}
            >
              <Text style={styles.favoriteButtonText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleHelpPress}
              style={styles.helpButton}
            >
              <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
          </>
        );

      case 'Favorites':
        return (
          <>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.headerButton}
            >
              <Text style={styles.headerButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleHelpPress}
              style={styles.helpButton}
            >
              <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
          </>
        );

      default:
        return (
          <>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity 
              onPress={handleHelpPress}
              style={styles.helpButton}
            >
              <Text style={styles.helpButtonText}>?</Text>
            </TouchableOpacity>
          </>
        );
    }
  };

  return (
    <View style={styles.headerContainer}>
      {renderHeaderContent()}
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
