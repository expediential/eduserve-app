import { Redirect, Stack, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '@/src/ui/theme';
import { AuthProvider, useAuth } from '@/src/services/authProvider';
import { StudentSnapshotProvider } from '@/src/ui/useStudentData';

function RootNavigator() {
  const { scheme } = useTheme();
  const { session } = useAuth();
  if (!session) return <Redirect href={'/login' as Href} />;
  return <StudentSnapshotProvider><StatusBar style={scheme === 'dark' ? 'light' : 'dark'} /><Stack screenOptions={{ headerShown: false }} /></StudentSnapshotProvider>;
}

export default function RootLayout() {
  return <SafeAreaProvider><ThemeProvider><AuthProvider><RootNavigator /></AuthProvider></ThemeProvider></SafeAreaProvider>;
}
