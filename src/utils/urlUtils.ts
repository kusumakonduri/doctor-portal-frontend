
import { ConsultationType, SortOption } from "@/types/doctor";

export const updateQueryParams = (
  searchTerm: string,
  consultationType: ConsultationType,
  specialties: string[],
  sortOption: SortOption | null
) => {
  const params = new URLSearchParams();
  
  if (searchTerm) {
    params.set("search", searchTerm);
  }
  
  if (consultationType) {
    params.set("consultation", consultationType);
  }
  
  if (specialties.length > 0) {
    params.set("specialties", specialties.join(","));
  }
  
  if (sortOption) {
    params.set("sort", sortOption);
  }
  
  const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  window.history.pushState({}, "", newUrl);
};

export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  
  const searchTerm = params.get("search") || "";
  
  const consultationType = params.get("consultation") as ConsultationType;
  
  const specialties = params.get("specialties")
    ? params.get("specialties")!.split(",")
    : [];
  
  const sortOption = params.get("sort") as SortOption | null;
  
  return { searchTerm, consultationType, specialties, sortOption };
};
