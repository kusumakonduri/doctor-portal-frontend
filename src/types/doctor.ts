
export interface Doctor {
  id: string;
  name: string;
  qualifications: string[];
  specialties: string[];
  experience: number;
  consultationType: "Video Consult" | "In Clinic" | "Both";
  clinicName: string;
  location: string;
  fee: number;
  rating?: number;
  imageUrl?: string;
}

export type SortOption = "fees" | "experience";

export type ConsultationType = "Video Consult" | "In Clinic" | null;
