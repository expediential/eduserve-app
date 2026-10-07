import React from 'react';
import { router, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { attendancePercentage, assessmentPercentage } from '@/src/domain/academic';
import { currentAcademicDay, examCountdown, formatDueDate } from '@/src/domain/dates';
import { Badge, Card, ErrorState, ListRow, LoadingState, Screen, SectionTitle, styles } from '@/src/ui/components';
import { useStudentData } from '@/src/ui/useStudentData';
import { useTheme } from '@/src/ui/theme';

const greeting = () => { const hour = new Date().getHours(); return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'; };
const currentTime = () => `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`;

export function DashboardScreen() {
  const { data, error, loading, reload, lastUpdated } = useStudentData();
  const { colors } = useTheme();
  if (loading) return <LoadingState />;
  if (error || !data) return <ErrorState detail="The demo student snapshot is unavailable right now." onRetry={() => void reload()} />;
  const nextClass = (() => {
    const today = currentAcademicDay();
    for (let offset = 0; offset < 5; offset += 1) {
      const day = ((today - 1 + offset) % 5) + 1;
      const entries = data.timetable.filter((item) => item.day === day).sort((a, b) => a.start.localeCompare(b.start));
      const candidate = offset === 0 ? entries.find((item) => item.start >= currentTime()) : entries[0];
      if (candidate) return { entry: candidate, label: offset === 0 ? 'NEXT CLASS · TODAY' : 'NEXT CLASS' };
    }
    return undefined;
  })();
  const overall = attendancePercentage(data.attendance.reduce((sum, item) => sum + item.present, 0), data.attendance.reduce((sum, item) => sum + item.total, 0));
  const performance = assessmentPercentage(data.marks.flatMap((item) => item.assessments));
  const attendanceRisk = [...data.attendance].sort((a, b) => attendancePercentage(a.present, a.total) - attendancePercentage(b.present, b.total))[0];
  const riskCourse = data.courses.find((course) => course.id === attendanceRisk.courseId)!;
  const nextExam = data.exams[0];
  const nextAssignment = [...data.assignments].filter((item) => item.status === 'pending').sort((a, b) => a.due.localeCompare(b.due))[0];
  const nextCourse = nextClass && data.courses.find((course) => course.id === nextClass.entry.courseId);
  return <Screen><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={local.top}><View><Text style={{ color: colors.muted, fontSize: 14 }}>{greeting()}, {data.profile.name.split(' ')[0]}</Text><Text style={[local.term, { color: colors.text }]}>Semester {data.profile.semester} · {data.profile.department}</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Open profile" onPress={() => router.push('/profile')} hitSlop={6} style={[local.avatar, { backgroundColor: colors.accentSoft }]}><Text style={{ color: colors.accent, fontWeight: '900' }}>JM</Text></Pressable></View>
    {nextClass && nextCourse ? <Card style={[local.hero, { backgroundColor: colors.accent, borderColor: colors.accent }]}><Text style={local.heroLabel}>{nextClass.label}</Text><Text style={local.heroTitle}>{nextCourse.name}</Text><Text style={local.heroBody}>{nextClass.entry.start} – {nextClass.entry.end} · {nextCourse.room}</Text><View style={local.heroFooter}><Text style={local.heroBody}>{nextCourse.faculty}</Text><Badge label={nextClass.entry.type.toUpperCase()} /></View></Card> : <Card><Text style={{ color: colors.text, fontWeight: '800' }}>No upcoming class</Text><Text style={{ color: colors.muted, marginTop: 5 }}>Your next timetable update will appear here.</Text></Card>}
    <View style={local.stats}><Metric label="ATTENDANCE" value={`${overall}%`} detail="Overall" onPress={() => router.push('/attendance')} /><Metric label="PERFORMANCE" value={`${performance}%`} detail="Recorded average" onPress={() => router.push('/marks')} /></View>
    <SectionTitle title="Needs your attention" />
    <Card>{nextAssignment && <ListRow title={nextAssignment.title} detail={`${formatDueDate(nextAssignment.due)} · ${data.courses.find((course) => course.id === nextAssignment.courseId)?.name}`} onPress={() => router.push('/calendar' as Href)} trailing={<Badge label="ASSIGNMENT" tone="warning" />} />}{nextExam && <ListRow title={`${data.courses.find((course) => course.id === nextExam.courseId)?.name} exam`} detail={`${examCountdown(nextExam.date)} · ${nextExam.time}`} onPress={() => router.push('/exams')} trailing={<Badge label="EXAM" tone="danger" />} />}</Card>
    <SectionTitle title="Today’s schedule" action="Full schedule" onAction={() => router.push('/(tabs)/schedule')} />
    <Card>{data.timetable.filter((item) => item.day === currentAcademicDay()).map((entry, index) => { const course = data.courses.find((item) => item.id === entry.courseId)!; return <ListRow key={entry.id} title={course.name} detail={`${entry.start}–${entry.end} · ${course.room}`} trailing={index === 0 ? <Text style={{ color: colors.accent, fontWeight: '800', fontSize: 11 }}>NEXT</Text> : undefined} />; })}</Card>
    <SectionTitle title="Academic pulse" action="View attendance" onAction={() => router.push('/attendance')} />
    <Card><View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}><Badge label="WATCH" tone="warning" /><Text style={{ color: colors.text, fontWeight: '800', flex: 1 }}>{riskCourse.name} needs attention</Text></View><Text style={{ color: colors.muted, lineHeight: 20, marginTop: 10 }}>{attendancePercentage(attendanceRisk.present, attendanceRisk.total)}% is the closest attendance margin in this demo snapshot. Attend upcoming sessions to build a safer buffer.</Text></Card>
    <SectionTitle title="Latest notices" action="All notices" onAction={() => router.push('/(tabs)/notices')} />
    <Card>{data.notices.slice(0, 2).map((notice) => <ListRow key={notice.id} title={notice.title} detail={notice.timestamp} trailing={!notice.read ? <Badge label="NEW" /> : undefined} />)}</Card>
    <Text style={{ color: colors.muted, fontSize: 11, textAlign: 'center', marginTop: 22 }}>Demo data · refreshed {lastUpdated ? new Date(lastUpdated).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : 'just now'}</Text>
  </ScrollView></Screen>;
}

function Metric({ label, value, detail, onPress }: { label: string; value: string; detail: string; onPress: () => void }) { const { colors } = useTheme(); return <Pressable accessibilityRole="button" accessibilityLabel={`${label}: ${value}. ${detail}`} onPress={onPress} style={({ pressed }) => [local.metric, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && { opacity: .7 }]}><Text style={{ color: colors.muted, fontSize: 10, fontWeight: '800', letterSpacing: .7 }}>{label}</Text><Text style={{ color: colors.text, fontSize: 28, fontWeight: '900', marginTop: 9 }} allowFontScaling>{value}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 3 }}>{detail}</Text></Pressable>; }
const local = StyleSheet.create({ top: { paddingTop: 19, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, term: { fontSize: 16, fontWeight: '800', marginTop: 4, letterSpacing: -.3 }, avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' }, hero: { padding: 20 }, heroLabel: { color: '#DCE4FF', fontSize: 10, fontWeight: '900', letterSpacing: 1 }, heroTitle: { color: '#FFF', fontSize: 24, fontWeight: '900', letterSpacing: -.5, marginTop: 11 }, heroBody: { color: '#E5E9FF', fontSize: 13, marginTop: 5 }, heroFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 19, alignItems: 'flex-end', gap: 12 }, stats: { flexDirection: 'row', gap: 12, marginTop: 12 }, metric: { flex: 1, borderWidth: 1, borderRadius: 18, padding: 15 } });
