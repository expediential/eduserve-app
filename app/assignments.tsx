import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Badge, Card, EmptyState, ErrorState, LoadingState, Screen, styles } from '@/src/ui/components';
import { formatDueDate } from '@/src/domain/dates';
import { useStudentData } from '@/src/ui/useStudentData';
import { useTheme } from '@/src/ui/theme';

export default function Assignments() {
  const { data, error, loading, reload } = useStudentData(); const { colors } = useTheme();
  if (loading) return <LoadingState />; if (error || !data) return <ErrorState onRetry={() => void reload()} />;
  const assignments = data.assignments.filter((item) => item.status === 'pending').sort((a, b) => a.due.localeCompare(b.due));
  return <Screen><ScrollView contentContainerStyle={styles.content}><Text style={[title, { color: colors.text }]}>Assignments</Text><Text style={{ color: colors.muted }}>Deadlines from your current demo snapshot.</Text>{assignments.length ? assignments.map((item) => { const course = data.courses.find((value) => value.id === item.courseId)!; return <Card key={item.id} style={{ marginTop: 14 }}><View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}><View style={{ flex: 1 }}><Text style={{ color: colors.text, fontSize: 16, fontWeight: '900' }}>{item.title}</Text><Text style={{ color: colors.muted, marginTop: 5 }}>{course.name}</Text></View><Badge label="PENDING" tone="warning" /></View><Text style={{ color: colors.muted, marginTop: 15 }}>{formatDueDate(item.due)}</Text></Card>; }) : <EmptyState title="No pending assignments" detail="You’re all caught up in the current student data." />}</ScrollView></Screen>;
}
const title = { fontSize: 30, fontWeight: '900' as const, letterSpacing: -.8, paddingTop: 19 };
