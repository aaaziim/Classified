/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification, 
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from "../firebase/firebase.config.js"

import toast from 'react-hot-toast'
import useAxiosSecure from '../hooks/useAxiosSecure.jsx'

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const axiosSecure = useAxiosSecure();

  const createUser = async (email, password) => {
    setLoading(true);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        toast.success("Please check your email and verify it before logging in.");
        
        // Sign out the user immediately after registration
        await signOut(auth);

        setLoading(false);
        return userCredential.user;
    } catch (error) {
        setLoading(false);
        throw error; // Ensure errors are handled in the component
    }
};


const signIn = async (email, password) => {
  setLoading(true);
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
          await signOut(auth); // Log out immediately
          throw new Error("Email not verified. Please check your inbox and verify your email.");
      }

      setLoading(false);
      return user;
  } catch (error) {
      setLoading(false);
      throw error; // Ensure error handling in the component
  }
};


  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }





  const resetPassword = async (email) => {
    if (!email) {
        throw new Error("Please enter your email.");
    }
    try {
        await sendPasswordResetEmail(auth, email);
        return "Password reset email sent. Check your inbox.";
    } catch (error) {
        throw new Error(error.message || "Failed to send reset email.");
    }
};


  const logOut = async () => {
    setLoading(true)
    await axiosSecure.post("/logout");
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
     
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    resetPassword
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider;