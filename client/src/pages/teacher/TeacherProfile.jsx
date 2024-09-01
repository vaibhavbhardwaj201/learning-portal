import { useState, useEffect } from 'react';
import { db, auth, storage } from '../../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const TeacherProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    profilePic: '',
    bio: '',
    twitter: '',
    linkedin: '',
    website: '',
  });
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const teacherId = auth.currentUser.uid;

  useEffect(() => {
    const fetchProfileData = async () => {
      const docRef = doc(db, 'teachers', teacherId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [teacherId]);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (image) {
      const imageRef = ref(storage, `profilePictures/${teacherId}`);
      await uploadBytes(imageRef, image);
      const profilePicURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'teachers', teacherId), {
        ...profileData,
        profilePic: profilePicURL,
      });
    } else {
      await updateDoc(doc(db, 'teachers', teacherId), profileData);
    }
    alert('Profile updated successfully');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="flex flex-col items-center mb-6">
          <img
            src={profileData.profilePic || '/default-profile.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-600"
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={profileData.twitter}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://twitter.com/yourusername"
            />
          </div>
          <div>
            <label className="block text-gray-700">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={profileData.linkedin}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>
          <div>
            <label className="block text-gray-700">Website</label>
            <input
              type="text"
              name="website"
              value={profileData.website}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
