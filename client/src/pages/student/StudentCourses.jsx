import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { Link } from 'react-router-dom';

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch all courses from the "courses" collection in Firestore
        const coursesCollectionRef = collection(db, 'courses');
        const courseSnapshot = await getDocs(coursesCollectionRef);

        // Map through the documents to get course data
        const coursesList = courseSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCourses(coursesList);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center mt-6">Loading courses...</div>;
  }

  return (
    <div className="container mx-auto p-6 h-screen">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      {courses.length === 0 ? (
        <div className="text-center mt-6">No courses available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-sm mt-2">{course.description}</p>
              <p className="mt-2 text-sm font-medium text-gray-600">
                Instructor: {course.teacherName}
              </p>
              <Link
                to={`/course/${course.id}`}
                className="mt-4 inline-block text-blue-500 hover:text-blue-700"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
