import { useEffect, useState } from "react";
import { auth, db } from "../../firebase.config";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

const TeacherHome = () => {

  const [name, setName] = useState("");
  const [courseCount, setCourseCount] = useState(0);

  const fetchCourseCount = async () => {
    // Fetch the number of courses the teacher is teaching
    // and set the state variable accordingly
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No user is logged in");
      }

      const coursesCollection = collection(db, 'courses');
      const q = query(coursesCollection, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      setCourseCount(querySnapshot.size);
    } catch (error) {
      console.error("Error fetching course count:", error);
    }
  }

  useEffect(() => {
    const fetchTeacherName = async () => {
      try {
        // Ensure the user is authenticated
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("No user is logged in");
        }
        // Reference to the user's document in Firestore
        const userDocRef = doc(db, "users", currentUser.uid);

        // Fetch the document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Extract and return the name field
          const userName = userDoc.data().name;
          console.log("Teacher's name:", userName);
          setName(userName);
        } else {
          console.error("No such document found!");
        }
      } catch (error) {
        console.error("Error fetching teacher name:", error);
      }
    };
    fetchTeacherName();
    fetchCourseCount();
  }, []);

  return (
    <div className="container mx-auto p-6 h-[100vh]">
      {/* Welcome Message and Overview */}
      <div className="bg-blue-100 p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {name}!</h1>
        <p className="mt-2 text-lg">Here&apos;s a quick overview of your dashboard:</p>
        <div className="flex space-x-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Active Courses</h2>
            <p className="text-3xl">{courseCount}</p>
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
          <Link to={'/teacher/add-course'} className="text-lg font-semibold">Create New Course</Link>
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
