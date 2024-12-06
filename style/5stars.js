import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component
const StarRating = ({ rating }) => {
  const percentage = (rating / 5) * 100; // Assuming the rating is out of 5

  return (
    <View style={styles.starContainer}>
      <View style={styles.emptyStars}>
        <Icon name="star" style={styles.star} />
        <Icon name="star" style={styles.star} />
        <Icon name="star" style={styles.star} />
        <Icon name="star" style={styles.star} />
        <Icon name="star" style={styles.star} />
      </View>
      <View style={[styles.filledStars, { width: `${percentage}%` }]}>
        <Icon name="star" style={[styles.star, styles.filledStar]} />
        <Icon name="star" style={[styles.star, styles.filledStar]} />
        <Icon name="star" style={[styles.star, styles.filledStar]} />
        <Icon name="star" style={[styles.star, styles.filledStar]} />
        <Icon name="star" style={[styles.star, styles.filledStar]} />
      </View>
    </View>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    starContainer: {
      flexDirection: 'row',
      position: 'relative',
      width: 100, // Adjust the width as needed
      height: 20, // Adjust the height as needed
    },
    emptyStars: {
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    filledStars: {
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
    },
    star: {
      fontSize: 20, // Adjust the size as needed
      color: '#ccc', // Color for empty stars
      marginRight: 2,
    },
    filledStar: {
      color: '#FFD700', // Color for filled stars
    },
});

export default StarRating;