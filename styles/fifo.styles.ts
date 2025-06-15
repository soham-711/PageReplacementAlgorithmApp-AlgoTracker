// styles/fifo.styles.ts

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f8",
  },
  scrollContainer: {
    padding: 20,
    gap: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    color:"#666666"
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  cell: {
    width: 80,
    textAlign: "center",
    fontSize: 14,
    color: "#374151",
  },
  hit: {
    color: "#10b981", // Green
    fontWeight: "bold",
  },
  miss: {
    color: "#ef4444", // Red
    fontWeight: "bold",
  },
  statsContainer: {
    backgroundColor: "#fff",
    marginTop: 16,
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  statText: {
    fontSize: 16,
    color: "#111827",
  },
  hitText: {
    color: "#10b981",
    fontWeight: "bold",
  },
  missText: {
    color: "#ef4444",
    fontWeight: "bold",
  },
  ratioText: {
    color: "#3b82f6",
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    gap: 10,
    elevation: 2,
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1f2937",
  },
  infoText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
  buttonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginVertical: 12,
  gap: 10,
},

});
