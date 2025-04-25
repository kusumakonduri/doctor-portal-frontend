
import { Doctor } from "@/types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    console.log("Fetching doctors from:", API_URL);
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const rawData = await response.json();
    console.log("Raw API response:", rawData);
    
    // Map the API response to our Doctor type
    const doctors = rawData.map((item: any) => ({
      id: item.id,
      name: item.name,
      qualifications: item.qualifications || [], // Might not exist in API
      specialties: item.specialities ? 
        item.specialities.map((s: any) => s.name) : [],
      experience: extractYearsFromExperience(item.experience),
      consultationType: mapConsultationType(item.video_consult, item.in_clinic),
      clinicName: item.clinic?.name || "",
      location: item.clinic?.address?.city || "",
      fee: extractFeeAmount(item.fees),
      rating: 4.5, // Default rating if not available
      imageUrl: item.photo || ""
    }));
    
    console.log("Mapped doctors data:", doctors);
    return doctors;
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    // Return some mock data in case the API fails
    return [
      {
        id: "mock1",
        name: "Dr. John Smith",
        qualifications: ["MBBS", "MD"],
        specialties: ["General Physician"],
        experience: 10,
        consultationType: "Both",
        clinicName: "City Hospital",
        location: "New York",
        fee: 500,
        rating: 4.5,
        imageUrl: ""
      },
      {
        id: "mock2",
        name: "Dr. Sarah Johnson",
        qualifications: ["MBBS", "MS"],
        specialties: ["Dermatologist"],
        experience: 8,
        consultationType: "Video Consult",
        clinicName: "Skin Care Clinic",
        location: "Los Angeles",
        fee: 700,
        rating: 4.7,
        imageUrl: ""
      }
    ];
  }
};

// Helper function to extract years from experience string
const extractYearsFromExperience = (experienceStr: string): number => {
  if (!experienceStr) return 0;
  
  const match = experienceStr.match(/(\d+)/);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return 0;
};

// Helper function to extract fee amount from fee string
const extractFeeAmount = (feeStr: string): number => {
  if (!feeStr) return 0;
  
  const match = feeStr.match(/(\d+)/);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return 0;
};

// Helper function to map consultation type
const mapConsultationType = (videoConsult: boolean, inClinic: boolean): "Video Consult" | "In Clinic" | "Both" => {
  if (videoConsult && inClinic) return "Both";
  if (videoConsult) return "Video Consult";
  if (inClinic) return "In Clinic";
  return "In Clinic"; // Default
};
