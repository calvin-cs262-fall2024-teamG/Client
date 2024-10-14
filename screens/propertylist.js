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
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [numAppliedFilters, setNumAppliedFilters] = useState(0);
  const [distance, setDistance] = useState('');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleCheckboxChange = (filterId) => {
    if (filterId === '4') {
      // Toggle the distance filter
      if (selectedFilters.includes(filterId)) {
        setSelectedFilters(selectedFilters.filter(id => id !== filterId));
        setDistance(''); // Reset distance when filter is deselected
      } else {
        setSelectedFilters([...selectedFilters, filterId]);
      }
    } else {
      // Handle other filters
      if (selectedFilters.includes(filterId)) {
        setSelectedFilters(selectedFilters.filter(id => id !== filterId));
      } else {
        setSelectedFilters([...selectedFilters, filterId]);
      }
    }
  };

  const applyFilters = () => {
    let filteredProperties = properties;

    if (selectedFilters.includes('1')) {
      filteredProperties = filteredProperties.filter((property) => property.pet_friendly);
    }
    if (selectedFilters.includes('2')) {
      filteredProperties = filteredProperties.filter((property) => (property.contact_phone || property.contact_email));
    }
    if (selectedFilters.includes('3')) {
      filteredProperties = filteredProperties.filter((property) => property.banner_image);
    }
    if (selectedFilters.includes('4') && distance) {
      const distanceValue = parseFloat(distance);
      if (!isNaN(distanceValue)) {
        filteredProperties = filteredProperties.filter(property => {
          // Assuming property.distance is the distance of the property
          return property.distance_from_campus <= distanceValue;
        });
      }
    }

    // Add more filter conditions here as needed

    setDisplayedProperties(filteredProperties);
    setNumAppliedFilters(selectedFilters.length + (distance ? 0 : -1));
    toggleModal();
  };

  return (
    <View style={styles.propertiesContainer}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.propertiesTitle}>Properties</Text>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>
            Filters
            {numAppliedFilters != 0 && (
              <Text style={styles.buttonText}> ({numAppliedFilters} applied)</Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.resultsText}> {displayedProperties.length} results found</Text>
      <FlatList
        data={displayedProperties}
        renderItem={({ item }) => (
          <Text
            style={styles.propertyItem}
            onPress={() => navigation.navigate('PropertyDetails', {
              item: item,
            })}
          >
            {item.address}
          </Text>)
        }
        keyExtractor={item => item.id}
      />
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
                  value={selectedFilters.includes(filter.id)}
                  onValueChange={() => handleCheckboxChange(filter.id)}
                />
                <Text style={styles.checkboxLabel}>{filter.label} </Text>
               {filter.id === '4' && selectedFilters.includes('4') ? (
                  <View style={styles.distanceInputContainer}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter distance"
                      keyboardType="numeric"
                      value={distance}
                      onChangeText={setDistance}
                    />
                    <Text style={styles.checkboxLabel}> miles</Text>
                  </View>
                ) : null}
              </View>
            ))}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.filterMenuButton} onPress={applyFilters}>
                <Text style={styles.buttonText}>Apply Filters</Text>
              </TouchableOpacity>
              <View style={{ width: 10 }} />
              <TouchableOpacity style={styles.filterMenuButton} onPress={() => setSelectedFilters([])}>
                <Text style={styles.buttonText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 10 }} />
            <TouchableOpacity style={styles.filterMenuButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View >
      </Modal >
    </View >
  );
}