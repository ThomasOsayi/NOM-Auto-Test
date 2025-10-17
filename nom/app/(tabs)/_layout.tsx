import { Tabs, Redirect } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function TabsLayout() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/(auth)/sign-in" />;
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="post" options={{ title: "Post" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}