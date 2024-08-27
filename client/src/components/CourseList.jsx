import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseList = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p className="text-sm mt-2">{course.description}</p>
          <Link 
            to={`/teacher/courses/${course.id}`} 
            className="mt-4 text-blue-500 inline-block"
          >
            View Course
          </Link>
        </div>
      ))}
    </div>
  );
};

CourseList.propTypes = {
  courses: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default CourseList;
