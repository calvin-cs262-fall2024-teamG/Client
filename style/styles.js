import { StyleSheet, Dimensions } from 'react-native';

// maroon: 8C2131
// gold: F3CD00
// white: FFFFFF
// grey: 808080
// black: 000000
const { width } = Dimensions.get('window'); // Get the width of the screen

export default styles = StyleSheet.create({
  // Status bar styles remain the same
  statusBar: {
    backgroundColor: '#8C2131',
    barStyle: 'light-content',
  },

  homeContainer: {
    flex: 1,
    //backgroundColor: '#8C2131',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text1: {
    color: '#F3CD00',
    fontFamily: 'Verdana',
    fontSize: 20,
    textAlign: 'center',
  },

  text2: {
    color: '#fff',
    fontFamily: 'Impact',
    //fontStyle: 'italic',
    fontSize: 50,
  },

  textBox: {
    borderWidth: 6,
    borderColor: '#000000', // Border color
    padding: 30, // Padding inside the box
    backgroundColor: "#8C2131", // Optional: background color with opacity
    borderRadius: 5, // Optional: rounded corners
  },

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  // button and link styles
  link: {
    color: '#8C2131',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  button: {
    width: '30%',
    borderWidth: 4,
    borderColor: '#000', // Border color
    backgroundColor: '#8C2131',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },

  filtersText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  propertiesDetailsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#F3CD00',
    marginLeft: 5,
  },

  contactInfoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#F3CD00',
    marginLeft: 25,
  },

  // Properties Title Banner
  titleBanner: {
    width: '100%',
    height: 120,
    backgroundColor: '#8C2131',
    justifyContent: 'flex-end', // Changed from 'center' to 'flex-end'
    alignItems: 'center',
    paddingBottom: 15, // Adjusted padding to move text lower
  },

  propertiesTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    marginTop: 40, // Added margin to push text down
  },

  // Container for filter button and results text
  filterAndResultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',  // Take up full width of the screen
    marginTop: 0, // Align boxes flush with the banner
    marginBottom: 15, // Space below for property listings
  },

  sortingBox: {
    flex: 1,
    backgroundColor: '#F3CD00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Increase padding for a larger box
    borderWidth: 1,
    borderColor: '#000',
  },

  // Box for filter button
  filterBox: {
    flex: 1,
    backgroundColor: '#F3CD00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Increase padding for a larger box
    borderWidth: 1,
    borderColor: '#000',
  },

  // Box for results count
  resultsBox: {
    flex: 1,
    backgroundColor: '#F3CD00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Increase padding for a larger box
    borderWidth: 1,
    borderColor: '#000',
  },

  filterMenuButton: {
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#8C2131',
    padding: 10,
    borderRadius: 5,
  },

  propertyList: {
    padding: 10,
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 5,  // Space between each property listing
    marginTop: 0,  // Space between each property listing
  },

  propertyItem: {
    padding: 10,
    fontSize: 18,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#000000',
  },

  // Popup menu styles
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 1, //for some reason, not having this makes the "show # results", "clear filters" buttons not align properly on android at least
  },

  buttonColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    width: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },

  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },

  checkbox: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], // Adjust the scale as needed
  },

  resultsText: {
    fontSize: 16,
    padding: 10,
  },

  distanceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInput: {
    height: 40,
    width: 110,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 2, // Add some space between the text input and the "miles" text
  },

  textInputError: {
    borderColor: 'red',
    borderWidth: 2,
    height: 40,
    width: 110,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 2,
  },

  textInputSmall: {
    height: 40,
    width: 90,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 2, // Add some space between the text input and the "miles" text
  },
  
  textInputSmallError: {
    borderColor: 'red',
    borderWidth: 2,
    height: 40,
    width: 90,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 2,
  },

  //property details screen styles
  propertyImage: {
    width: width, // '100%',
    height: 200,
    resizeMode: 'cover',
  },

  //Log In and Create Account Screen Styles
  Lcontainer: {
    flex: 1,
    backgroundColor: '#8C2131',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  Ltitle: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  Linput: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333333',
  },
  Lbutton: {
    width: '100%',
    height: 50,
    backgroundColor: '#F3CD00', // Gold color
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  LbuttonText: {
    color: '#8C2131',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Lfooter: {
    flexDirection: 'row',
    alignItems: 'center', // Align items in the center of the row
    marginTop: 20,
  },
  Llink: {
    color: '#F3CD00',
    fontSize: 16,
    marginLeft: 5, // Add spacing between the footer text and the link
  },
  LfooterText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  //Header styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerButton: {
    padding: 8,
    position: 'absolute',
    left: 10,
    bottom: 40,
  },
  headerButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3CD00',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 40,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailsContent: {
    padding: 16,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'flex-start', // Changed from 'center' to 'flex-start'
  },
  detailLabel: {
    width: 120, // Fixed width for labels
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },

  addressContainer: {
    flex: 1, // Takes remaining space
  },

  addressText: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap',
    textAlign: 'right',
  },

  detailValue: {
    flex: 2,
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },

  ratingFavoriteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Takes up available space
    marginRight: 10, // Adds space between rating and button
  },

  starContainer: {
    marginLeft: -60, // Moves stars closer to the "Rating:" label
  },

  favoriteButton: {
    backgroundColor: '#8C2131',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 120, // Ensures consistent button width
  },

  favoriteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  detailLabel: {
    width: 120,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },

  favoriteButtonProperties: {
    position: 'absolute',
    top: 50, // Adjust this value to match your header padding
    right: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#8C2131',
    borderRadius: 3,
    borderColor: '#F3CD00',
    borderWidth: 1,
    zIndex: 1, // This ensures the button stays on top of other elements
},

  resultsFoundText: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginTop: -5,
    marginLeft:21,
    marginBottom: 10,
  },

  //Add and remove favorites

  editFavoritesButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#8C2131',
    borderRadius: 3,
    borderColor: '#F3CD00',
    borderWidth: 1,
    marginLeft: 10, // Add spacing between the title and button
    marginTop: 10, 
    alignSelf: 'flex-start',
},

editFavoritesButtonText: {
    color: '#F3CD00',
    fontSize: 14,
    fontWeight: 'bold',
},

propertyDetailsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
},

//Favorites Scrolling
scrollContainer: {
  flex: 1,
  width: '100%',
},

scrollContentContainer: {
  flexGrow: 1,
  paddingBottom: 20, // Adds padding at the bottom of the scroll
},

propertiesContainer: {
  flex: 1,
  backgroundColor: '#fff',
},

propertyList: {
  backgroundColor: '#fff',
  padding: 15,
  marginHorizontal: 10,
  marginTop: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#ddd',
  shadowColor: '#000',
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},

itemDescription: {
  fontSize: 16,
  marginBottom: 5,
  color: '#333',
},

});