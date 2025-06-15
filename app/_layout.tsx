import InitialLayout from "@/components/InitialLayout";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { Platform } from "react-native";
import { useEffect } from "react";
import * as NavigationBar from 'expo-navigation-bar';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;


const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL as string,
   {
    unsavedChangesWarning: false,
  }
);

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set Expo_Public_Clerk_Publishible_Key in your .env, "
  );
}


export default function RootLayout() {


  // for andriod device
useEffect(() => {
    if (Platform.OS === "android") {
      (async () => {
        try {
          // Try setting navigation bar background color
          await NavigationBar.setBackgroundColorAsync("#f2f4f8");
        } catch (e) {
          // Ignore error if edge-to-edge mode is enabled
          console.warn("NavigationBar: setBackgroundColorAsync not supported with edge-to-edge enabled.");
        }

        // Set navigation bar button style (light or dark)
        await NavigationBar.setButtonStyleAsync("dark");
      })();
    }
  }, []);

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ClerkLoaded>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 , backgroundColor:"#f2f4f8"}}>
              <InitialLayout />
            </SafeAreaView>
            <StatusBar style="dark"/>
          </SafeAreaProvider>
        </ClerkLoaded>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
