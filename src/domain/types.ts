export type AttendanceStatus = 'SAFE' | 'WATCH' | 'ATTENTION';
export type NoticeCategory = 'Academic' | 'Exams' | 'Fees' | 'Events' | 'Hostel' | 'Administration' | 'Emergency';
export interface Profile { name: string; registerNumber: string; programme: string; department: string; semester: number; email: string; }
export interface Course { id: string; code: string; name: string; faculty: string; room: string; color: string; }
export interface Attendance { courseId: string; present: number; total: number; trend: number[]; }
export interface Assessment { name: string; score: number; max: number; }
export interface Marks { courseId: string; assessments: Assessment[]; }
export interface TimetableEntry { id: string; courseId: string; day: number; start: string; end: string; type: 'Theory' | 'Lab' | 'Tutorial'; }
export interface Exam { id: string; courseId: string; type: 'Internal' | 'End Semester' | 'Practical'; date: string; time: string; venue: string; seat: string; }
export interface Notice { id: string; title: string; body: string; category: NoticeCategory; timestamp: string; priority: 'normal' | 'high'; read: boolean; pinned?: boolean; }
export interface Assignment { id: string; courseId: string; title: string; due: string; status: 'pending' | 'submitted'; }
export interface CampusEvent { id: string; title: string; date: string; time: string; venue: string; category: 'Academic' | 'Campus'; }
export interface FeeSummary { payable: number; paid: number; dueDate: string; transactions: { id: string; label: string; amount: number; date: string }[]; }
export interface StudentData { profile: Profile; courses: Course[]; attendance: Attendance[]; marks: Marks[]; timetable: TimetableEntry[]; exams: Exam[]; notices: Notice[]; assignments: Assignment[]; events: CampusEvent[]; fees: FeeSummary; }
export interface StudentDataProvider { getStudentData(): Promise<StudentData>; }
