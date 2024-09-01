import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase.config';
import { doc, getDoc } from 'firebase/firestore';

const StudentHome = () => {
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('No user is logged in');
        }

        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setStudentName(userDoc.data().name);
        } else {
          console.error('No such document found!');
        }
      } catch (error) {
        console.error('Error fetching student name:', error);
      }
    };

    fetchStudentName();
  }, []);

  return (
    <div className="container mx-auto p-6 h-[100vh]">
      {/* Welcome Message */}
      <div className="bg-blue-100 p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {studentName}!</h1>
        <p className="mt-2 text-lg">Here&apos;s a quick overview of your dashboard:</p>
      </div>

      {/* Quick Stats */}
      <div className="flex space-x-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-semibold">Enrolled Courses</h2>
          <p className="text-3xl">4</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-semibold">Assignments Due</h2>
          <p className="text-3xl">2</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-xl font-semibold">New Messages</h2>
          <p className="text-3xl">3</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p>No recent activity.</p> {/* Replace with actual content */}
        </div>
      </div>

      {/* Upcoming Courses */}
      <div>
        <h2 className="text-xl font-bold mb-4">Upcoming Courses</h2>
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

export default StudentHome;
