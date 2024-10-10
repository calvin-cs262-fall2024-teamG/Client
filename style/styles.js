import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#8C2131',
    barStyle: 'light-content',
  },

  //home screen styles

  homeContainer: {
    flex: 1,
    backgroundColor: '#8C2131',
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
    fontSize: 35,
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
    color: '#F3CD00',
  },

  menuButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },

  menuButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  propertyItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#000000',
  },

  //Popup menu styles

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

  //property details screen styles

  propertyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});