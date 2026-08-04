export interface Course {
  id: string;
  title: string;
  description?: string;
  subject: string;
  gradeLevel?: string;
  coverUrl?: string;
  isPublished: boolean;
  createdAt: string;
  _count?: { enrollments: number; materials: number; liveClasses: number };
}

export interface LiveClass {
  id: string;
  title: string;
  scheduledAt: string;
  durationMin: number;
  status: "SCHEDULED" | "LIVE" | "ENDED" | "CANCELLED";
  roomId: string;
  course?: { title: string };
}

export interface Material {
  id: string;
  title: string;
  type: "PDF" | "VIDEO" | "NOTE";
  fileUrl: string;
  uploadedAt: string;
}
