import propTypes from 'prop-types';

const StudentList = ({ students }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student) => (
        <div key={student.id} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            {/* Placeholder for student avatar */}
            <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {student.name.charAt(0)}
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className={`text-sm ${student.isOnline ? 'text-green-500' : 'text-red-500'}`}>
              {student.isOnline ? 'Online' : 'Offline'}
            </p>
            <p className="text-sm text-gray-600">Enrolled in: {student.courseTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

StudentList.propTypes = {
  students: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      isOnline: propTypes.bool.isRequired,
      courseTitle: propTypes.string.isRequired, // Title of the course the student is enrolled in
    })
  ).isRequired,
};

export default StudentList;
