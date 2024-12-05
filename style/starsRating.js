import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // This imports FontAwesome as Icon

const StarRatingReview = ({ rating, onRatingChange, starSize = 20, interactive = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={{ flexDirection: 'row', gap: 5 }}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => interactive && onRatingChange(star)}
          disabled={!interactive}
        >
          <Icon // Change FontAwesome to Icon here
            name={rating >= star ? 'star' : 'star-o'}
            size={starSize}
            color="#F3CD00"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
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

export default StarRatingReview;