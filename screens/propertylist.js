import React, { useState } from 'react';
import CheckBox from 'expo-checkbox';
import { Image, StatusBar, Text, View, Button, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from '../style/styles'; //Import the styles from styles.js
import properties from '../properties'; //Import the properties from properties.js

const filters = [
  { id: '1', label: 'Pet Friendly' },
  { id: '2', label: 'Has Contact' },
  { id: '3', label: 'Has Banner' },
  { id: '4', label: 'Distance Less than ' },
];

export default function PropertiesScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [displayedProperties, setDisplayedProperties] = useState(properties);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [numAppliedFilters, setNumAppliedFilters] = useState(0);
  const [distance, setDistance] = useState('');
  const [tempDistance, setTempDistance] = useState('');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      setTempSelectedFilters(selectedFilters);
      setTempDistance(distance);
    }
  };

  const handleCheckboxChange = (filterId) => {
    let updatedFilters = [...tempSelectedFilters];
    if (filterId === '4') {
      // Toggle the distance filter
      if (updatedFilters.includes(filterId)) {
        updatedFilters = updatedFilters.filter(id => id !== filterId);
      } else {
        updatedFilters.push(filterId);
      }
    } else {
      // Handle other filters
      if (updatedFilters.includes(filterId)) {
        updatedFilters = updatedFilters.filter(id => id !== filterId);
      } else {
        updatedFilters.push(filterId);
      }
    }
    setTempSelectedFilters(updatedFilters);
    setFilteredProperties(getFilteredProperties(updatedFilters, tempDistance));
  };

  const getFilteredProperties = (filters, distance) => {
    let filteredProperties = properties;

    if (filters.includes('1')) {
      filteredProperties = filteredProperties.filter((property) => property.pet_friendly);
    }
    if (filters.includes('2')) {
      filteredProperties = filteredProperties.filter((property) => (property.contact_phone || property.contact_email));
    }
    if (filters.includes('3')) {
      filteredProperties = filteredProperties.filter((property) => property.banner_image);
    }
    if (filters.includes('4') && distance) {
      const distanceValue = parseFloat(distance);
      if (!isNaN(distanceValue)) {
        filteredProperties = filteredProperties.filter(property => {
          // Assuming property.distance is the distance of the property
          return property.distance_from_campus <= distanceValue;
        });
      }
    }

    return filteredProperties;
  }

  const applyFilters = () => {
    toggleModal();
    setSelectedFilters(tempSelectedFilters);
    setDistance(tempDistance);

    const filteredProperties = getFilteredProperties(tempSelectedFilters, tempDistance);

    setDisplayedProperties(filteredProperties);
    setNumAppliedFilters(tempSelectedFilters.length + (!tempDistance && tempSelectedFilters.includes('4') ? -1 : 0));
  };

  return (
    <View style={styles.propertiesContainer}>

      {/* Title Banner */}
      <View style={styles.titleBanner}>
        <Text style={styles.propertiesTitle}>Properties</Text>
      </View>

      {/* Filter button and results count swapped and placed side by side */}
      <View style={styles.filterAndResultsContainer}>
        <View style={styles.resultsBox}>
          <Text style={styles.buttonText}>{displayedProperties.length} results found</Text>
        </View>

        {/* The entire filter box is now the button */}
        <TouchableOpacity style={styles.filterBox} onPress={toggleModal}>
          <Text style={styles.buttonText}>
            Filters
            {numAppliedFilters !== 0 && (
              <Text style={styles.buttonText}> ({numAppliedFilters} applied)</Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Properties List */}
      <FlatList
        data={displayedProperties}
        renderItem={({ item }) => (
          <Text
            style={styles.propertyList}
            onPress={() => navigation.navigate('PropertyDetails', {
              item: item,
            })}
          >
            {item.name ? item.name : item.address}
          </Text>
        )}
        keyExtractor={item => item.id}
      />

      {/* Modal for Filters */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Filtering Menu</Text>
            {filters.map((filter) => (
              <View key={filter.id} style={styles.checkboxContainer}>
                <CheckBox
                  style={styles.checkbox}
                  value={tempSelectedFilters.includes(filter.id)}
                  onValueChange={() => handleCheckboxChange(filter.id)}
                />
                <Text style={styles.checkboxLabel}>{filter.label} </Text>
                {filter.id === '4' ? (
                  <View style={styles.distanceInputContainer}>
                    <TextInput
                      style={[
                        styles.textInput,
                        (selectedFilters.includes('4') && !distance ? styles.textInputError : null),
                      ]}
                      placeholder="Enter distance"
                      keyboardType="numeric"
                      value={tempDistance}
                      onChangeText={(text) => {
                        setTempDistance(text);
                        setFilteredProperties(getFilteredProperties(tempSelectedFilters, text));
                      }}
                    />
                    <Text style={styles.checkboxLabel}>miles</Text>
                  </View>
                ) : null}
              </View>
            ))}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.filterMenuButton} onPress={applyFilters}>
                <Text style={styles.filtersText}>Show {filteredProperties.length} Results</Text>
              </TouchableOpacity>
              <View style={{ width: 10 }} />
              <TouchableOpacity style={styles.filterMenuButton} onPress={() => { setTempSelectedFilters([]); setTempDistance('') }}>
                <Text style={styles.filtersText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 10 }} />
            <TouchableOpacity style={styles.filterMenuButton} onPress={toggleModal}>
              <Text style={styles.filtersText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}



