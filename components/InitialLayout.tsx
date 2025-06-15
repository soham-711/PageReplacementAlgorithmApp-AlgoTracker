import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    const isInAuth = segments[0] === "(auth)";
    if (!isInAuth && !isSignedIn) router.replace("/(auth)/signup");
    else if(isSignedIn && isInAuth) router.replace("/(tabs)")
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return;

 return <Stack screenOptions={{headerShown:false}} />
}
