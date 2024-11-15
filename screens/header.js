import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../style/styles';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const route = useRoute();

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
          </>
        );

      default:
        return <Text style={styles.headerTitle}>{title}</Text>;
    }
  };

  return (
    <View style={styles.headerContainer}>
      {renderHeaderContent()}
    </View>
  );
};

export default Header;