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
  const [modalFilteringVisible, setModalFilteringVisible] = useState(false);
  const [modalSortingVisible, setModalSortingVisible] = useState(false);
  const [displayedProperties, setDisplayedProperties] = useState(properties);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [numAppliedFilters, setNumAppliedFilters] = useState(0);
  const [distance, setDistance] = useState('');
  const [tempDistance, setTempDistance] = useState('');
  const [distanceStyle, setDistanceStyle] = useState(styles.textInput);
  const [sortType, setSortType] = useState('Rating');

  const toggleModalFiltering = () => {
    setModalFilteringVisible(!modalFilteringVisible);
    if (!modalFilteringVisible) { // If the modal is being opened
      setTempSelectedFilters(selectedFilters);
      setTempDistance(distance);
    }
    else { // If the modal is being closed
      sortProperties('');
      setModalSortingVisible(false);
    }
  };

  const toggleModalSorting = () => {
    setModalSortingVisible(!modalSortingVisible);
  };

  const handleCheckboxChange = (filterId) => {
    let updatedFilters = [...tempSelectedFilters];
    if (filterId === '4') {
      // Toggle the distance filter
      if (updatedFilters.includes(filterId)) {
        updatedFilters = updatedFilters.filter(id => id !== filterId);
        setDistanceStyle(styles.textInput);
      } else {
        updatedFilters.push(filterId);

        if (tempDistance == '') setDistanceStyle(styles.textInputError);
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
          return property.distance_from_campus < distanceValue;
        });
      }
    }

    return filteredProperties;
  }

  const applyFilters = () => {
    toggleModalFiltering();
    setSelectedFilters(tempSelectedFilters);
    setDistance(tempDistance);

    const filteredProperties = getFilteredProperties(tempSelectedFilters, tempDistance);

    setDisplayedProperties(filteredProperties);
    setNumAppliedFilters(tempSelectedFilters.length + (!tempDistance && tempSelectedFilters.includes('4') ? -1 : 0));
  };

  const sortProperties = (sortType_in) => {
    toggleModalSorting();
    
    let sortedProperties = [...displayedProperties];
    if (sortType_in != '') setSortType(sortType_in);
    else sortType_in = sortType;
    switch (sortType_in) {
      case '':
        break;
      case 'Distance':
        sortedProperties.sort((a, b) => a.distance_from_campus > b.distance_from_campus ? 1 : -1); //> is low to high, < is high to low
        break;
      case 'Cost':
        sortedProperties.sort((a, b) => a.estimated_cost > b.estimated_cost ? 1 : -1);
        break;
      case 'Rating':
        sortedProperties.sort((a, b) => a.rating < b.rating ? 1 : -1);
        break;
      case 'Beds':
        sortedProperties.sort((a, b) => a.beds < b.beds ? 1 : -1);
        break;
      case 'Baths':
        sortedProperties.sort((a, b) => a.baths < b.baths ? 1 : -1);
        break;
      default:
        console.log('Invalid sort type');
    }
    setDisplayedProperties(sortedProperties);
  };

  return (
    <View style={styles.propertiesContainer}>
      <StatusBar backgroundColor="#8C2131" barStyle="light-content" />
      {/* Title Banner */}
      <View style={styles.titleBanner}>
        <Text style={styles.propertiesTitle}>Properties</Text>
      </View>

      {/* Filter button and results count swapped and placed side by side */}
      <View style={styles.filterAndResultsContainer}>
        <TouchableOpacity style={styles.sortingBox} onPress={toggleModalSorting}>
          <Text style={styles.buttonText}>
            Sorting by: {sortType}
          </Text>
        </TouchableOpacity>

        {/* The entire filter box is now the button */}
        <TouchableOpacity style={styles.filterBox} onPress={toggleModalFiltering}>
          <Text style={styles.buttonText}>
            Filters
            {numAppliedFilters !== 0 && (
              <Text style={styles.buttonText}> ({numAppliedFilters} applied)</Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Properties List */}
      <Text style={styles.resultsFoundText}>{displayedProperties.length} results found</Text>
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
        visible={modalFilteringVisible}
        onRequestClose={toggleModalFiltering}
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
                      style={distanceStyle}
                      placeholder="Enter distance"
                      keyboardType="numeric"
                      value={tempDistance}
                      onChangeText={(text) => {
                        setTempDistance(text);
                        setFilteredProperties(getFilteredProperties(tempSelectedFilters, text));
                        if (text == '') setDistanceStyle(styles.textInputError);
                        else setDistanceStyle(styles.textInput);
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
              <TouchableOpacity style={styles.filterMenuButton} onPress={() => {
                setTempSelectedFilters([]);
                setTempDistance('')
                setFilteredProperties(getFilteredProperties([], ''));
              }}>
                <Text style={styles.filtersText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 10 }} />
            <TouchableOpacity style={styles.filterMenuButton} onPress={toggleModalFiltering}>
              <Text style={styles.filtersText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalSortingVisible}
        onRequestClose={toggleModalSorting}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Sorting Menu</Text>
            <View style={styles.buttonColumn}>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortProperties('Distance')}>
                <Text style={styles.filtersText}>Sort by Distance (low to high)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortProperties('Cost')}>
                <Text style={styles.filtersText}>Sort by Cost (low to high)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortProperties('Rating')}>
                <Text style={styles.filtersText}>Sort by Rating (high to low)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortProperties('Beds')}>
                <Text style={styles.filtersText}>Sort by # Beds (high to low)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortProperties('Baths')}>
                <Text style={styles.filtersText}>Sort by # Baths (high to low)</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 5 }} />
            <TouchableOpacity style={styles.filterMenuButton} onPress={toggleModalSorting}>
              <Text style={styles.filtersText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}



