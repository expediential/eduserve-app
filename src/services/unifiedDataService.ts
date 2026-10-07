import { mockStudentData } from '../data/mockStudentProvider';
import { StudentData, StudentDataProvider } from '../domain/types';

export type DataSource = 'eduserve' | 'kids' | 'university' | 'mock';
export type DataKind = 'profile' | 'courses' | 'attendance' | 'marks' | 'timetable' | 'exams' | 'fees' | 'notifications' | 'assignments' | 'events';
export type SourcePriority = Record<DataKind, readonly DataSource[]>;

/** Replace these priorities only after authorized platform reconnaissance. */
export const sourcePriority: SourcePriority = {
  profile: ['eduserve', 'kids', 'mock'], courses: ['kids', 'eduserve', 'mock'], attendance: ['eduserve', 'kids', 'mock'],
  marks: ['eduserve', 'kids', 'mock'], timetable: ['eduserve', 'kids', 'mock'], exams: ['eduserve', 'kids', 'mock'],
  fees: ['eduserve', 'mock'], notifications: ['eduserve', 'kids', 'mock'], assignments: ['kids', 'eduserve', 'mock'], events: ['university', 'kids', 'mock'],
};

export interface EduServeProvider extends StudentDataProvider { readonly source: 'eduserve' | 'mock'; }
export interface KIDSProvider extends StudentDataProvider { readonly source: 'kids' | 'mock'; }
export interface UniversityProvider extends StudentDataProvider { readonly source: 'university' | 'mock'; }

/** Development-only provider instances: each keeps the app usable without credentials. */
export class MockEduServeProvider implements EduServeProvider { readonly source = 'mock' as const; async getStudentData() { return mockStudentData; } }
export class MockKIDSProvider implements KIDSProvider { readonly source = 'mock' as const; async getStudentData() { return mockStudentData; } }
export class MockUniversityProvider implements UniversityProvider { readonly source = 'mock' as const; async getStudentData() { return mockStudentData; } }

export type UnifiedStudentSnapshot = { data: StudentData; mode: 'demo' | 'live'; sources: Record<DataKind, DataSource>; lastUpdated: string };
export class UnifiedDataService {
  constructor(private readonly eduServe: EduServeProvider = new MockEduServeProvider(), private readonly kids: KIDSProvider = new MockKIDSProvider(), private readonly university: UniversityProvider = new MockUniversityProvider()) {}
  async getSnapshot(): Promise<UnifiedStudentSnapshot> {
    const data = await this.eduServe.getStudentData();
    const sources = Object.fromEntries(Object.keys(sourcePriority).map((kind) => [kind, 'mock'])) as Record<DataKind, DataSource>;
    return { data, mode: 'demo', sources, lastUpdated: new Date().toISOString() };
  }
}
