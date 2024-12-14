import { StyleSheet } from 'react-native';
// import { Dimensions } from 'react-native';
// const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  // Container
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Profile Image Section
  profileImageSection: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#8C2131',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#666',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  displayName: {
    fontSize: 24,
    marginTop: 10,
  },

  // Info Section
  emailSectionContainer: {
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
    margin: 16,
  },
  emailRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'flex-start',
  },
  emailLabel: {
    width: 120,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  emailValue: {
    flex: 2,
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },

  // Action Buttons
  actionButtons: {
    padding: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  actionButtonText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8C2131',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center', // Centers the button horizontally
    width: '80%', // Controls the width of the button
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },

  //Reviews 
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
    margin: 16,
  },

  reviewHeaderContainer: {
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

  reviewsContainer: {
    marginTop: 8,
  },

  reviewItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewDate: {
    color: '#666',
    fontSize: 12,
  },
  reviewRating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  reviewContent: {
    fontSize: 14,
    color: '#666',
  },
  noReviewsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  helpButton: {
    position: 'absolute',
    top: 40, // Adjust based on your screen's safe area
    right: 20, // Adjust based on desired spacing
    backgroundColor: '#8C2131',
    padding: 10,
    borderRadius: 50,
    zIndex: 10, // Ensure it appears above other elements
  },
  
  helpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default styles;