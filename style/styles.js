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

  propertiesPageText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#F3CD00',
  },

  // Properties Title Banner
  titleBanner: {
    width: '100%',
    height: 100,
    backgroundColor: '#8C2131',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,  // Padding to adjust the title position
    paddingBottom: 30,  // Padding to adjust the title position
  },

  propertiesTitle: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white', // Or could be gold: #F3CD00 
    fontStyle: 'italic',
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
  Llink: {
    color: '#F3CD00',
    fontSize: 16,
    marginVertical: 10,
  },
  Lfooter: {
    flexDirection: 'row',
    marginTop: 20,
  },
  LfooterText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  //Header styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#8C2131', // Maroon
    borderBottomWidth: 1,
    borderBottomColor: '#8C2131',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#8C2131', // Maroon to blend in (for now)
    fontWeight: '600',
  },
  headerButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#8C2131', // Maroon color
    borderRadius: 3,
    borderColor: '#F3CD00', // Gold color
    borderWidth: 1,
    marginVertical: 15,
  },
  headerButtonText: {
    color: '#F3CD00', // Gold text for contrast
    fontSize: 16,
    fontWeight: '500',
  },

  resultsFoundText: {
    alignSelf: 'flex-start',
    fontSize: 16,
    padding: 10,
  },
});