
const TeacherHome = () => {
  return (
    <div className="container mx-auto p-6 h-[100vh]">
      {/* Welcome Message and Overview */}
      <div className="bg-blue-100 p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Welcome back, [Teacher&apos;s Name]!</h1>
        <p className="mt-2 text-lg">Here&apos;s a quick overview of your dashboard:</p>
        <div className="flex space-x-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Active Courses</h2>
            <p className="text-3xl">5</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Enrolled Students</h2>
            <p className="text-3xl">120</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Pending Assignments</h2>
            <p className="text-3xl">8</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <button className="text-lg font-semibold">Create New Course</button>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <button className="text-lg font-semibold">Manage Courses</button>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex items-center justify-center">
          <button className="text-lg font-semibold">Grade Assignments</button>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p>No recent activity.</p> {/* Replace with actual content */}
        </div>
      </div>

      {/* Course List */}
      <div>
        <h2 className="text-xl font-bold mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Course Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Course Title 1</h3>
            <p className="text-sm mt-2">Course Description</p>
            <button className="mt-4 text-blue-500">View Course</button>
          </div>
          {/* Add more course cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
