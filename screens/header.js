import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/styles';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
        <Text style={styles.headerButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      {/* Profile Button */}
      {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.headerButton}>
        <Text style={styles.headerButtonText}>Profile</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Header;