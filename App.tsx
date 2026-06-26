import { StatusBar } from "expo-status-bar";
import { GoogleMaps } from "expo-maps";
import { Platform, StyleSheet, Text, View } from "react-native";

const cameraPosition = {
  coordinates: {
    latitude: 37.789,
    longitude: -122.4324,
  },
  zoom: 13,
};

const markers: GoogleMaps.Marker[] = [
  {
    id: "title-only",
    coordinates: {
      latitude: 37.789,
      longitude: -122.438,
    },
    title: "Title only",
  },
  {
    id: "title-and-snippet",
    coordinates: {
      latitude: 37.789,
      longitude: -122.4268,
    },
    title: "Title and snippet",
    snippet: "Snippet line",
  },
];

export default function App() {
  if (Platform.OS !== "android") {
    return (
      <View style={styles.unsupported}>
        <Text style={styles.unsupportedTitle}>Android-only repro</Text>
        <Text style={styles.unsupportedText}>This repro targets expo-maps Google Maps markers on Android.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GoogleMaps.View style={StyleSheet.absoluteFill} cameraPosition={cameraPosition} markers={markers} />
      <View style={styles.panel}>
        <Text style={styles.title}>expo-maps Android snippet repro</Text>
        <Text style={styles.body}>Left marker has only a title. Right marker has title + snippet.</Text>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  panel: {
    position: "absolute",
    left: 16,
    right: 16,
    top: 96,
    gap: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    padding: 16,
  },
  title: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
  body: {
    color: "#374151",
    fontSize: 13,
    lineHeight: 18,
  },
  unsupported: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  unsupportedTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "700",
  },
  unsupportedText: {
    marginTop: 8,
    color: "#4b5563",
    textAlign: "center",
  },
});
