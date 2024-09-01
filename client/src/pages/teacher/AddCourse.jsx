import { useState } from 'react';
import { auth, db, storage } from '../../firebase.config';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const AddCoursePage = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    videos: [],
    pdfs: [],
    materials: [],
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    setCourseData({
      ...courseData,
      [type]: [...courseData[type], ...files],
    });
  };

  const handleUpload = async (files, courseId, path) => {
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const fileRef = ref(storage, `courses/${courseId}/${path}/${uuidv4()}-${file.name}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
      })
    );
    return uploadedFiles;
  };

  const handleSaveCourse = async () => {
    setLoading(true);

    const courseId = uuidv4();
    // Upload files to Firebase Storage
    const videoURLs = await handleUpload(courseData.videos, courseId, 'videos');
    const pdfURLs = await handleUpload(courseData.pdfs, courseId, 'pdfs');
    const materialURLs = await handleUpload(courseData.materials, courseId, 'materials');

    // Save course details in Firestore
    await addDoc(collection(db, 'courses'), {
      ...courseData,
      videos: videoURLs,
      pdfs: pdfURLs,
      materials: materialURLs,
      userId: auth.currentUser.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    alert('Course added successfully');
    setLoading(false);

    // Reset form
    setCourseData({
      title: '',
      description: '',
      videos: [],
      pdfs: [],
      materials: [],
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Course</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Course Title</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Course Description</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Upload Videos</label>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => handleFileChange(e, 'videos')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Upload PDFs</label>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={(e) => handleFileChange(e, 'pdfs')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Upload Study Materials</label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, 'materials')}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handleSaveCourse}
          disabled={loading}
          className={`mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {loading ? 'Saving...' : 'Add Course'}
        </button>
      </div>
    </div>
  );
};

export default AddCoursePage;
