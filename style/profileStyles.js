import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default styles = StyleSheet.create({

        container: {
          flex: 1,
          backgroundColor: '#fff',
        },
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
        infoSection: {
          padding: 20,
        },
        infoRow: {
          marginBottom: 20,
          backgroundColor: '#f8f8f8',
          borderRadius: 10,
          padding: 15,
        },
        infoItem: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        infoTextContainer: {
          flex: 1,
          marginLeft: 15,
        },
        infoLabel: {
          color: '#666',
          fontSize: 12,
        },
        infoText: {
          color: '#000',
          fontSize: 16,
          marginTop: 2,
        },
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
          marginTop: 10,
          borderWidth: 1,
          borderColor: '#8C2131',
        },
        logoutText: {
          color: '#8C2131',
        },
      });