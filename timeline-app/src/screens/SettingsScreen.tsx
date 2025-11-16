import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export default function SettingsScreen() {
  const [locationEnabled, setLocationEnabled] = React.useState(false);
  const [transitTracking, setTransitTracking] = React.useState(false);
  const [aiRecommendations, setAiRecommendations] = React.useState(true);
  const [cloudSync, setCloudSync] = React.useState(false);
  const [localOnlyMode, setLocalOnlyMode] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Privacy & Permissions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Permissions</Text>
          <SettingRow
            label="Location Access"
            value={locationEnabled}
            onValueChange={setLocationEnabled}
          />
          <SettingRow
            label="Transit Tracking"
            value={transitTracking}
            onValueChange={setTransitTracking}
          />
          <SettingRow
            label="AI Recommendations"
            value={aiRecommendations}
            onValueChange={setAiRecommendations}
          />
        </View>

        {/* Data & Sync */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Sync</Text>
          <SettingRow
            label="Cloud Sync"
            value={cloudSync}
            onValueChange={setCloudSync}
          />
          <SettingRow
            label="Local-Only Mode"
            value={localOnlyMode}
            onValueChange={setLocalOnlyMode}
          />
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionLabel}>Export Data</Text>
            <Text style={styles.actionIcon}>→</Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionLabel}>Privacy Policy</Text>
            <Text style={styles.actionIcon}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionLabel}>Terms of Service</Text>
            <Text style={styles.actionIcon}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

interface SettingRowProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function SettingRow({ label, value, onValueChange }: SettingRowProps) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.divider, true: colors.primaryLight }}
        thumbColor={value ? colors.primary : colors.placeholder}
      />
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
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 16,
    color: colors.text,
  },
  actionIcon: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.text,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
