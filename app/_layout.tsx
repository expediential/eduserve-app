import React, { useEffect } from 'react';
import { Stack, type Href, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '@/src/services/authProvider';
import { ThemeProvider, useTheme } from '@/src/ui/theme';
import { StudentSnapshotProvider } from '@/src/ui/useStudentData';

/** Navigation mounts before redirects run; Android can otherwise show a blank screen. */
function AuthGate() {
  const { session } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const isOnLogin = segments[0] === 'login';

  useEffect(() => {
    if (!segments.length) return;
    if (!session && !isOnLogin) router.replace('/login' as Href);
    if (session && isOnLogin) router.replace('/' as Href);
  }, [isOnLogin, router, segments.length, session]);

  return null;
}

function RootNavigator() {
  const { scheme } = useTheme();
  return <StudentSnapshotProvider>
    <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }} />
    <AuthGate />
  </StudentSnapshotProvider>;
}

export default function RootLayout() {
  return <SafeAreaProvider><ThemeProvider><AuthProvider><RootNavigator /></AuthProvider></ThemeProvider></SafeAreaProvider>;
}

/** A release fallback so an unexpected screen error is actionable, not a black screen. */
export function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  return <View style={styles.errorScreen}>
    <Text style={styles.errorTitle}>Karunya One needs to restart</Text>
    <Text style={styles.errorBody}>We couldn’t open this screen. Try again; no student data has been sent or changed.</Text>
    <Pressable accessibilityRole="button" accessibilityLabel="Try opening Karunya One again" onPress={retry} style={styles.errorButton}>
      <Text style={styles.errorButtonText}>Try again</Text>
    </Pressable>
    {__DEV__ && <Text selectable style={styles.debug}>{error.message}</Text>}
  </View>;
}

const styles = StyleSheet.create({
  errorScreen: { flex: 1, backgroundColor: '#10141D', alignItems: 'center', justifyContent: 'center', padding: 28 },
  errorTitle: { color: '#F3F6FC', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  errorBody: { color: '#A4AEC0', textAlign: 'center', lineHeight: 21, marginTop: 10 },
  errorButton: { backgroundColor: '#9AAFFF', borderRadius: 12, minHeight: 48, paddingHorizontal: 20, justifyContent: 'center', marginTop: 22 },
  errorButtonText: { color: '#10141D', fontWeight: '900' },
  debug: { color: '#A4AEC0', fontSize: 11, marginTop: 20, textAlign: 'center' },
});
