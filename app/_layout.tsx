import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '@/src/ui/theme';

function RootNavigator() {
  const { scheme } = useTheme();
  return <><StatusBar style={scheme === 'dark' ? 'light' : 'dark'} /><Stack screenOptions={{ headerShown: false }} /></>;
}

export default function RootLayout() {
  return <ThemeProvider><RootNavigator /></ThemeProvider>;
}
