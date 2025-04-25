
import React from "react";
import { ConsultationType, SortOption } from "@/types/doctor";

interface FilterPanelProps {
  selectedConsultationType: ConsultationType;
  setSelectedConsultationType: (type: ConsultationType) => void;
  selectedSpecialties: string[];
  setSelectedSpecialties: (specialties: string[]) => void;
  sortOption: SortOption | null;
  setSortOption: (option: SortOption | null) => void;
  allSpecialties: string[];
}

const FilterPanel = ({
  selectedConsultationType,
  setSelectedConsultationType,
  selectedSpecialties,
  setSelectedSpecialties,
  sortOption,
  setSortOption,
  allSpecialties,
}: FilterPanelProps) => {
  const handleSpecialtyChange = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4">
      <div className="mb-6">
        <h3 data-testid="filter-header-sort" className="text-lg font-medium mb-3">Sort By</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              data-testid="sort-fees"
              type="radio"
              id="sort-fees"
              name="sort"
              className="mr-2"
              checked={sortOption === "fees"}
              onChange={() => setSortOption("fees")}
            />
            <label htmlFor="sort-fees">Price: Low-High</label>
          </div>
          <div className="flex items-center">
            <input
              data-testid="sort-experience"
              type="radio"
              id="sort-experience"
              name="sort"
              className="mr-2"
              checked={sortOption === "experience"}
              onChange={() => setSortOption("experience")}
            />
            <label htmlFor="sort-experience">Experience: Most Experience first</label>
          </div>
        </div>
        <button 
          className="mt-3 text-medical-blue text-sm hover:underline"
          onClick={() => setSortOption(null)}
        >
          Clear Sort
        </button>
      </div>

      <div className="mb-6">
        <h3 data-testid="filter-header-moc" className="text-lg font-medium mb-3">Mode of Consultation</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              data-testid="filter-video-consult"
              type="radio"
              id="video-consult"
              name="consultation-type"
              className="mr-2"
              checked={selectedConsultationType === "Video Consult"}
              onChange={() => setSelectedConsultationType("Video Consult")}
            />
            <label htmlFor="video-consult">Video Consultation</label>
          </div>
          <div className="flex items-center">
            <input
              data-testid="filter-in-clinic"
              type="radio"
              id="in-clinic"
              name="consultation-type"
              className="mr-2"
              checked={selectedConsultationType === "In Clinic"}
              onChange={() => setSelectedConsultationType("In Clinic")}
            />
            <label htmlFor="in-clinic">In-clinic Consultation</label>
          </div>
        </div>
        <button 
          className="mt-3 text-medical-blue text-sm hover:underline"
          onClick={() => setSelectedConsultationType(null)}
        >
          Clear Filter
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 data-testid="filter-header-speciality" className="text-lg font-medium">Specialties</h3>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {allSpecialties.map((specialty) => (
            <div key={specialty} className="flex items-center">
              <input
                data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                type="checkbox"
                id={`specialty-${specialty}`}
                className="mr-2"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
              />
              <label htmlFor={`specialty-${specialty}`}>{specialty}</label>
            </div>
          ))}
        </div>
        <button 
          className="mt-3 text-medical-blue text-sm hover:underline"
          onClick={() => setSelectedSpecialties([])}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
