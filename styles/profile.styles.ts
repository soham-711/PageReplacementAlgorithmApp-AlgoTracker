import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: "center",
    marginVertical: 12,
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
    color: "#222",
  },
  email: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 6,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  educationText: {
    fontSize: 15,
    marginVertical: 6,
    color: "#444",
    lineHeight: 22,
  },
  linkButton: {
    marginTop: 14,
    paddingVertical: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "500",
    fontSize: 16,
  },
});
