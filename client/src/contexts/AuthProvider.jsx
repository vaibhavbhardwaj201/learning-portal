import { createContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { auth, db } from '../firebase.config'; // Import Firebase Auth and Firestore
import { doc, getDoc } from 'firebase/firestore';


// Create a context for user authentication
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUser({
            ...docSnap.data(),
            role: docSnap.data().role,
          });
        }
        console.log('Current User:', currentUser);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  console.log('Current User:', currentUser);

  return (
    <AuthContext.Provider value={currentUser}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
children: propTypes.node.isRequired,
};

export default AuthProvider;