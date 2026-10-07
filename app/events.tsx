import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Badge, Card, EmptyState, ErrorState, LoadingState, Screen, styles } from '@/src/ui/components';
import { formatDate } from '@/src/domain/dates';
import { useStudentData } from '@/src/ui/useStudentData';
import { useTheme } from '@/src/ui/theme';

export default function Events() {
  const { data, error, loading, reload } = useStudentData(); const { colors } = useTheme();
  if (loading) return <LoadingState />; if (error || !data) return <ErrorState onRetry={() => void reload()} />;
  return <Screen><ScrollView contentContainerStyle={styles.content}><Text style={[title, { color: colors.text }]}>Events</Text><Text style={{ color: colors.muted }}>Campus dates included in the demo data.</Text>{data.events.length ? data.events.map((event) => <Card key={event.id} style={{ marginTop: 14 }}><Badge label={event.category.toUpperCase()} /><Text style={{ color: colors.text, fontSize: 16, fontWeight: '900', marginTop: 13 }}>{event.title}</Text><Text style={{ color: colors.muted, marginTop: 6 }}>{formatDate(event.date)} · {event.time}</Text><Text style={{ color: colors.muted, marginTop: 3 }}>{event.venue}</Text></Card>) : <EmptyState title="No upcoming events" detail="New events will appear here when included in your data." />}</ScrollView></Screen>;
}
const title = { fontSize: 30, fontWeight: '900' as const, letterSpacing: -.8, paddingTop: 19 };
