import { User, Phone, Mail, Calendar } from 'react-feather';

export default function TenantsPage() {
  const tenants = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      property: 'Modern Downtown Apartment',
      moveIn: '2023-01-15',
      rent: 2500,
      status: 'current'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '(555) 987-6543',
      property: 'Cozy Suburban House',
      moveIn: '2022-11-01',
      rent: 1800,
      status: 'current'
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-950">Tenant Management</h1>
        <button className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
          Add New Tenant
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-blue-100">
                <th className="p-4">Tenant</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Property</th>
                <th className="p-4">Move-In Date</th>
                <th className="p-4">Rent</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-4 font-medium">{tenant.name}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2 text-blue-700">
                      <Phone size={14} />
                      <span>{tenant.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-700 mt-1">
                      <Mail size={14} />
                      <span>{tenant.email}</span>
                    </div>
                  </td>
                  <td className="p-4">{tenant.property}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-blue-700" />
                      <span>{new Date(tenant.moveIn).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium">${tenant.rent.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tenant.status === 'current' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tenant.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-700 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-blue-950 mb-4">Lease Expirations</h2>
          <div className="space-y-4">
            {tenants.map((tenant) => (
              <div key={tenant.id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-blue-950">{tenant.name}</h3>
                  <p className="text-sm text-blue-700">{tenant.property}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-700">Expires in 6 months</p>
                  <button className="text-sm text-blue-600 hover:text-blue-800 mt-1">
                    Renew Lease
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-blue-950 mb-4">Maintenance Requests</h2>
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex justify-between">
                <h3 className="font-medium text-blue-950">Plumbing Issue</h3>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Pending
                </span>
              </div>
              <p className="text-sm text-blue-700 mt-1">Reported by John Smith</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex justify-between">
                <h3 className="font-medium text-blue-950">AC Repair</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Completed
                </span>
              </div>
              <p className="text-sm text-blue-700 mt-1">Reported by Sarah Johnson</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}