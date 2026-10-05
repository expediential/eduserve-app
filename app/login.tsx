import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/src/services/authProvider';
import { Screen } from '@/src/ui/components';
import { useTheme } from '@/src/ui/theme';

export default function LoginScreen() {
  const { colors } = useTheme();
  const { signInDemo, isSigningIn } = useAuth();
  const [email, setEmail] = useState('james.martin@example.test');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState<string>();
  const signIn = async () => {
    try { setError(undefined); await signInDemo(email, password); router.replace('/'); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to sign in.'); }
  };
  return <Screen><ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
    <View style={[s.mark, { backgroundColor: colors.accentSoft }]}><Text style={[s.markText, { color: colors.accent }]}>K</Text></View>
    <Text style={[s.brand, { color: colors.text }]}>KARUNYA ONE</Text>
    <Text style={[s.title, { color: colors.text }]}>Everything Karunya.{`\n`}One place.</Text>
    <Text style={[s.sub, { color: colors.muted }]}>Sign in to open your student workspace.</Text>
    <View style={s.form}>
      <Text style={[s.label, { color: colors.text }]}>EMAIL</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" placeholder="name@example.com" placeholderTextColor={colors.muted} style={[s.input, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]} accessibilityLabel="Email" />
      <Text style={[s.label, { color: colors.text, marginTop: 18 }]}>PASSWORD</Text>
      <TextInput value={password} onChangeText={setPassword} autoComplete="password" secureTextEntry placeholder="At least 4 characters" placeholderTextColor={colors.muted} style={[s.input, { color: colors.text, backgroundColor: colors.surface, borderColor: colors.border }]} accessibilityLabel="Password" />
      {error && <Text style={{ color: colors.danger, marginTop: 10, lineHeight: 19 }}>{error}</Text>}
      <Pressable onPress={signIn} disabled={isSigningIn} style={({ pressed }) => [s.button, { backgroundColor: colors.accent, opacity: pressed || isSigningIn ? .72 : 1 }]} accessibilityRole="button">
        {isSigningIn ? <ActivityIndicator color="#FFF" /> : <Text style={s.buttonText}>Continue to demo</Text>}
      </Pressable>
    </View>
    <View style={[s.notice, { borderColor: colors.border, backgroundColor: colors.elevated }]}><Text style={{ color: colors.text, fontWeight: '800' }}>Development sign-in</Text><Text style={{ color: colors.muted, marginTop: 5, lineHeight: 19 }}>This opens fictional demo data only. It does not connect to EduServe, submit your password, or verify university identity.</Text></View>
  </ScrollView></Screen>;
}
const s = StyleSheet.create({ content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 72, paddingBottom: 36 }, mark: { height: 52, width: 52, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, markText: { fontSize: 26, fontWeight: '900' }, brand: { fontSize: 12, fontWeight: '900', letterSpacing: 1.3, marginTop: 27 }, title: { fontSize: 34, lineHeight: 40, fontWeight: '900', letterSpacing: -1.1, marginTop: 12 }, sub: { marginTop: 11, fontSize: 15, lineHeight: 21 }, form: { marginTop: 36 }, label: { fontSize: 11, fontWeight: '900', letterSpacing: .8, marginBottom: 8 }, input: { height: 52, paddingHorizontal: 14, borderWidth: 1, borderRadius: 13, fontSize: 16 }, button: { height: 53, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginTop: 25 }, buttonText: { color: '#FFF', fontWeight: '900', fontSize: 16 }, notice: { marginTop: 'auto', borderWidth: 1, borderRadius: 14, padding: 15 } });
