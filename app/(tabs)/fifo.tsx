import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Print from "expo-print";
import { runFifoAlgorithm, FifoResult } from "@/utils/fifoAlgo";
import { styles } from "@/styles/fifo.styles";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-expo";
import { api } from "@/convex/_generated/api";

const FifoScreen = () => {
  const [inputString, setInputString] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [result, setResult] = useState<FifoResult | null>(null);
  const incrementFifo = useMutation(api.increment.incrementFifo); // Update path if needed
const { user } = useUser();


  const handleAnalyze = async () => {
  const pages = inputString
    .split(",")
    .map((p) => parseInt(p.trim()))
    .filter((n) => !isNaN(n));
  const frame = parseInt(frameSize);

  if (pages.length && frame > 0) {
    const output = runFifoAlgorithm(pages, frame);
    setResult(output);

    // Increment FIFO count in database
    if (user?.id) {
      try {
        await incrementFifo({ clerkId: user.id });
      } catch (error) {
        console.error("Error incrementing FIFO count:", error);
      }
    }
  } else {
    alert("Please enter valid page numbers and frame size");
  }
};


  const handlePrint = async () => {
    if (!result) return;

    const html = `
      <h1>FIFO Page Replacement Result</h1>
      <p><strong>Page Hits:</strong> ${result.pageHits}</p>
      <p><strong>Page Misses:</strong> ${result.pageMisses}</p>
      <p><strong>Hit Ratio:</strong> ${result.hitRatio.toFixed(2)}%</p>
      <table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
        <thead>
          <tr>
            <th>Step</th>
            <th>Page</th>
            ${result.steps[0].frame.map((_, i) => `<th>Frame ${i + 1}</th>`).join("")}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${result.steps
            .map(
              (step, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${step.page}</td>
              ${step.frame.map((f) => `<td>${f !== null ? f : "-"}</td>`).join("")}
              <td style="color: ${step.status === "Hit" ? "green" : "red"}">${step.status}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    await Print.printAsync({
      html,
    });
  };

  const handleReset = () => {
    setInputString("");
    setFrameSize("");
    setResult(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>FIFO Page Replacement</Text>

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter pages (e.g. 1, 2, 3, 2, 4)"
            placeholderTextColor="#666666"
            value={inputString}
            onChangeText={setInputString}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter frame size (e.g. 3)"
            placeholderTextColor="#666666"
            value={frameSize}
            onChangeText={setFrameSize}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleAnalyze}>
            <Text style={styles.buttonText}>Analyze</Text>
          </TouchableOpacity>
        </View>

        {/* Result Section */}
        {result && (
          <>
            <Text style={styles.subHeading}>Page Table</Text>
            <ScrollView horizontal style={styles.tableContainer}>
              <View>
                <View style={styles.tableHeader}>
                  <Text style={styles.cell}>Page</Text>
                  {result.steps[0].frame.map((_, i) => (
                    <Text key={i} style={styles.cell}>
                      Frame {i + 1}
                    </Text>
                  ))}
                  <Text style={styles.cell}>Status</Text>
                </View>
                {result.steps.map((step, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.cell}>{step.page}</Text>
                    {step.frame.map((f, i) => (
                      <Text key={i} style={styles.cell}>
                        {f}
                      </Text>
                    ))}
                    <Text
                      style={[
                        styles.cell,
                        step.status === "Hit" ? styles.hit : styles.miss,
                      ]}
                    >
                      {step.status}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <Text style={styles.statText}>
                Page Hits: <Text style={styles.hitText}>{result.pageHits}</Text>
              </Text>
              <Text style={styles.statText}>
                Page Misses:{" "}
                <Text style={styles.missText}>{result.pageMisses}</Text>
              </Text>
              <Text style={styles.statText}>
                Hit Ratio:{" "}
                <Text style={styles.ratioText}>
                  {result.hitRatio.toFixed(2)}%
                </Text>
              </Text>
            </View>

            {/* Explanation */}
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>FIFO Algorithm</Text>
              <Text style={styles.infoText}>
                FIFO (First-In-First-Out) replaces the oldest page in memory
                first. It uses a queue structure to track order of arrival.
              </Text>
              <Text style={styles.infoTitle}>Page Hit</Text>
              <Text style={styles.infoText}>
                A page hit means the requested page is already in memory.
              </Text>
              <Text style={styles.infoTitle}>Page Miss</Text>
              <Text style={styles.infoText}>
                A page miss means the requested page is not in memory and must
                be loaded, possibly replacing an existing one.
              </Text>
              <Text style={styles.infoTitle}>Hit Ratio</Text>
              <Text style={styles.infoText}>
                Hit Ratio = (Hits / Total Requests) × 100%
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={handlePrint}>
                <Text style={styles.buttonText}>Save as PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#555" }]}
                onPress={handleReset}
              >
                <Text style={styles.buttonText}>Try New One</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FifoScreen;
