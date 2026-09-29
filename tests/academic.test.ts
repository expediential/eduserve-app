import { describe, expect, it } from 'vitest';
import { attendancePercentage, classesCanMiss, classesToReach, markNeeded } from '../src/domain/academic';
describe('academic calculations', () => {
  const attendance = { courseId: 'math', present: 33, total: 40, trend: [] };
  it('calculates attendance accurately', () => expect(attendancePercentage(33, 40)).toBe(82.5));
  it('calculates permitted absences', () => expect(classesCanMiss(attendance, 75)).toBe(4));
  it('calculates classes required to recover', () => expect(classesToReach({ ...attendance, present: 29, total: 40 }, 80)).toBe(15));
  it('caps a required mark at assessment maximum', () => expect(markNeeded(60, 80, 25, 80)).toBe(24));
});
