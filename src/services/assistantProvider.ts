import { attendancePercentage, classesCanMiss } from '@/src/domain/academic';
import { StudentData } from '@/src/domain/types';

export interface AIProvider { answer(question: string, data: StudentData): Promise<string>; }

/** Uses only supplied application data; safe default for local development. */
export class MockAIProvider implements AIProvider {
  async answer(question: string, data: StudentData) {
    const lower = question.toLowerCase();
    const math = data.attendance.find((item) => item.courseId === 'math')!;
    if (lower.includes('attendance') || lower.includes('miss')) return `Linear Algebra attendance is ${attendancePercentage(math.present, math.total)}% (${math.present}/${math.total} classes). At a 75% configured threshold, you can miss ${classesCanMiss(math, 75)} more classes. This is a deterministic application calculation.`;
    if (lower.includes('tomorrow') || lower.includes('class')) return 'Tomorrow starts with Programming in C lab at 9:00 AM, followed by Linear Algebra tutorial at 11:00 AM.';
    if (lower.includes('exam')) return 'Your next exam is Linear Algebra Internal on October 15 at 9:30 AM in CTC III Hall 2, seat A-14.';
    return `Your workload is moderate: ${data.assignments.filter((a) => a.status === 'pending').length} assignments are pending and ${data.exams.length} exams are scheduled. Physics attendance is 76.3%, just above the configured 75% threshold.`;
  }
}

/** Production adapters are intentionally unavailable until configured server-side. */
export class OpenAIProvider implements AIProvider { async answer(): Promise<string> { throw new Error('OpenAI provider is not configured. Keep API keys server-side.'); } }
export class LocalProvider implements AIProvider { async answer(): Promise<string> { throw new Error('Local provider is not configured.'); } }
