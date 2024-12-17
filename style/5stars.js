import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Star Rating Component
 * Displays a 5-star rating visualization using overlapping filled and empty stars
 * @component
 * @param {Object} props - Component properties
 * @param {number} props.rating - Rating value between 0 and 5
 * @returns {JSX.Element} Rendered StarRating component
 */
const StarRating = ({ rating }) => {
  /**
   * Calculates the percentage width for filled stars
   * @type {number}
   */
  const percentage = (rating / 5) * 100; 

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

/**
 * PropTypes for the StarRating component
 * @type {Object}
 */
StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

/**
 * Styles for the StarRating component
 * @constant
 * @type {Object}
 */
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