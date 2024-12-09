import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar } from 'react-native';
import styles from '../style/styles';

export default function ScreenHeader({ title }) {
  return (
    <>
      <StatusBar backgroundColor="#8C2131" barStyle="light-content" />
      <View style={styles.titleBanner}>
        <Text style={styles.propertiesTitle}>{title}</Text>
      </View>
    </>
  );
}

ScreenHeader.propTypes = {
  title: PropTypes.string.isRequired,
};