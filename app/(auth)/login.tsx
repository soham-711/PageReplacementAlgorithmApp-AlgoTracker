import { styles } from "@/styles/login.styles";
import { useAuth, useSignIn, useSSO } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as AuthSession from "expo-auth-session";
import { Link, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const { isSignedIn } = useAuth();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { startSSOFlow } = useSSO();

  const onGoogleSignInPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri({
            scheme: "algotracker",
            path: "callback",
          }),
        });
      console.log("Redirect URI:", AuthSession.makeRedirectUri());
      // If sign in was successful, set the active session
      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#999"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />

      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password min 8 or more than 8"
        placeholderTextColor="#999"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Google Sign-In Button */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={onGoogleSignInPress}
      >
        <Ionicons name="logo-google" size={24} color="blue" />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.text}>Don't have an account?</Text>
        <Link href="/(auth)/signup">
          <Text style={styles.linkText}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}
