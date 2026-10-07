import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Badge, Card, ErrorState, LoadingState, Screen, styles } from '@/src/ui/components';
import { useStudentData } from '@/src/ui/useStudentData';
import { useTheme } from '@/src/ui/theme';

export default function Courses() {
  const { data, error, loading, reload } = useStudentData(); const { colors } = useTheme();
  if (loading) return <LoadingState />; if (error || !data) return <ErrorState onRetry={() => void reload()} />;
  return <Screen><ScrollView contentContainerStyle={styles.content}><Text style={[title, { color: colors.text }]}>Courses</Text><Text style={{ color: colors.muted }}>Your registered semester subjects.</Text>{data.courses.map((course) => <Card key={course.id} style={{ marginTop: 14 }}><View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}><View style={{ width: 10, height: 40, borderRadius: 5, backgroundColor: course.color }} /><View style={{ flex: 1 }}><Text style={{ color: colors.text, fontSize: 16, fontWeight: '900' }}>{course.name}</Text><Text style={{ color: colors.muted, marginTop: 4 }}>{course.code} · {course.faculty}</Text></View></View><Text style={{ color: colors.muted, marginTop: 13 }}>{course.room}</Text><View style={{ marginTop: 10 }}><Badge label="REGISTERED" tone="good" /></View></Card>)}</ScrollView></Screen>;
}
const title = { fontSize: 30, fontWeight: '900' as const, letterSpacing: -.8, paddingTop: 19 };
