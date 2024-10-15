import { StyleSheet, Dimensions } from 'react-native';

// maroon: 8C2131
// gold: F3CD00
// white: FFFFFF
// grey: 808080
// black: 000000
const { width } = Dimensions.get('window'); // Get the width of the screen

export default styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#8C2131',
    barStyle: 'light-content',
  },

  //home screen styles

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
    borderColor: '#00000', // Border color
    padding: 30, // Padding inside the box
    backgroundColor: "#8C2131", // Optional: background color with opacity
    borderRadius: 5, // Optional: rounded corners
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  // button and link styles
  link: {
    color: '#8C2131',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  button: {
    borderWidth: 4,
    borderColor: '#000', // Border color
    backgroundColor: '#8C2131',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },

  //properties screen styles

  propertiesContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  propertiesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#F3CD00',
  },

  filterMenuButton: {
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#8C2131',
    padding: 10,
    borderRadius: 5,
  },

  propertyItem: {
    padding: 10,
    fontSize: 18,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#000000',
  },

  //Popup menu styles

  buttonRow: {
    flexDirection: 'row',
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
    marginBottom: 10,
  },

  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
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
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5, // Add some space between the text input and the "miles" text
  },

  //property details screen styles

  propertyImage: {
    width: width, // '100%',
    height: 200,
    resizeMode: 'cover',
  },
});  