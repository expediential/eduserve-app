import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTheme } from '@/src/ui/theme';

const icons: Record<string, string> = { index: '⌂', academics: '◫', schedule: '◷', notices: '◉', more: '☰' };
export default function TabLayout() {
  const { colors } = useTheme();
  return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted, tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 64 }, tabBarLabelStyle: { fontWeight: '700', fontSize: 11 }, tabBarIcon: ({ color }) => <TabIcon color={color} value={icons[route.name] ?? '•'} /> })}>
    <Tabs.Screen name="index" options={{ title: 'Home' }} /><Tabs.Screen name="academics" options={{ title: 'Academics' }} /><Tabs.Screen name="schedule" options={{ title: 'Schedule' }} /><Tabs.Screen name="notices" options={{ title: 'Notices' }} /><Tabs.Screen name="more" options={{ title: 'More' }} />
  </Tabs>;
}
function TabIcon({ color, value }: { color: string; value: string }) { return <Text style={{ color, fontSize: 21, lineHeight: 23 }}>{value}</Text>; }
