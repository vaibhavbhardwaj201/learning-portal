import { useState, useEffect } from 'react';
import {StudentList} from '../../components';
import { db } from '../../firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const TeacherStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const teacherId = "TEACHER_UID"; // Replace with the actual teacher's UID

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, 'students');
      const q = query(studentsCollection, where('teacherId', '==', teacherId));
      const querySnapshot = await getDocs(q);

      const studentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStudents(studentsData);
      setLoading(false);
    };

    fetchStudents();
  }, [teacherId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 h-screen">
      <h1 className="text-2xl font-bold mb-6">My Students</h1>
      <StudentList students={students} />
    </div>
  );
};

export default TeacherStudents;
