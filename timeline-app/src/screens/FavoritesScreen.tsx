import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      <ScrollView style={styles.content}>
        <FavoriteItem icon="🚗" label="Morning Commute" category="Transport" />
        <FavoriteItem icon="💼" label="Team Meeting" category="Work" />
        <FavoriteItem icon="🍽️" label="Lunch Break" category="Leisure" />
        <FavoriteItem icon="🏋️" label="Gym Session" category="Health" />
        <FavoriteItem icon="☕" label="Coffee Break" category="Leisure" />
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ New Favorite</Text>
      </TouchableOpacity>
    </View>
  );
}

interface FavoriteItemProps {
  icon: string;
  label: string;
  category: string;
}

function FavoriteItem({ icon, label, category }: FavoriteItemProps) {
  return (
    <TouchableOpacity style={styles.favoriteItem}>
      <Text style={styles.favoriteIcon}>{icon}</Text>
      <View style={styles.favoriteDetails}>
        <Text style={styles.favoriteLabel}>{label}</Text>
        <Text style={styles.favoriteCategory}>{category}</Text>
      </View>
      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuIcon}>⋮</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  favoriteIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  favoriteDetails: {
    flex: 1,
  },
  favoriteLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  favoriteCategory: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  addButton: {
    margin: 16,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
