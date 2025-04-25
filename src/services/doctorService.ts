
import { Doctor } from "@/types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    console.log("Fetching doctors from:", API_URL);
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Doctors data fetched successfully:", data.length, "doctors found");
    return data;
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
