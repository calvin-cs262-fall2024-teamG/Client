import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style/profileStyles';

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState({
    username: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'Boston, MA',
    joinDate: 'January 2024',
  });

  return (
    <ScrollView style={styles.container}>

      {/* Profile Picture Section */}
      <View style={styles.profileImageSection}>
        <View style={styles.profileImageContainer}>
          {/* Default profile image or user image */}
          <View style={styles.profileImage}>
            <Text style={styles.profileInitials}>
              {userProfile.username.split(' ').map(name => name[0]).join('')}
            </Text>
          </View>
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="person-outline" size={24} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Username</Text>
              <Text style={styles.infoText}>{userProfile.username}</Text>
            </View>
            {/* <TouchableOpacity>
              <Ionicons name="create-outline" size={24} color="#8C2131" />
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={24} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoText}>{userProfile.email}</Text>
            </View>
            {/* <TouchableOpacity>
              <Ionicons name="create-outline" size={24} color="#8C2131" />
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={24} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoText}>{userProfile.phone}</Text>
            </View>
            {/* <TouchableOpacity>
              <Ionicons name="create-outline" size={24} color="#8C2131" />
            </TouchableOpacity> */}
          </View>
        </View>

      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings-outline" size={24} color="#666" />
          <Text style={styles.actionButtonText}>Manage Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
          <Ionicons name="log-out-outline" size={24} color="#8C2131" />
          <Text style={[styles.actionButtonText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
