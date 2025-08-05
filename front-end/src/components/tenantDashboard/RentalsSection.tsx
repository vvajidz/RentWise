import StatusBadge from './StatusBadge';
import { Home } from 'lucide-react';

interface Rental {
  id: number;
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  rent: string;
  status: string;
}

interface RentalsSectionProps {
  rentals: Rental[];
}

const RentalsSection = ({ rentals }: RentalsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Rentals</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rentals.map(rental => (
          <div key={rental.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <img src={rental.image} alt={rental.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{rental.name}</h3>
                <StatusBadge status={rental.status} />
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Lease Period:</span>
                  <span className="text-gray-800">{rental.startDate} - {rental.endDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly Rent:</span>
                  <span className="text-gray-800 font-semibold">{rental.rent}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-xl hover:bg-amber-700 transition-colors text-sm font-medium">
                  View Details
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">
                  Request Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalsSection;