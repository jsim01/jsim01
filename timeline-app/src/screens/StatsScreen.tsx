import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Week Summary</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Events:</Text>
            <Text style={styles.statValue}>45</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Days Tracked:</Text>
            <Text style={styles.statValue}>7/7</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Events by Category</Text>
          <CategoryBar category="Work" count={20} percentage={44} color="#4A90E2" />
          <CategoryBar category="Leisure" count={10} percentage={22} color="#F5A623" />
          <CategoryBar category="Health" count={8} percentage={18} color="#7ED321" />
          <CategoryBar category="Transport" count={5} percentage={11} color="#BD10E0" />
          <CategoryBar category="Social" count={2} percentage={5} color="#50E3C2" />
        </View>
      </ScrollView>
    </View>
  );
}

interface CategoryBarProps {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

function CategoryBar({ category, count, percentage, color }: CategoryBarProps) {
  return (
    <View style={styles.categoryRow}>
      <Text style={styles.categoryLabel}>{category}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.categoryCount}>{count}</Text>
    </View>
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryLabel: {
    width: 80,
    fontSize: 14,
    color: colors.text,
  },
  barContainer: {
    flex: 1,
    height: 24,
    backgroundColor: colors.divider,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  categoryCount: {
    width: 30,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
});
