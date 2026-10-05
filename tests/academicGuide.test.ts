import { describe, expect, it } from 'vitest';
import { mockStudentData } from '../src/data/mockStudentProvider';
import { AcademicGuide } from '../src/services/assistantProvider';

describe('AcademicGuide', () => {
  const guide = new AcademicGuide();
  it('answers a subject-specific attendance question from records', () => { const result = guide.answer('What is my Physics attendance?', mockStudentData); expect(result.answer).toContain('76.3%'); expect(result.evidence).toContain('29 attended'); });
  it('uses a deterministic target-mark calculation', () => { const result = guide.answer('What do I need for 80% in Linear Algebra?', mockStudentData); expect(result.answer).toContain('/ 25'); expect(result.evidence).toContain('Recorded score'); });
  it('does not fabricate unknown information', () => { const result = guide.answer('Tell me everything', mockStudentData); expect(result.title).toBe('Academic snapshot'); expect(result.evidence).toContain('subjects'); });
});
