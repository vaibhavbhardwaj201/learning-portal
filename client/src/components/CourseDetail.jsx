import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const CourseDetail = () => {
    const { courseId } = useParams();
    console.log(courseId);

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                // Fetch course document from Firestore
                const courseRef = doc(db, "courses", courseId);
                const courseSnap = await getDoc(courseRef);

                if (courseSnap.exists()) {
                    const courseData = courseSnap.data();

                    // Fetch download URLs for video and study materials
                    const videoURL = await Promise.all(
                        courseData.videoPaths.map(async (videoPath) => {
                            // Create a reference to the specific video file
                            const fileRef = ref(storage, videoPath);
                            return await getDownloadURL(fileRef);
                        })
                    );

                    const pdfURLs = await Promise.all(
                        courseData.pdfPaths.map(async (pdfPath) => {
                            const fileRef = ref(storage, pdfPath);
                            return await getDownloadURL(fileRef);
                        })
                    );

                    setCourse({
                        title: courseData.title,
                        description: courseData.description,
                        videoURL,
                        pdfURLs,
                    });
                } else {
                    console.error("Course not found!");
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!course) {
        return <div className="flex justify-center items-center h-screen">Course not found!</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-gray-700 text-lg mb-6">{course.description}</p>

                {/* Video Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Course Video</h2>
                    <div className="relative pb-56.25 mb-6 h-0 overflow-hidden">
                        <iframe
                            src={course.videoURL}
                            title={course.title}
                            frameBorder="0"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                        />
                    </div>
                </div>

                {/* Study Materials Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Study Materials</h2>
                    <ul className="list-disc list-inside">
                        {course.pdfURLs.map((pdfURL, index) => (
                            <li key={index}>
                                <a
                                    href={pdfURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    Download Material {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
