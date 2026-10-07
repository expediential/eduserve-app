import { describe, expect, it } from 'vitest';
import { mockStudentData } from '../src/data/mockStudentProvider';
import { searchStudentData } from '../src/services/unifiedSearch';

describe('global search', () => {
  it('finds campus events as a typed result', () => {
    const result = searchStudentData(mockStudentData, 'induction');
    expect(result).toContainEqual(expect.objectContaining({ kind: 'Event', title: 'Cyber Security Club induction' }));
  });

  it('finds timetable entries using room information', () => {
    expect(searchStudentData(mockStudentData, 'CSE Block').some((item) => item.kind === 'Class')).toBe(true);
  });
});
