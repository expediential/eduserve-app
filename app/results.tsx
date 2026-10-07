import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, ErrorState, LoadingState, Screen, styles } from '@/src/ui/components';
import { useStudentData } from '@/src/ui/useStudentData';
import { useTheme } from '@/src/ui/theme';

export default function Results() {
  const { data, error, loading, reload } = useStudentData(); const { colors } = useTheme();
  if (loading) return <LoadingState />; if (error || !data) return <ErrorState onRetry={() => void reload()} />;
  return <Screen><ScrollView contentContainerStyle={styles.content}><Text style={[title, { color: colors.text }]}>Results</Text><Text style={{ color: colors.muted }}>Official results are not present in this development data.</Text><Card style={{ marginTop: 22 }}><Text style={{ color: colors.text, fontSize: 17, fontWeight: '900' }}>No official result published</Text><Text style={{ color: colors.muted, lineHeight: 21, marginTop: 8 }}>The Marks screen shows recorded assessment scores only. A university-authorized result provider is required before final result data can appear here.</Text></Card></ScrollView></Screen>;
}
const title = { fontSize: 30, fontWeight: '900' as const, letterSpacing: -.8, paddingTop: 19 };
