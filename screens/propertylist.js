import React, { useState, useEffect } from 'react';
import { Image, Text, View, Button, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import ScreenHeader from '../components/ScreenHeader';
import styles from '../style/styles';
import tabStyles from '../style/tabStyles';
import properties from '../properties';

const filters = [
  { id: '1', label: 'Pet Friendly' },
  { id: '2', label: 'Has Contact' },
  { id: '4', label: 'Distance Less than ' },
  { id: '5', label: 'Bus Stop Less than ' },
  { id: '6', label: 'Price Less than $' },
];

export default function PropertiesScreen({ navigation }) {
  const [modalFilteringVisible, setModalFilteringVisible] = useState(false);
  const [modalSortingVisible, setModalSortingVisible] = useState(false);
  const [displayedProperties, setDisplayedProperties] = useState(properties); // Initialize with properties
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [numAppliedFilters, setNumAppliedFilters] = useState(0);
  const [distance, setDistance] = useState('');
  const [tempDistance, setTempDistance] = useState('');
  const [distanceStyle, setDistanceStyle] = useState(styles.textInput);
  const [busDistance, setBusDistance] = useState('');
  const [tempBusDistance, setTempBusDistance] = useState('');
  const [busDistanceStyle, setBusDistanceStyle] = useState(styles.textInput);
  const [priceHigh, setPriceHigh] = useState('');
  const [tempPriceHigh, setTempPriceHigh] = useState('');
  const [priceHighStyle, setPriceHighStyle] = useState(styles.textInputSmall);
  const [sortType, setSortType] = useState('Rating');

  const isFocused = useIsFocused();

  // Initialize properties when component mounts
  useEffect(() => {
    setDisplayedProperties(properties);
  }, []); // Empty dependency array means this runs once on mount

  // Handle focus effects
  useEffect(() => {
    if (isFocused) {
      // Refresh the displayed properties when screen is focused
      const filteredProps = getFilteredProperties(selectedFilters, distance, busDistance, priceHigh);
      setDisplayedProperties(filteredProps);
    }
  }, [isFocused]);

  const toggleModalFiltering = () => {
    setModalFilteringVisible(!modalFilteringVisible);
    if (!modalFilteringVisible) {
      setTempSelectedFilters(selectedFilters);
      setTempDistance(distance);
      setTempBusDistance(busDistance);
      setTempPriceHigh(priceHigh);
    } else {
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
    } else if (filterId === '5') {
      if (updatedFilters.includes(filterId)) {
        updatedFilters = updatedFilters.filter(id => id !== filterId);
        setBusDistanceStyle(styles.textInput);
      } else {
        updatedFilters.push(filterId);

        if (tempBusDistance == '') setBusDistanceStyle(styles.textInputError);
      }
    } else if (filterId === '6') {
      if (updatedFilters.includes(filterId)) {
        updatedFilters = updatedFilters.filter(id => id !== filterId);
        setPriceHighStyle(styles.textInputSmall);
      } else {
        updatedFilters.push(filterId);

        if (tempPriceHigh == '') setPriceHighStyle(styles.textInputSmallError);
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
    setFilteredProperties(getFilteredProperties(updatedFilters, tempDistance, tempBusDistance, tempPriceHigh));
  };

  const getFilteredProperties = (filters, distance_in, busDistance_in, priceHigh_in) => {
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
    if (filters.includes('4') && distance_in) {
      const distanceValue = parseFloat(distance_in);
      if (!isNaN(distanceValue)) {
        filteredProperties = filteredProperties.filter(property => (property.distance_from_campus < distanceValue));
      }
    }
    if (filters.includes('5') && busDistance_in) {
      const busDistanceValue = parseFloat(busDistance_in);
      if (!isNaN(busDistanceValue)) {
        filteredProperties = filteredProperties.filter(property => (property.distance_from_bus_stop < busDistanceValue));
      }
    }
    if (filters.includes('6') && priceHigh_in) {
      const priceHighValue = parseFloat(priceHigh_in);
      if (!isNaN(priceHighValue)) {
        filteredProperties = filteredProperties.filter(property => (property.estimated_cost < priceHighValue));
      }
    }

    return filteredProperties;
  }

  const applyFilters = () => {
    toggleModalFiltering();
    setSelectedFilters(tempSelectedFilters);
    setDistance(tempDistance);
    setBusDistance(tempBusDistance);
    setPriceHigh(tempPriceHigh);

    const filteredProperties = getFilteredProperties(tempSelectedFilters, tempDistance, tempBusDistance, tempPriceHigh);

    setDisplayedProperties(filteredProperties);
    setNumAppliedFilters(tempSelectedFilters.length + (!tempDistance && tempSelectedFilters.includes('4') ? -1 : 0) + (!tempBusDistance && tempSelectedFilters.includes('5') ? -1 : 0) + (!tempPriceHigh && tempSelectedFilters.includes('6') ? -1 : 0));
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
      case 'Bus Stop':
        sortedProperties.sort((a, b) => a.distance_from_bus_stop > b.distance_from_bus_stop ? 1 : -1);
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
    <View style={[styles.propertiesContainer, tabStyles.container]}>
      <ScreenHeader title="Properties" />

      <View style={styles.filterAndResultsContainer}>
        <TouchableOpacity style={styles.sortingBox} onPress={toggleModalSorting}>
          <Text style={styles.buttonText}>
            Sorting by: {sortType}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBox} onPress={toggleModalFiltering}>
          <Text style={styles.buttonText}>
            Filters
            {numAppliedFilters !== 0 && (
              <Text style={styles.buttonText}> ({numAppliedFilters} applied)</Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resultsFoundText}>{displayedProperties.length} results found</Text>
      
      <FlatList
        data={displayedProperties}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.propertyListItem}
            onPress={() => navigation.navigate('PropertyDetails', {
              item: item,
              favoritesUpdated: false
            })}
          >
            <Text style={styles.propertyList}>
              {item.name ? item.name : item.address}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
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
                        setFilteredProperties(getFilteredProperties(tempSelectedFilters, text, tempBusDistance, tempPriceHigh));
                        if (text == '' && filters.includes('4')) setDistanceStyle(styles.textInputError);
                        else setDistanceStyle(styles.textInput);
                      }}
                    />
                    <Text style={styles.checkboxLabel}>miles</Text>
                  </View>
                ) : null}
                {filter.id === '5' ? (
                  <View style={styles.distanceInputContainer}>
                    <TextInput
                      style={busDistanceStyle}
                      placeholder="Enter distance"
                      keyboardType="numeric"
                      value={tempBusDistance}
                      onChangeText={(text) => {
                        setTempBusDistance(text);
                        setFilteredProperties(getFilteredProperties(tempSelectedFilters, tempDistance, text, tempPriceHigh));
                        if (text == '' && filters.includes('5')) setBusDistanceStyle(styles.textInputError);
                        else setBusDistanceStyle(styles.textInput);
                      }}
                    />
                    <Text style={styles.checkboxLabel}>miles</Text>
                  </View>
                ) : null}
                {filter.id === '6' ? (
                  <View style={styles.distanceInputContainer}>
                    <TextInput
                      style={priceHighStyle}
                      placeholder="Enter price"
                      keyboardType="numeric"
                      value={tempPriceHigh}
                      onChangeText={(text) => {
                        setTempPriceHigh(text);
                        setFilteredProperties(getFilteredProperties(tempSelectedFilters, tempDistance, tempBusDistance, text));
                        if (text == '' && filters.includes('6')) setPriceHighStyle(styles.textInputSmallError);
                        else setPriceHighStyle(styles.textInputSmall);
                      }}
                    />
                    <Text style={styles.checkboxLabel}>per month</Text>
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
                setTempDistance('');
                setTempBusDistance('');
                setTempPriceHigh('');
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
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortProperties('Bus Stop')}>
                <Text style={styles.filtersText}>Sort by Distance to Bus (low to high)</Text>
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



