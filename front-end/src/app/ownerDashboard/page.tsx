export default function OwnerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-blue-950 mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStatCard title="Total Properties" value="12" />
          <DashboardStatCard title="Occupancy Rate" value="83%" />
          <DashboardStatCard title="Monthly Income" value="$24,500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RecentActivities />
          <QuickActions />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MaintenanceRequests />
          <PropertyPerformance />
        </div>
      </div>
    </div>
  );
}

function DashboardStatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-blue-800 font-medium">{title}</h3>
      <p className="text-3xl font-bold text-blue-950">{value}</p>
    </div>
  );
}

function RecentActivities() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-blue-800 font-medium mb-4">Recent Activities</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Tenant payment received - Unit 4B</span>
          <span className="text-xs text-gray-400">2 hours ago</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Maintenance request submitted - Unit 2A</span>
          <span className="text-xs text-gray-400">1 day ago</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">New lease signed - Unit 3C</span>
          <span className="text-xs text-gray-400">3 days ago</span>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-blue-800 font-medium mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
          Add Property
        </button>
        <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
          View Tenants
        </button>
        <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
          Generate Report
        </button>
        <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
          Schedule Maintenance
        </button>
      </div>
    </div>
  );
}

function MaintenanceRequests() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-blue-800 font-medium mb-4">Pending Maintenance</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">Leaky faucet - Unit 2A</p>
            <p className="text-xs text-gray-500">Priority: Medium</p>
          </div>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">AC repair - Unit 5B</p>
            <p className="text-xs text-gray-500">Priority: High</p>
          </div>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Urgent</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">Paint touch-up - Unit 1C</p>
            <p className="text-xs text-gray-500">Priority: Low</p>
          </div>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Scheduled</span>
        </div>
      </div>
    </div>
  );
}

function PropertyPerformance() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-blue-800 font-medium mb-4">Top Performing Properties</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">Sunset Apartments</p>
            <p className="text-xs text-gray-500">95% occupancy</p>
          </div>
          <span className="text-green-600 font-medium">$4,200/mo</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">Downtown Plaza</p>
            <p className="text-xs text-gray-500">88% occupancy</p>
          </div>
          <span className="text-green-600 font-medium">$8,500/mo</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">Garden View Complex</p>
            <p className="text-xs text-gray-500">92% occupancy</p>
          </div>
          <span className="text-green-600 font-medium">$6,800/mo</span>
        </div>
      </div>
    </div>
  );
}