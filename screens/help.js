import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/styles';

export default function HelpScreen() {
  const navigation = useNavigation();

  // Function to handle the back button press
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
        <Text style={styles.propertiesTitle}>Details</Text>
      </View>

      <ScrollView style={{ padding: 20 }}>
                {/* Section: Login Page */}
                <Text style={styles.sectionTitle}>Login Page</Text>

{/* Subsection: Create Account */}
<Text style={styles.HsubTitle}>Create Account:</Text>
<Text style={styles.Htext}>• Enter an @calvin.edu email address in the ‘Email’ text box.</Text>
<Text style={styles.Htext}>• Enter a password of your choice in the ‘Password’ text box.</Text>
<Text style={styles.Htext}>• Retype the password in the ‘Confirm’ text box.</Text>
<Text style={styles.Htext}>• Save your password! There is no password reset option yet.</Text>

{/* Subsection: Log In */}
<Text style={styles.HsubTitle}>Log In:</Text>
<Text style={styles.Htext}>• Use a previously registered email address.</Text>
<Text style={styles.Htext}>• Enter your password.</Text>
<Text style={styles.Htext}>• Press ‘Log In’.</Text>

{/* Section: Properties List Page */}
<Text style={styles.HsectionTitle}>Properties List Page</Text>
<Text style={styles.Htext}>
  The page is set up with two yellow buttons, **Filter** and **Sort By**, above the list of properties.
</Text>

{/* Subsection: Sort */}
<Text style={styles.HsubTitle}>Sort:</Text>
<Text style={styles.Htext}>• Tap the sort button (on the left) to access the ‘Sort By’ popup.</Text>
<Text style={styles.Htext}>• Use the popup to organize the results according to your preferences:</Text>
<Text style={styles.Htext}>  • By default, the properties are sorted by their average rating.</Text>
<Text style={styles.Htext}>
  • The options for sorting properties are presented as separate maroon buttons in the popup.
</Text>
<Text style={styles.Htext}>• You can layer sorting parameters, e.g.:</Text>
<Text style={styles.Htext}>
  • Sorting by rating first will organize the properties with the highest rating at the top and the lowest at the bottom.
</Text>
<Text style={styles.Htext}>
  • Sorting by # Bedrooms second will sort all the properties with the highest number of bedrooms at the top and the lowest at the bottom. Properties with the same number of bedrooms will still be sorted by highest rating.
</Text>

{/* Sort Criteria */}
<Text style={styles.HsubTitle}>Sorting Criteria:</Text>
<Text style={styles.Htext}>• Distance to school: Sorts by distance from Calvin University (in miles).</Text>
<Text style={styles.Htext}>• Distance to bus: Sorts by distance from the nearest bus stop (in miles).</Text>
<Text style={styles.Htext}>• Cost ($/month): Sorts by average rent per month, as listed by landlords.</Text>
<Text style={styles.Htext}>• Rating: Sorts by the average student-collected rating.</Text>
<Text style={styles.Htext}>• # Bedrooms: Sorts by the number of bedrooms in each house. Note: Landlords must verify bedroom qualifications. RentScout recommends seeing rooms in person before signing contracts.</Text>
<Text style={styles.Htext}>• # Bathrooms: Sorts by the number of bathrooms in each house. Note: A ‘0.5 bath’ has two components, usually a toilet and sink.</Text>
<Text style={styles.Htext}>• (low to high): The lowest value in the category at the top of the list and the highest at the bottom.</Text>
<Text style={styles.Htext}>• (high to low): The highest value in the category at the top of the list and the lowest at the bottom.</Text>

{/* Subsection: Filter */}
<Text style={styles.HsubTitle}>Filter:</Text>
<Text style={styles.Htext}>• Tap the filter button (on the right) to access the ‘Filter By:’ popup.</Text>
<Text style={styles.Htext}>• Use the popup to only display results that match your filter parameters.</Text>
<Text style={styles.Htext}>• By default, all available properties are shown (no filters applied).</Text>
<Text style={styles.Htext}>• The filtering options are listed with checkboxes for selection.</Text>
<Text style={styles.Htext}>• You can apply multiple filters at once.</Text>
<Text style={styles.Htext}>• Press ‘Clear Filters’ (bottom right) to remove all filters.</Text>
<Text style={styles.Htext}>• Press ‘Show [#] Results’ (bottom left) to see filtered results.</Text>
<Text style={styles.Htext}>• Close the popup by pressing ‘Close’.</Text>
      </ScrollView>
    </View>
  );
}


