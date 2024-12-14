import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import ScreenHeader from '../components/ScreenHeader';
import styles from '../style/styles';
import tabStyles from '../style/tabStyles';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const filters = [
  { id: '1', label: ' Pet Friendly' },
  { id: '2', label: ' Has Contact' },
  // { id: '3', label: 'Has Banner' },
  { id: '4', label: ' School, Less than ' },
  { id: '5', label: ' Bus Stop, Less than ' },
  { id: '6', label: ' Price Less than $' },
  { id: '7', label: ' Bedrooms Equal to ' },
];

export default function PropertiesScreen({ navigation }) {
  const [modalFilteringVisible, setModalFilteringVisible] = useState(false);
  const [modalSortingVisible, setModalSortingVisible] = useState(false);
  const [displayedProperties, setDisplayedProperties] = useState([]); // Initialize with properties
  const [filteredProperties, setFilteredProperties] = useState([]);
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
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bedrooms, setBedrooms] = useState('');
  const [tempBedrooms, setTempBedrooms] = useState('');
  const [bedroomsStyle, setBedroomsStyle] = useState(styles.textInput);


  const isFocused = useIsFocused();

  const getProperties = async () => {
    let dataProperties, dataLandlords, dataPropertyLandlords;
    try {
      const responseProperties = await fetch('https://cs262-webapp.azurewebsites.net/properties');
      const reponseLandlords = await fetch('https://cs262-webapp.azurewebsites.net/landlords');
      const responsePropertyLandlords = await fetch('https://cs262-webapp.azurewebsites.net/propertylandlords');

      const jsonProperties = await responseProperties.json();
      const jsonLandlords = await reponseLandlords.json();
      const jsonPropertyLandlords = await responsePropertyLandlords.json();

      dataProperties = jsonProperties;
      dataLandlords = jsonLandlords;
      dataPropertyLandlords = jsonPropertyLandlords;


      let tempProperties = [];

      for (let i = 0; i < dataProperties.length; i++) {
        tempProperties[i] = {
          id: i,
          banner_image: dataProperties[i].bannerimage,
          address: dataProperties[i].streetaddress,
          bedrooms: dataProperties[i].bedroomnum,
          bathrooms: dataProperties[i].bathroomnum,
          landlord_name: dataLandlords[dataPropertyLandlords[i].landlordid - 1].name,
          contact_phone: dataLandlords[dataPropertyLandlords[i].landlordid - 1].phonenumber,
          contact_email: dataLandlords[dataPropertyLandlords[i].landlordid - 1].emailaddress,
          estimated_cost: dataProperties[i].price,
          distance_from_campus: dataProperties[i].distancetocalvin,
          distance_from_bus_stop: dataProperties[i].distancetobusstop,
          pet_friendly: dataProperties[i].petfriendly,
          rating: dataProperties[i].rating,
        }
      }

      tempProperties = sortProperties(tempProperties, '');

      setProperties(tempProperties);
      setDisplayedProperties(tempProperties);
      setFilteredProperties(tempProperties);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Initialize properties when component mounts

  useEffect(() => {
    getProperties();
  }, []); // Empty dependency array means this runs once on mount

  // Handle focus effects
  useEffect(() => {
    if (isFocused) {
      // Refresh the displayed properties when screen is focused
      const filteredProps = getFilteredProperties(selectedFilters, distance, busDistance, priceHigh);
      const sortedProps = sortProperties(filteredProps, sortType);
      setModalSortingVisible(false);
      setDisplayedProperties(sortedProps);
    }
  }, [isFocused]);

  const toggleModalFiltering = () => {
    setModalFilteringVisible(!modalFilteringVisible);
    if (!modalFilteringVisible) {
      setTempSelectedFilters(selectedFilters);
      setTempDistance(distance);
      setTempBusDistance(busDistance);
      setTempPriceHigh(priceHigh);
    }
    else { // If the modal is being closed

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
    } else if (filterId === '') {
      if (updatedFilters.includes(filterId)) {
        updatedFilters = updatedFilters.filter(id => id !== filterId);
        setBedroomsStyle(styles.textInput);
      } else {
        updatedFilters.push(filterId);
        if (tempBedrooms == '') setBedroomsStyle(styles.textInputError);
      }
    } 
    else {
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

  const getFilteredProperties = (filters, distance_in, busDistance_in, priceHigh_in, bedrooms_in) => {
    let filtered_Properties = properties;

    if (filters.includes('1')) {
      filtered_Properties = filtered_Properties.filter((property) => property.pet_friendly);
    }
    if (filters.includes('2')) {
      filtered_Properties = filtered_Properties.filter((property) => (property.contact_phone || property.contact_email));
    }
    if (filters.includes('3')) {
      filtered_Properties = filtered_Properties.filter((property) => property.banner_image);
    }
    if (filters.includes('4') && distance_in) {
      const distanceValue = parseFloat(distance_in);
      if (!isNaN(distanceValue)) {
        filtered_Properties = filtered_Properties.filter(property => (property.distance_from_campus < distanceValue));
      }
    }
    if (filters.includes('5') && busDistance_in) {
      const busDistanceValue = parseFloat(busDistance_in);
      if (!isNaN(busDistanceValue)) {
        filtered_Properties = filtered_Properties.filter(property => (property.distance_from_bus_stop < busDistanceValue));
      }
    }
    if (filters.includes('6') && priceHigh_in) {
      const priceHighValue = parseFloat(priceHigh_in);
      if (!isNaN(priceHighValue)) {
        filtered_Properties = filtered_Properties.filter(property => (property.estimated_cost < priceHighValue));
      }
    }
    if (filters.includes('7') && bedrooms_in) {
      const bedroomsValue = parseInt(bedrooms_in);
      if (!isNaN(bedroomsValue)) {
        filtered_Properties = filtered_Properties.filter(property => 
          property.bedrooms === bedroomsValue
        );
      }
    }
    return filtered_Properties;
  }

  const applyFilters = () => {
    toggleModalFiltering();
    setSelectedFilters(tempSelectedFilters);
    setDistance(tempDistance);
    setBusDistance(tempBusDistance);
    setPriceHigh(tempPriceHigh);
    setBedrooms(tempBedrooms);

    const filteredProperties = sortProperties(getFilteredProperties(tempSelectedFilters, tempDistance, tempBusDistance, tempPriceHigh, tempBedrooms), '');

    setNumAppliedFilters(tempSelectedFilters.length + (!tempDistance && tempSelectedFilters.includes('4') ? -1 : 0) + (!tempBusDistance && tempSelectedFilters.includes('5') ? -1 : 0) + (!tempPriceHigh && tempSelectedFilters.includes('6') ? -1 : 0) +
    (!tempBedrooms && tempSelectedFilters.includes('7') ? -1 : 0));
    setDisplayedProperties(filteredProperties);
    setModalSortingVisible(false);
  };

  const sortDefaultProperties = (sortType) => {
    setDisplayedProperties(sortProperties(displayedProperties, sortType));
  }

  const sortProperties = (sortedProperties, sortType_in) => {
    if (sortType_in != '') {
      setSortType(sortType_in);
    } else sortType_in = sortType;

    switch (sortType_in) {
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
      case 'Bedrooms':
        sortedProperties.sort((a, b) => a.bedrooms < b.bedrooms ? 1 : -1);
        break;
      case 'Bathrooms':
        sortedProperties.sort((a, b) => a.bathrooms < b.bathrooms ? 1 : -1);
        break;
      default:
        console.log('Invalid sort type');
    }
    setModalSortingVisible(false);
    return sortedProperties;
  };

  return (
    <View style={[styles.propertiesContainer, tabStyles.container]}>
      <ScreenHeader title="Properties" />
            {/* Help Button */}
            <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate('Help')}
      >
        <Ionicons name="help-circle-outline" size={24} color="#fff" />
      </TouchableOpacity>

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



      
      {/* if loading database files, display loading circle, otherwise display property list */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.resultsFoundText}>{displayedProperties.length} results found</Text>
          <FlatList
            data={displayedProperties}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.propertyListItem}
                onPress={() => navigation.navigate('PropertyDetails', {
                  item: {
                    ...item,
                    id: item.id.toString()  // Convert number to string here
                  },
                  favoritesUpdated: false,
                  fromFavorites: false
                })}
              >
                <Text style={styles.propertyList}>
                  {item.name ? item.name : item.address}
                  {'\n'}
                  Rating: {item.rating}         |         Rent: ${item.estimated_cost}/month
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </>
      )}

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
                {filter.id === '7' ? (
                  <View style={styles.distanceInputContainer}>
                    <TextInput
                      style={bedroomsStyle}
                      placeholder="Enter bedrooms"
                      keyboardType="numeric"
                      value={tempBedrooms}
                      onChangeText={(text) => {
                        setTempBedrooms(text);
                        setFilteredProperties(getFilteredProperties(tempSelectedFilters, tempDistance, tempBusDistance, tempPriceHigh, text));
                        if (text == '' && filters.includes('7')) setBedroomsStyle(styles.textInputSmallError);
                        else setBedroomsStyle(styles.textInputSmall);
                      }}
                    />
                  </View>
                ) : null}
              </View>
            ))}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.filterMenuButton} onPress={applyFilters}>
                <Text style={styles.filtersText}>Show {displayedProperties.length} Results</Text>
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
            <Text style={styles.modalText}>Sort By:</Text>
            <View style={styles.buttonColumn}>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortDefaultProperties('Distance')}>
                <Text style={styles.filtersText}>Distance to school (low to high)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortDefaultProperties('Bus Stop')}>
                <Text style={styles.filtersText}>Distance to bus (low to high)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortDefaultProperties('Cost')}>
                <Text style={styles.filtersText}>Cost ($/month) (low to high)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortDefaultProperties('Rating')}>
                <Text style={styles.filtersText}>Rating (high to low)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortDefaultProperties('Bedrooms')}>
                <Text style={styles.filtersText}># Bedrooms (high to low)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterMenuButton, { marginBottom: 5 }]} onPress={() => sortDefaultProperties('Bathrooms')}>
                <Text style={styles.filtersText}># Bathrooms (high to low)</Text>
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

PropertiesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};