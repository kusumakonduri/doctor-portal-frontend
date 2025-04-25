
import { useEffect, useState } from "react";
import { Doctor, ConsultationType, SortOption } from "@/types/doctor";
import { fetchDoctors } from "@/services/doctorService";
import AutocompleteSearch from "@/components/AutocompleteSearch";
import FilterPanel from "@/components/FilterPanel";
import DoctorCard from "@/components/DoctorCard";
import { updateQueryParams, getQueryParams } from "@/utils/urlUtils";

const DoctorListing = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsultationType, setSelectedConsultationType] = useState<ConsultationType>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption | null>(null);
  const [loading, setLoading] = useState(true);
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);

  // Fetch doctors on mount
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
      
      // Extract all unique specialties
      const specialtiesSet = new Set<string>();
      data.forEach(doctor => {
        doctor.specialties.forEach(specialty => {
          specialtiesSet.add(specialty);
        });
      });
      setAllSpecialties(Array.from(specialtiesSet));
      
      setLoading(false);
    };
    
    loadDoctors();
  }, []);

  // Load filters from URL on mount
  useEffect(() => {
    if (doctors.length > 0) {
      const { searchTerm: urlSearchTerm, consultationType, specialties, sortOption: urlSortOption } = getQueryParams();
      
      setSearchTerm(urlSearchTerm);
      setSelectedConsultationType(consultationType);
      setSelectedSpecialties(specialties);
      setSortOption(urlSortOption);
    }
  }, [doctors]);

  // Apply filters whenever filter values change
  useEffect(() => {
    if (doctors.length > 0) {
      applyFilters();
      updateQueryParams(searchTerm, selectedConsultationType, selectedSpecialties, sortOption);
    }
  }, [searchTerm, selectedConsultationType, selectedSpecialties, sortOption, doctors]);

  const applyFilters = () => {
    let filtered = [...doctors];
    
    // Apply search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply consultation type filter
    if (selectedConsultationType) {
      filtered = filtered.filter(doctor => 
        doctor.consultationType === selectedConsultationType || doctor.consultationType === "Both"
      );
    }
    
    // Apply specialties filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor =>
        selectedSpecialties.every(specialty => doctor.specialties.includes(specialty))
      );
    }
    
    // Apply sort
    if (sortOption === "fees") {
      filtered.sort((a, b) => a.fee - b.fee);
    } else if (sortOption === "experience") {
      filtered.sort((a, b) => b.experience - a.experience);
    }
    
    setFilteredDoctors(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Search */}
      <header className="bg-medical-blue p-4">
        <div className="container mx-auto">
          <AutocompleteSearch
            doctors={doctors}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64">
            <FilterPanel
              selectedConsultationType={selectedConsultationType}
              setSelectedConsultationType={setSelectedConsultationType}
              selectedSpecialties={selectedSpecialties}
              setSelectedSpecialties={setSelectedSpecialties}
              sortOption={sortOption}
              setSortOption={setSortOption}
              allSpecialties={allSpecialties}
            />
          </aside>

          {/* Doctor Listing */}
          <main className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4">
                  {filteredDoctors.length} Doctors Available
                </h1>
                
                {filteredDoctors.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDoctors.map(doctor => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No doctors found</h2>
                    <p className="text-gray-500">
                      Try adjusting your search or filters to find more results.
                    </p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
