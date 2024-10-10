import React, { useState } from 'react';
import { Image, StatusBar, Text, View, Button, FlatList, TouchableOpacity, Modal, CheckBox } from 'react-native';
import styles from '../style/styles'; //Import the styles from styles.js
import properties from '../properties'; //Import the properties from properties.js

const filters = [
  { id: '1', label: 'Pet Friendly' },
  { id: '2', label: 'Has Contact' },
  { id: '3', label: 'Has Banner' },
];

export default function PropertiesScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [displayedProperties, setDisplayedProperties] = useState(properties);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleCheckboxChange = (filterId) => {
    setSelectedFilters((prevSelectedFilters) => {
      if (prevSelectedFilters.includes(filterId)) {
        return prevSelectedFilters.filter((id) => id !== filterId);
      } else {
        return [...prevSelectedFilters, filterId];
      }
    });
  };

  const applyFilters = () => {
    let filteredProperties = properties;

    if (selectedFilters.includes('1')) {
      filteredProperties = filteredProperties.filter((property) => property.pet_friendly);
    }
    if (selectedFilters.includes('2')) {
      filteredProperties = filteredProperties.filter((property) => property.contact_phone || property.contact_email);
    }
    if (selectedFilters.includes('3')) {
      filteredProperties = filteredProperties.filter((property) => property.banner_image);
    }

    // Add more filter conditions here as needed

    setDisplayedProperties(filteredProperties);
    toggleModal();
  };

  return (
    <View style={styles.propertiesContainer}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.propertiesTitle}>Properties</Text>
        <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
          <Text style={styles.menuButtonText}>Filtering</Text>
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
                <Text style={styles.checkboxLabel}>{filter.label}</Text>
                <CheckBox
                  value={selectedFilters.includes(filter.id)}
                  onValueChange={() => handleCheckboxChange(filter.id)}
                />
              </View>
            ))}
            <Button title="Apply Filters" onPress={applyFilters} />
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}