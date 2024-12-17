import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/styles';


/**
 * Help Screen Component
 * This component renders the Help Screen of the application.
 * It displays information about the application's features and usage.
 *
 * @export
 * @returns {*}
 */
export default function HelpScreen() {
  const navigation = useNavigation();

  /** Navigates to previous screen */
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Title Banner with Back Button */}
      <View style={styles.titleBanner}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={[styles.headerButton, { position: 'absolute', left: 10, bottom: 40 }]}
        >
          <Text style={[styles.headerButtonText, { color: '#F3CD00' }]}>&lt; Back</Text>
        </TouchableOpacity>
        <Text style={styles.propertiesTitle}>Help Page</Text>
      </View>

      <ScrollView style={{ padding: 20 }}>
        {/** Section: Login Page */}
        <Text style={styles.HsectionTitle}>Login Page</Text>

        {/* Subsection: Create Account */}
        <Text style={styles.HsubTitle}>Create Account:</Text>
        <Text style={styles.Htext}>• Enter an @calvin.edu email address in the ‘Email’ text box.</Text>
        <Text style={styles.Htext}>• Enter a password of your choice in the ‘Password’ text box.</Text>
        <Text style={styles.Htext}>• Retype the password in the ‘Confirm’ text box.</Text>
        <Text style={styles.Htext}>• Save your password! There is no password reset option yet.</Text>

        {/* Subsection: Log In */}
        <Text style={styles.HsubTitle}>Log In:</Text>
        <Text style={styles.Htext}>• Enter your registered email address and password.</Text>
        <Text style={styles.Htext}>• Press Log In.</Text>

        {/* Section: Navigation Bar */}
        <Text style={styles.HsectionTitle}>Navigation Bar</Text>
        <Text style={styles.Htext}>• The bar is located at the bottom of the screen.</Text>
        <Text style={styles.Htext}>• The navigation bar provides access to:</Text>
        <Text style={styles.Htext}>  - Properties List Page</Text>
        <Text style={styles.Htext}>  - Favorites Page</Text>
        <Text style={styles.Htext}>  - Profile Page</Text>
        <Text style={styles.Htext}>• The navigation bar should be accessible from every other screen.</Text>

        {/* Section: Properties List Page */}
        <Text style={styles.HsectionTitle}>Properties List Page</Text>
        <Text style={styles.Htext}>
          • This page features two yellow buttons at the top: Filter and Sort By.
        </Text>

        {/* Subsection: Sort Properties */}
        <Text style={styles.HsubTitle}>Sort Properties:</Text>
        <Text style={styles.Htext}>• Press Sort By to open the sorting menu.</Text>
        <Text style={styles.Htext}>• Select one or more sorting criteria (e.g., Rating, # Bedrooms).</Text>
        <Text style={styles.Htext}>
          • Sorting is layered, for example:
        </Text>
        <Text style={styles.Htext}>
          - Sorting by Rating first puts the highest rated properties at the top.
        </Text>
        <Text style={styles.Htext}>
          - Sorting by # Bedrooms second will sort by the number of bedrooms next. Sorting in this order prioritizes the highest ratings where bedroom counts are equal.
        </Text>

        {/* Subsection: Sort Options Explained */}
        <Text style={styles.HsubTitle}>Sort Options Explained:</Text>
        <Text style={styles.Htext}>• Distance to School: Proximity to Calvin University.</Text>
        <Text style={styles.Htext}>• Distance to Bus: Proximity to the nearest bus stop.</Text>
        <Text style={styles.Htext}>• Cost ($/month): Average monthly rent, provided by landlords.</Text>
        <Text style={styles.Htext}>• Rating: Average student reviews for the property.</Text>
        <Text style={styles.Htext}>• # Bedrooms: Number of bedrooms (as reported by landlords).</Text>
        <Text style={styles.Htext}>
          • # Bathrooms: Number of bathrooms (e.g., 0.5 = toilet + sink).
        </Text>
        <Text style={styles.Htext}>• Low to High: Smallest numbers first.</Text>
        <Text style={styles.Htext}>• High to Low: Largest numbers first.</Text>

        {/* Subsection: Filter Properties */}
        <Text style={styles.HsubTitle}>Filter Properties:</Text>
        <Text style={styles.Htext}>• Press Filter to open the filtering menu.</Text>
        <Text style={styles.Htext}>
          • Use checkboxes to select desired filters (e.g., distance, cost).
        </Text>
        <Text style={styles.Htext}>• Reset filters by pressing Clear Filters.</Text>
        <Text style={styles.Htext}>• Apply filters by pressing Show Results.</Text>

        {/* Section: Property Details Page */}
        <Text style={styles.HsectionTitle}>Property Details Page</Text>
        <Text style={styles.Htext}>• Tap a property to view details or add it to favorites.</Text>
        <Text style={styles.Htext}>• Press the red Add to Favorites button to save a property.</Text>
        <Text style={styles.Htext}>• Details Include:</Text>
        <Text style={styles.Htext}>  - Property information</Text>
        <Text style={styles.Htext}>  - Landlord contact (if available)</Text>
        <Text style={styles.Htext}>
          • Reviews: To leave a review, press the red button at the bottom of the page.
        </Text>
        <Text style={styles.Htext}>  - Rate the property (1–5 stars).</Text>
        <Text style={styles.Htext}>
          - Provide a written explanation for your rating.
        </Text>
        <Text style={styles.Htext}>
          • Ensure reviews are appropriate and accurate to avoid the moderators removing both the reviewer and review from the app.
        </Text>

        {/* Section: Favorites Page */}
        <Text style={styles.HsectionTitle}>Favorites Page</Text>
        <Text style={styles.Htext}>
          • Tap the heart button on the navigation bar to access saved properties.
        </Text>
        <Text style={styles.Htext}>
          • The favorites page stores all properties you’ve saved from the properties list.
        </Text>

        {/* Section: Profile Page */}
        <Text style={styles.HsectionTitle}>Profile Page</Text>
        <Text style={styles.Htext}>• View personal account information.</Text>
        <Text style={styles.Htext}>• Tap Log Out to sign out of the app.</Text>
        <Text style={styles.Htext}>
          • The Reviews section lists all reviews submitted by the user.
        </Text>
      </ScrollView>
    </View>
  );
}


