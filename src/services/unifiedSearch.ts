import { StudentData } from '@/src/domain/types';
export type SearchResult = { id: string; kind: 'Course' | 'Notice' | 'Exam' | 'Assignment'; title: string; detail: string };
export function searchStudentData(data: StudentData, query: string): SearchResult[] {
  const term = query.trim().toLowerCase(); if (!term) return [];
  const contains = (...values: string[]) => values.join(' ').toLowerCase().includes(term);
  const courses = data.courses.filter((item) => contains(item.name, item.code, item.faculty)).map((item) => ({ id: `course-${item.id}`, kind: 'Course' as const, title: item.name, detail: `${item.code} · ${item.faculty}` }));
  const notices = data.notices.filter((item) => contains(item.title, item.body, item.category)).map((item) => ({ id: `notice-${item.id}`, kind: 'Notice' as const, title: item.title, detail: `${item.category} · ${item.timestamp}` }));
  const exams = data.exams.filter((item) => { const course = data.courses.find((value) => value.id === item.courseId)!; return contains(course.name, item.type, item.date, item.venue); }).map((item) => { const course = data.courses.find((value) => value.id === item.courseId)!; return { id: `exam-${item.id}`, kind: 'Exam' as const, title: course.name, detail: `${item.type} · ${item.date} · ${item.time}` }; });
  const assignments = data.assignments.filter((item) => { const course = data.courses.find((value) => value.id === item.courseId)!; return contains(item.title, item.due, course.name); }).map((item) => ({ id: `assignment-${item.id}`, kind: 'Assignment' as const, title: item.title, detail: `${item.due} · ${item.status}` }));
  return [...courses, ...notices, ...exams, ...assignments];
}
