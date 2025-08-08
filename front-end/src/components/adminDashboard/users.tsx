// src/components/admin/Dashboard/Users.tsx
import { Search, Eye, Check, X } from 'lucide-react';
import { fetchUsers } from './dataFetch';
import { User, UserType } from '@/types/admin';
import { useState, useEffect } from 'react';

interface UsersProps {
  onViewItem: (item: User) => void;
}

export default function Users({ onViewItem }: UsersProps) {
  const [userTab, setUserTab] = useState<UserType>('owners');
  const [usersData, setUsersData] = useState<{ owners: User[]; tenants: User[] }>({ owners: [], tenants: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsersData(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = usersData[userTab].filter(user => {
    const name = user.name || '';
    const email = user.email || '';
    const search = searchTerm.toLowerCase();
    
    return (
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search)
    );
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-lg font-semibold text-blue-900">User Management</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder={`Search ${userTab}...`} 
                className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-0.5">
              <button 
                onClick={() => setUserTab('owners')}
                className={`px-3 py-1 text-sm rounded-md ${
                  userTab === 'owners' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Owners
              </button>
              <button 
                onClick={() => setUserTab('tenants')}
                className={`px-3 py-1 text-sm rounded-md ${
                  userTab === 'tenants' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Tenants
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {userTab === 'owners' ? 'Properties' : 'Current Rental'}
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">
                  No {userTab} found{searchTerm ? ` matching "${searchTerm}"` : ''}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-900">{user.name || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.email || 'N/A'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {userTab === 'owners' 
                      ? `${user.properties || 0} properties` 
                      : (user.currentRental || 'None')}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.joined || 'N/A'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onViewItem(user)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                        <Check className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing 1 to {filteredUsers.length} of {filteredUsers.length} entries
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}