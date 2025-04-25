
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div data-testid="doctor-card" className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/5 mb-4 md:mb-0">
          <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto md:mx-0">
            {doctor.imageUrl ? (
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-medical-blue rounded-full text-white text-xl font-bold">
                {doctor.name.split(" ").map(part => part[0]).join("")}
              </div>
            )}
          </div>
        </div>
        
        <div className="md:w-3/5 md:pl-4">
          <h2 data-testid="doctor-name" className="text-xl font-bold">{doctor.name}</h2>
          <p data-testid="doctor-specialty" className="text-gray-600 mb-1">
            {doctor.specialties.join(", ")}
          </p>
          <p className="text-gray-500 mb-1">{doctor.qualifications.join(", ")}</p>
          <p data-testid="doctor-experience" className="text-gray-500 mb-3">
            {doctor.experience} yrs exp.
          </p>
          <div className="mb-2">
            <p className="font-medium text-gray-700">{doctor.clinicName}</p>
            <p className="text-gray-500">{doctor.location}</p>
          </div>
        </div>
        
        <div className="md:w-1/5 flex flex-col items-center md:items-end justify-between">
          <p data-testid="doctor-fee" className="font-bold text-gray-800">₹ {doctor.fee}</p>
          <button className="bg-medical-blue text-white py-2 px-4 rounded-md w-full md:w-auto mt-4">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
