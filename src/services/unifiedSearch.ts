import { StudentData } from '@/src/domain/types';
export type SearchResult = { id: string; kind: 'Course' | 'Notice' | 'Exam' | 'Assignment' | 'Event' | 'Class'; title: string; detail: string; score: number };
export function searchStudentData(data: StudentData, query: string): SearchResult[] {
  const term = query.trim().toLowerCase(); if (!term) return [];
  const score = (...values: string[]) => {
    const text = values.join(' ').toLowerCase();
    if (text.startsWith(term)) return 3;
    if (text.includes(term)) return 2;
    return term.length >= 4 && term.split('').every((letter) => text.includes(letter)) ? 1 : 0;
  };
  const make = <T extends Omit<SearchResult, 'score'>>(item: T, ...values: string[]) => ({ ...item, score: score(...values) });
  const courses = data.courses.map((item) => make({ id: `course-${item.id}`, kind: 'Course' as const, title: item.name, detail: `${item.code} · ${item.faculty}` }, item.name, item.code, item.faculty));
  const notices = data.notices.map((item) => make({ id: `notice-${item.id}`, kind: 'Notice' as const, title: item.title, detail: `${item.category} · ${item.timestamp}` }, item.title, item.body, item.category));
  const exams = data.exams.map((item) => { const course = data.courses.find((value) => value.id === item.courseId)!; return make({ id: `exam-${item.id}`, kind: 'Exam' as const, title: course.name, detail: `${item.type} · ${item.date} · ${item.time}` }, course.name, item.type, item.date, item.venue); });
  const assignments = data.assignments.map((item) => { const course = data.courses.find((value) => value.id === item.courseId)!; return make({ id: `assignment-${item.id}`, kind: 'Assignment' as const, title: item.title, detail: `${course.name} · ${item.due}` }, item.title, item.due, course.name); });
  const events = data.events.map((item) => make({ id: `event-${item.id}`, kind: 'Event' as const, title: item.title, detail: `${item.date} · ${item.venue}` }, item.title, item.date, item.venue, item.category));
  const classes = data.timetable.map((item) => { const course = data.courses.find((value) => value.id === item.courseId)!; return make({ id: `class-${item.id}`, kind: 'Class' as const, title: course.name, detail: `${item.start}–${item.end} · ${course.room}` }, course.name, course.code, course.faculty, course.room, item.type); });
  return [...courses, ...notices, ...exams, ...assignments, ...events, ...classes].filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}
