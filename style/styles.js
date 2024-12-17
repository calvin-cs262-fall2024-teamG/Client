import { StyleSheet, Dimensions } from 'react-native';

// maroon: 8C2131
// gold: F3CD00
// white: FFFFFF
// grey: 808080
// black: 000000

const { width } = Dimensions.get('window'); // Get the width of the screen

export default StyleSheet.create({
  // Status bar styles remain the same
  statusBar: {
    backgroundColor: '#8C2131',
    barStyle: 'light-content',
  },

  // Basic containers and components
  homeContainer: {
    flex: 1,
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
    fontSize: 50,
  },

  textBox: {
    padding: 0,
  },

  // Log In Screen Layout
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  redBoxContainer: {
    backgroundColor: '#8C2131',
    padding: 30,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    borderColor: '#000',
    backgroundColor: '#8C2131',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,  
  },

  propertiesTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    arginTop: 40,
  },

  // Container for filter button and results text
  filterAndResultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',  
    marginTop: 0,
    marginBottom: 15,
  },

  sortingBox: {
    flex: 1,
    backgroundColor: '#F3CD00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, 
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10, 
    marginLeft: 5, 
    marginRight: 3, 
    marginTop: 3, 
  },

  // Box for filter button
  filterBox: {
    flex: 1,
    backgroundColor: '#F3CD00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7, 
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10, 
    marginLeft: 3,
    marginRight: 5, 
    marginTop: 3, 
  },

  // Box for results count
  resultsBox: {
    flex: 1,
    backgroundColor: '#F3CD00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, 
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
    marginHorizontal: 1, 
  },

  buttonColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },

  modalContainer: {
    marginTop: -220,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  checkboxLabel: {
    marginLeft: 6,
    fontSize: 15,
  },

  checkbox: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], 
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
    marginRight: 2, 
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
},

  Ltitle: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  Linput: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333333',
    width: '100%',         
    marginVertical: 10,    
  },
  Lbutton: {
    width: '100%',
    height: 50,
    backgroundColor: '#F3CD00',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40, 
},
LbuttonText: {
  color: '#8C2131',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  width: 'auto', 
  alignSelf: 'center', 
},
  Lfooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    width: '100%',
},
  Llink: {
    color: '#F3CD00',
    fontSize: 16,
    marginLeft: 5, 
  },
  LfooterText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  helperTextContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, 
},
  helperText: {
    color: '#F3CD00', 
    fontSize: 14,
    textAlign: 'center',
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
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 40,
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

  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  detailsContent: {
    padding: 16,
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
    alignItems: 'flex-start', 
  },

  addressContainer: {
    flex: 1,
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
    flex: 1, 
    marginRight: 10,
  },

  starContainer: {
    marginLeft: -60,
  },

  favoriteButton: {
    backgroundColor: '#8C2131',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 120, 
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
    top: 50, 
    right: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#8C2131',
    borderRadius: 3,
    borderColor: '#F3CD00',
    borderWidth: 1,
    zIndex: 1, 
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
    marginLeft: 10, 
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
  paddingBottom: 20,
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

// Reviews Section Styles
reviewHeaderContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
},
leaveReviewButton: {
  backgroundColor: '#8C2131',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: -15,
},
leaveReviewButtonText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '500',
},
reviewsContainer: {
  marginTop: 10,
},
noReviewsText: {
  textAlign: 'center',
  color: '#666',
  marginTop: 10,
},
reviewDate: {
  fontSize: 12,
  color: '#666',
},
reviewRating: {
  marginBottom: 5,
},
reviewText: {
  fontSize: 14,
  color: '#333',
  marginBottom: 10,
},
reviewHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 5,
},
reviewItem: {
  backgroundColor: '#f8f8f8',
  padding: 15,
  marginVertical: 5,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1.5,
  elevation: 3,
},

//Review Modal
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 20,
  width: '90%',
  maxWidth: 400,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 20,
  color: '#333',
},
reviewInput: {
  width: '100%',
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 10,
  minHeight: 100,
  textAlignVertical: 'top',
  marginBottom: 20,
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
modalButton: {
  flex: 1,
  padding: 15,
  borderRadius: 8,
  marginHorizontal: 5,
  alignItems: 'center',
},
cancelButton: {
  backgroundColor: '#f2f2f2',
},
submitButton: {
  backgroundColor: '#8C2131',
},
cancelButtonText: {
  color: '#666',
  fontWeight: '600',
},
submitButtonText: {
  color: '#fff',
  fontWeight: '600',
},

starRatingContainer: {
  alignItems: 'center',
  marginBottom: 20,
},

starRatingLabel: {
  fontSize: 16,
  marginBottom: 10,
  color: '#666',
},

starStarContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 10,
},

//help button
helpButton: {
  position: 'absolute',
  top: 40,
  right: 20,
  backgroundColor: '#8C2131',
  padding: 10,
  borderRadius: 50,
  zIndex: 10,
},

helpText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  marginLeft: 8,
},

//Help screen items
Htitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  color: '#007BFF',
},
HsectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginVertical: 15,
  color: '#333',
},
HsubTitle: {
  fontSize: 18,
  fontWeight: '600',
  marginTop: 10,
  marginBottom: 5,
  color: '#555',
},
Htext: {
  fontSize: 16,
  lineHeight: 22,
  marginBottom: 10,
  color: '#000',
},
});