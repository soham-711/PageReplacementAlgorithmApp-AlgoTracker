import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/profile.styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || "",
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* User Information */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>👤 User Information</Text>
        <Image source={{ uri: userData?.image }} style={styles.avatar} />
        <Text style={styles.name}>{userData?.fullname}</Text>
        <Text style={styles.email}>
          {userData?.email}
        </Text>
      </View>

      {/* Settings */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>⚙️ Settings</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Alert.alert("Edit Profile", "Edit profile functionality coming soon!")
          }
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={() => signOut()}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Educational Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📚 Learn More</Text>
        <Text style={styles.educationText}>
          <Text style={{ fontWeight: "600" }}>FIFO:</Text> Replaces the oldest page in memory.
        </Text>
        <Text style={styles.educationText}>
          <Text style={{ fontWeight: "600" }}>LRU:</Text> Replaces the least recently used page.
        </Text>
        <Text style={styles.educationText}>
          <Text style={{ fontWeight: "600" }}>Optimal:</Text> Replaces the page that won’t be used for the longest time.
        </Text>
        <Link href="https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/" style={styles.linkButton}>
          <TouchableOpacity >
            <Text style={styles.linkText}>View Algorithm Resources →</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
