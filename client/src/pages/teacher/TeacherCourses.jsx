import { useState, useEffect } from 'react';
import {CourseList} from '../../components';
import { db, auth } from '../../firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const teacherId = auth.currentUser.uid;

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, 'courses');
      const q = query(coursesCollection, where('userId', '==', teacherId));
      const querySnapshot = await getDocs(q);

      const coursesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCourses(coursesData);
      setLoading(false);
    };

    fetchCourses();
  }, [teacherId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container h-screen mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <CourseList courses={courses} />
    </div>
  );
};

export default TeacherCourses;
