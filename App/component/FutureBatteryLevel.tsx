import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FutureBatteryLevel({ data, loading }) {
  const { currentBattery = 0 } = data || {};

  const getBatteryStatusColor = (level) => {
    if (level >= 100) {
      return styles.fullBattery;
    } else if (level > 60) {
      return styles.highBattery;
    } else if (level > 40) {
      return styles.moderateBattery;
    } else if (level > 20) {
      return styles.lowBattery;
    } else {
      return styles.criticalBattery;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Estimated Charging Date */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Estimated Charging Date:</Text>
        <Text style={styles.estimatedDate}>Add API soon</Text>
      </View>

      {/* Notifications Section */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationHeader}>🔔 Battery Alerts & Notifications</Text>

        {/* Low Battery Warning */}
        {currentBattery <= 20 && (
          <View style={styles.alertContainerRed}>
            <Text style={styles.alertText}>⚠️ Low Battery Warning</Text>
            <Text style={styles.alertDescription}>
              Battery level is critically low at <Text style={styles.bold}>{currentBattery}%</Text>. Please charge immediately!
            </Text>
          </View>
        )}

        {/* Overcharging Warning */}
        {currentBattery >= 100 && (
          <View style={styles.alertContainerGreen}>
            <Text style={styles.alertText}>🔋 Overcharging Warning</Text>
            <Text style={styles.alertDescription}>
              Battery is fully charged. Disconnect to prevent damage.
            </Text>
          </View>
        )}

        {/* Battery Status */}
        {currentBattery > 20 && currentBattery < 100 && (
          <View style={[styles.statusContainer, getBatteryStatusColor(currentBattery)]}>
            <Text style={styles.statusIcon}>✅</Text>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusText}>Battery Status</Text>
              <Text style={styles.statusDescription}>
                Battery is in good condition at <Text style={styles.bold}>{currentBattery}%</Text>.
              </Text>
            </View>
          </View>
        )}

        {/* Last Charging and Uncharging Dates */}
        <View style={styles.lastChargingContainer}>
          <Text style={styles.lastChargingText}>⏳ Battery can run up to API added soon.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignSelf: "center",
    width: "90%",
    height: 300,
    maxWidth: 348,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274C77",
    flexShrink: 1,
    fontFamily: 'Kameron-SemiBold',
  },
  estimatedDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    flexShrink: 1,
  },
  notificationContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  notificationHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#274C77",
    marginBottom: 12,
  },
  alertContainerRed: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    borderWidth: 1,
    borderColor: "#F44336",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  alertContainerGreen: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  alertText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F44336",
    flexShrink: 1,
    fontFamily: 'Kameron-SemiBold',
  },
  alertDescription: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
    flexShrink: 1,
    fontFamily: 'Kameron-SemiBold',
  },
  statusContainer: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  fullBattery: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
    color: "#4CAF50",
  },
  highBattery: {
    backgroundColor: "#F1F8E9",
    borderColor: "#8BC34A",
    color: "#8BC34A",
  },
  moderateBattery: {
    backgroundColor: "#FFF9C4",
    borderColor: "#FFEB3B",
    color: "#FFEB3B",
  },
  lowBattery: {
    backgroundColor: "#FFEBEE",
    borderColor: "#FF9800",
    color: "#FF9800",
  },
  criticalBattery: {
    backgroundColor: "#FFEBEE",
    borderColor: "#F44336",
    color: "#F44336",
  },
  statusIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statusTextContainer: {
    flexShrink: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusDescription: {
    fontSize: 14,
    color: "#757575",
  },
  bold: {
    fontWeight: "bold",
  },
  lastChargingContainer: {
    backgroundColor: "#F1F1F1",
    borderRadius: 8,
    padding: 12,
    flexShrink: 1,
  },
  lastChargingText: {
    fontSize: 14,
    color: "#757575",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  loadingText: {
    fontSize: 16,
    color: "#274C77",
  },
});
