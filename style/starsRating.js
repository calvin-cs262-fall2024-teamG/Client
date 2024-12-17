import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // This imports FontAwesome as Icon

/**
 * Star Rating Review Component
 * Displays an interactive or static star rating system
 * @component
 * @param {Object} props - Component properties
 * @param {number} props.rating - Current rating value (1-5)
 * @param {Function} props.onRatingChange - Callback function when rating changes
 * @param {number} [props.starSize=20] - Size of each star icon
 * @param {boolean} [props.interactive=false] - Whether the rating can be changed by user interaction
 * @returns {JSX.Element} Rendered StarRatingReview component
 * @example
 * // Interactive rating
 * <StarRatingReview 
 *   rating={3} 
 *   onRatingChange={(newRating) => handleRatingChange(newRating)}
 *   interactive={true}
 * />
 * 
 * // Static rating display
 * <StarRatingReview 
 *   rating={4.5} 
 *   onRatingChange={() => {}}
 *   starSize={24}
 * />
 */
const StarRatingReview = ({ rating, onRatingChange, starSize = 20, interactive = false }) => {
  /**
   * Array of possible star ratings
   * @type {number[]}
   */
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: 'row', gap: 5 }}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => interactive && onRatingChange(star)}
          disabled={!interactive}
        >
          <Icon
            name={rating >= star ? 'star' : 'star-o'}
            size={starSize}
            color="#F3CD00"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

/**
 * PropTypes for the StarRatingReview component
 * @type {Object}
 */
StarRatingReview.propTypes = {
  /**
   * Current rating value
   * @type {number}
   * @required
   */
  rating: PropTypes.number.isRequired,
  
  /**
   * Callback function when rating changes
   * @type {Function}
   * @required
   */
  onRatingChange: PropTypes.func.isRequired,
  
  /**
   * Size of each star icon
   * @type {number}
   */
  starSize: PropTypes.number,
  
  /**
   * Whether the rating can be changed by user interaction
   * @type {boolean}
   */
  interactive: PropTypes.bool,
};

/**
 * Default props for the StarRatingReview component
 * @type {Object}
 */
StarRatingReview.defaultProps = {
  starSize: 20,
  interactive: false,
};

export default StarRatingReview;