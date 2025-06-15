import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/home.styles";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Index = () => {
  const { user } = useUser();

  // 🔄 Fetch user data from Convex using clerkId
  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || "",
  });

  const totalProgress =
    (userData?.fifo || 0) + (userData?.lru || 0) + (userData?.optimal || 0);

  // Show loading while fetching data
  if (user && !userData) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Chart data based on user's real progress
  const progressData = [
    {
      name: "FIFO",
      count: userData?.fifo || 2,
      color: "#FF6384",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "LRU",
      count: userData?.lru,
      color: "#36A2EB",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Optimal",
      count: userData?.optimal,
      color: "#FFCE56",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
  ];

  return (
    <ScrollView style={styles.container}
     contentContainerStyle={{ paddingBottom:16 }}
  showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>Hi {userData?.fullname || "User"},</Text>
      <Text style={styles.subheading}>
        Here is your page replacement progress:
      </Text>

      <View style={{ marginVertical: 16 }}>
        {totalProgress > 0 ? (
          <PieChart
            data={progressData.map((item) => ({
              name: item.name,
              population: item.count,
              color: item.color,
              legendFontColor: item.legendFontColor,
              legendFontSize: item.legendFontSize,
            }))}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              color: () => "#000",
              labelColor: () => "#000",
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="16"
            style={styles.chart}
            absolute
          />
        ) : (
          <View
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              backgroundColor: "#f4f4f4",
            }}
          >
            <ActivityIndicator size="large" color="#666" />
            <Text style={{ marginTop: 10, color: "#555" }}>
              Waiting for your first progress...
            </Text>
          </View>
        )}
      </View>

 {/* About AlgoTracker */}
      <View style={styles.card}>
        <Text style={{ fontSize: 22, color: "#2c3e50",fontWeight:700,marginBottom:5 }}>About AlgoTracker</Text>
        <Text style={styles.aboutText}>
          AlgoTracker is your personal companion for mastering memory management algorithms like FIFO, LRU, and Optimal.
        </Text>
        <Text style={styles.aboutText}>
          Track your learning progress, understand page replacement strategies, and become confident in Operating System concepts — all in one place!
        </Text>
        <Text style={styles.aboutText}>
          Stay consistent. Stay sharp. Welcome to smarter learning.
        </Text>
      </View>

      <Text style={styles.docsHeading}>📚 Algorithm Documentation</Text>

      <View style={styles.docCard}>
        <Text style={styles.docTitle}>1. FIFO (First-In-First-Out)</Text>
        <Text style={styles.docContent}>
          FIFO is the simplest page replacement algorithm. The oldest page in
          memory is the first to be replaced.
        </Text>
      </View>

      <View style={styles.docCard}>
        <Text style={styles.docTitle}>2. LRU (Least Recently Used)</Text>
        <Text style={styles.docContent}>
          LRU replaces the page that hasn't been used for the longest time. It
          requires keeping track of the usage history of pages.
        </Text>
      </View>

      <View style={styles.docCard}>
        <Text style={styles.docTitle}>3. Optimal Page Replacement</Text>
        <Text style={styles.docContent}>
          The optimal algorithm replaces the page that will not be used for the
          longest time in the future.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Index;