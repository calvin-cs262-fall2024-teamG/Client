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
      paddingTop: 50,
      paddingHorizontal: 20,
    },
  
    propertiesTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#F3CD00',
    },
  
    propertyItem: {
      fontSize: 18,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      color: '#000000',
    },

    //property details screen styles

    propertyImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
  });  