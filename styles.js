import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    statusBar: {
      backgroundColor: '#4E0101',
      barStyle: 'light-content',
    },
    
    //home screen styles

    homeContainer: {
      flex: 1,
      backgroundColor: '#4E0101',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    text1: {
      color: '#fff',
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
      backgroundColor: '#4E0101',
      paddingTop: 50,
      paddingHorizontal: 20,
    },
  
    propertiesTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#fff',
    },
  
    propertyItem: {
      fontSize: 18,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      color: '#fff',
    },

    //property details screen styles

    propertyImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
  });  