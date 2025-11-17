import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSearch = () => {
    Alert.alert('Search', 'Search functionality coming soon!');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Navigate to Settings tab at the bottom');
  };

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    Alert.alert('Date Changed', `Previous day: ${newDate.toLocaleDateString()}`);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    Alert.alert('Date Changed', `Next day: ${newDate.toLocaleDateString()}`);
  };

  const handleCreateEvent = () => {
    Alert.alert(
      'Create Event',
      'Event creation screen will open here. For now, this is a placeholder.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Timeline</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSearch}>
            <Text style={styles.iconText}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleSettings}>
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <TouchableOpacity style={styles.navButton} onPress={handlePreviousDay}>
          <Text style={styles.navButtonText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>
          📅 {currentDate.toDateString() === new Date().toDateString() ? 'Today' : currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {currentDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </Text>
        <TouchableOpacity style={styles.navButton} onPress={handleNextDay}>
          <Text style={styles.navButtonText}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Timeline List */}
      <ScrollView style={styles.timeline}>
        {/* Mock Timeline Items */}
        <TimelineItem
          time="08:00"
          icon="🚗"
          title="Morning Commute"
          category="Transport"
          location="Gangnam Station"
        />
        <TimelineItem
          time="09:30"
          icon="💼"
          title="Team Meeting"
          category="Work"
          location="Conference Room A"
        />
        <TimelineItem
          time="12:00"
          icon="🍽️"
          title="Lunch"
          category="Leisure"
        />
        <TimelineItem
          time="14:00"
          icon="📝"
          title="(untitled)"
          category=""
        />
        <TimelineItem
          time="18:00"
          icon="🚗"
          title="Evening Commute"
          category="Transport"
          location="Seoul Station"
        />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleCreateEvent}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

// TimelineItem Component
interface TimelineItemProps {
  time: string;
  icon: string;
  title: string;
  category?: string;
  location?: string;
}

function TimelineItem({ time, icon, title, category, location }: TimelineItemProps) {
  const handlePress = () => {
    Alert.alert(
      'Event Details',
      `Time: ${time}\nTitle: ${title}\nCategory: ${category || 'None'}\nLocation: ${location || 'None'}`,
      [
        { text: 'Edit', onPress: () => Alert.alert('Edit', 'Edit screen coming soon!') },
        { text: 'Close', style: 'cancel' }
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.timelineItem} onPress={handlePress}>
      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.indicatorColumn}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineConnector} />
      </View>
      <View style={styles.contentColumn}>
        <View style={styles.eventCard}>
          <Text style={styles.eventIcon}>{icon}</Text>
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>{title}</Text>
            {category && (
              <Text style={styles.eventCategory}>{category}</Text>
            )}
            {location && (
              <Text style={styles.eventLocation}>📍 {location}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50, // Account for status bar
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconText: {
    fontSize: 20,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 18,
    color: colors.primary,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  timeline: {
    flex: 1,
    padding: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timeColumn: {
    width: 60,
    paddingTop: 4,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  indicatorColumn: {
    width: 30,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.timelineDot,
    marginTop: 6,
  },
  timelineConnector: {
    flex: 1,
    width: 2,
    backgroundColor: colors.timelineConnector,
    marginTop: 4,
  },
  contentColumn: {
    flex: 1,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  eventIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  eventCategory: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#FFFFFF',
  },
});
