import { Redirect, Stack, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '@/src/ui/theme';
import { AuthProvider } from '@/src/services/authProvider';
import { useAuth } from '@/src/services/authProvider';

function RootNavigator() {
  const { scheme } = useTheme();
  const { session } = useAuth();
  if (!session) return <Redirect href={'/login' as Href} />;
  return <><StatusBar style={scheme === 'dark' ? 'light' : 'dark'} /><Stack screenOptions={{ headerShown: false }} /></>;
}

export default function RootLayout() {
  return <ThemeProvider><AuthProvider><RootNavigator /></AuthProvider></ThemeProvider>;
}
